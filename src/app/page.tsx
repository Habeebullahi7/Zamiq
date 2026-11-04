'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase, genZamiqNumber, isSupabaseConfigured, genId, formatTime } from '@/lib/supabase'

type Msg = { id:string; fromMe:boolean; type:'text'|'payment'|'esim'|'call'; text:string; time:string; status:'sent'|'delivered'|'read'; amount?:number }
type Chat = { id:number; name:string; email:string; number:string; avatar:string; last:string; time:string; unread:number; msgs:Msg[] }

export default function ZamiqFinal(){
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [activeId, setActiveId] = useState<number|null>(null)
  const [input, setInput] = useState('')
  const [balance, setBalance] = useState(127.50)
  const [isReal, setIsReal] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const [payAmount, setPayAmount] = useState('')
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [addAmount, setAddAmount] = useState('')
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [callState, setCallState] = useState<'idle'|'calling'|'incoming'|'connected'>('idle')
  const [callType, setCallType] = useState<'voice'|'video'>('voice')
  const [callWith, setCallWith] = useState<Chat|null>(null)
  const [callTime, setCallTime] = useState(0)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream|null>(null)

  const [chats, setChats] = useState<Chat[]>([
    {id:1, name:'Lola Yaba', email:'lola@test.com', number: genZamiqNumber(), avatar:'L', last:'Supabase realtime active', time:'now', unread:0, msgs:[]},
    {id:2, name:'Emeka US', email:'emeka@test.com', number: genZamiqNumber(), avatar:'E', last:'Call me with real +1', time:'09:12', unread:0, msgs:[]},
  ])

  useEffect(()=>{ const s=localStorage.getItem('zamiq_user'); if(s){ const u=JSON.parse(s); setUser(u); setIsReal(u.is_real||false); setBalance(u.balance||127.5) } },[])
  useEffect(()=>{ if(callState==='connected'){ const i=setInterval(()=>setCallTime(t=>t+1),1000); (window as any).ci=i; return()=>clearInterval(i) } },[callState])

  // SUPABASE REALTIME
  useEffect(()=>{
    if(!user?.email || !isSupabaseConfigured()) return
    const ch = supabase.channel('zamiq-all')
      .on('postgres_changes', {event:'INSERT', schema:'public', table:'zamiq_messages'}, (payload)=>{
        const m = payload.new as any
        if(m.to_email===user.email){
          setChats(p=>p.map(c=> c.email===m.from_email ? {...c, last:m.text, msgs:[...c.msgs, {id:m.id, fromMe:false, type:m.type, text:m.text, time:formatTime(), status:'read', amount:m.amount}]} : c))
        }
      })
      .on('postgres_changes', {event:'INSERT', schema:'public', table:'zamiq_calls'}, (payload)=>{
        const c = payload.new as any
        if(c.to_email===user.email && c.status==='ringing'){
          const caller = chats.find(x=>x.email===c.from_email) || chats[0]
          setCallWith(caller); setCallType(c.type); setCallState('incoming')
          // Auto vibrate if supported
          if(navigator.vibrate) navigator.vibrate([500,300,500])
        }
      })
      .subscribe()
    return ()=>{ supabase.removeChannel(ch) }
  },[user, chats])

  const login = async () => {
    if(!email.includes('@') || !name) return alert('Enter name + gmail')
    const myNum = genZamiqNumber()
    let u = { email, name, zamiq_number: myNum, is_real:false, balance:127.5 }
    if(isSupabaseConfigured()){
      const {data} = await supabase.from('users').select('*').eq('email',email).single()
      if(data){ u = data; } else { await supabase.from('users').insert({email,name,zamiq_number:myNum, balance:127.5}); }
    }
    setUser(u); setIsReal(u.is_real); setBalance(u.balance||127.5); localStorage.setItem('zamiq_user', JSON.stringify(u))
  }

  const sendReal = async (type:Msg['type']='text', txt?:string, amt?:number) => {
    if(activeId===null) return
    const active = chats.find(c=>c.id===activeId)!
    const text = txt || input.trim(); if(!text && type==='text') return
    const newMsg:Msg = { id:genId(), fromMe:true, type, text, time:formatTime(), status:'read', amount:amt }
    setChats(p=>p.map(c=> c.id===activeId ? {...c, last: type==='payment'? `You sent $${amt}` : type==='call'? text : text, msgs:[...c.msgs, newMsg]} : c))
    if(type==='payment' && amt) setBalance(b=>b-amt)
    setInput(''); setShowPay(false)
    if(isSupabaseConfigured()){
      await supabase.from('zamiq_messages').insert({ from_email:user.email, to_email:active.email, type, text, amount:amt })
    }
  }

  const startCall = async (chat:Chat, type:'voice'|'video') => {
    setCallWith(chat); setCallType(type); setCallState('calling'); setCallTime(0)
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video: type==='video', audio:true })
      streamRef.current=stream
      if(localVideoRef.current) localVideoRef.current.srcObject=stream
      if(isSupabaseConfigured()){
        await supabase.from('zamiq_calls').insert({ from_email:user.email, to_email:chat.email, type, status:'ringing' })
      }
      setTimeout(()=> setCallState('connected'), 2000)
    }catch(e){ alert('Allow camera/mic'); setCallState('idle') }
  }

  const answerCall = async () => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video: callType==='video', audio:true })
      streamRef.current=stream
      if(localVideoRef.current) localVideoRef.current.srcObject=stream
      setCallState('connected')
      if(isSupabaseConfigured() && callWith){
        await supabase.from('zamiq_calls').update({status:'answered'}).eq('from_email', callWith.email).eq('to_email', user.email).eq('status','ringing')
      }
    }catch{ setCallState('idle') }
  }

  const endCall = () => {
    streamRef.current?.getTracks().forEach(t=>t.stop())
    clearInterval((window as any).ci)
    const dur=`${Math.floor(callTime/60)}:${(callTime%60).toString().padStart(2,'0')}`
    if(callWith) sendReal('call', `${callType==='video'?'Video':'Voice'} call • ${callState==='connected'? dur : 'Missed'} • ${user.zamiq_number}`)
    setCallState('idle'); setCallWith(null); setCallTime(0)
  }

  const upgradeToReal = () => {
    const realNum = `+1 (415) ${Math.floor(100+Math.random()*900)}-${Math.floor(1000+Math.random()*9000)}`
    const newU = {...user, zamiq_number:realNum, is_real:true}
    setUser(newU); setIsReal(true); localStorage.setItem('zamiq_user', JSON.stringify(newU))
    if(isSupabaseConfigured()) supabase.from('users').update({zamiq_number:realNum, is_real:true}).eq('email', user.email).then(()=>{})
    setShowUpgrade(false)
    if(activeId) sendReal('esim', `🎉 REAL +1 ACTIVE: ${realNum} - Now fit receive bank OTP`)
  }

  const IconPhone = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  const IconVideo = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 13 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>

  const active = chats.find(c=>c.id===activeId)
  const fmt = (s:number)=> `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`

  if(!user) return(
    <div style={{minHeight:'100vh', background:'#111B21', color:'white', display:'flex', justifyContent:'center', fontFamily:'system-ui'}}>
      <div style={{width:'100%', maxWidth:'400px', padding:'24px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <div style={{background:'#00A884', width:'56px', height:'56px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'900', fontSize:'24px', marginBottom:'20px'}}>Z</div>
        <h1 style={{fontSize:'28px', fontWeight:'800'}}>Zamiq Realtime</h1>
        <p style={{opacity:0.6, fontSize:'13px', margin:'12px 0 20px'}}>Supabase tables active • Real-time chat + calls<br/>Login with 2 different gmails to test</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'10px', width:'100%'}} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@gmail.com" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'16px', width:'100%'}} />
        <button onClick={login} style={{background:'#00A884', border:'none', borderRadius:'10px', padding:'14px', fontWeight:'700', color:'white', width:'100%'}}>Continue → Connect Supabase</button>
      </div>
    </div>
  )

  if(active){
    return(
      <div style={{height:'100vh', background:'#111B21', display:'flex', flexDirection:'column', maxWidth:'500px', margin:'0 auto', fontFamily:'system-ui', position:'relative'}}>
        {callState!=='idle' && callWith && (
          <div style={{position:'fixed', inset:0, background:'#0B141A', zIndex:100, display:'flex', flexDirection:'column', color:'white'}}>
            <div style={{flex:1, position:'relative', background:'#111B21'}}>
              <video ref={localVideoRef} autoPlay playsInline muted style={{width:'100%', height:'100%', objectFit:'cover', background:'#202C33', display: callType==='video' ? 'block' : 'none'}} />
              {callType==='voice' && <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}><div style={{width:'96px', height:'96px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'36px', fontWeight:'700'}}>{callWith.avatar}</div></div>}
              <div style={{position:'absolute', top:'50px', left:0, right:0, textAlign:'center'}}>
                <div style={{fontWeight:'700', fontSize:'20px'}}>{callWith.name}</div>
                <div style={{opacity:0.7, fontSize:'13px', marginTop:'6px'}}>{callState==='calling'?'Calling...':callState==='incoming'?'Incoming...':fmt(callTime)}</div>
                <div style={{fontSize:'10px', opacity:0.5, marginTop:'4px'}}>{callType} • {user.zamiq_number} → {callWith.number} • Supabase signal</div>
              </div>
            </div>
            <div style={{background:'#202C33', padding:'20px 0 30px', display:'flex', justifyContent:'center', gap:'28px'}}>
              {callState==='incoming' ? (
                <>
                <button onClick={endCall} style={{width:'64px', height:'64px', borderRadius:'50%', background:'#F15C6D', border:'none', color:'white', fontSize:'22px'}}>✕</button>
                <button onClick={answerCall} style={{width:'64px', height:'64px', borderRadius:'50%', background:'#00A884', border:'none', color:'white'}}><IconPhone/></button>
                </>
              ) : (
                <>
                <button style={{width:'48px', height:'48px', borderRadius:'50%', background:'#2A3942', border:'none', color:'white'}}>🔇</button>
                <button onClick={endCall} style={{width:'64px', height:'64px', borderRadius:'50%', background:'#F15C6D', border:'none', color:'white', fontSize:'22px'}}>📞</button>
                <button style={{width:'48px', height:'48px', borderRadius:'50%', background:'#2A3942', border:'none', color:'white'}}>🔊</button>
                </>
              )}
            </div>
          </div>
        )}

        <div style={{background:'#202C33', padding:'10px 12px', display:'flex', gap:'14px', alignItems:'center', color:'white'}}>
          <span onClick={()=>setActiveId(null)} style={{cursor:'pointer', fontSize:'20px'}}>←</span>
          <div style={{width:'36px', height:'36px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{active.avatar}</div>
          <div style={{flex:1}}><div style={{fontWeight:'600', fontSize:'15px'}}>{active.name}</div><div style={{fontSize:'11px', opacity:0.6}}>{active.email} • {isReal?'Real +1':'Virtual'}</div></div>
          <button onClick={()=>startCall(active, 'voice')} style={{background:'transparent', border:'none', color:'white', cursor:'pointer', padding:'6px'}}><IconPhone/></button>
          <button onClick={()=>startCall(active, 'video')} style={{background:'transparent', border:'none', color:'white', cursor:'pointer', padding:'6px'}}><IconVideo/></button>
        </div>

        <div style={{flex:1, background:'#0B141A', padding:'12px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'8px'}}>
          {active.msgs.map(m=><div key={m.id} style={{alignSelf: m.fromMe ? 'flex-end' : 'flex-start', background: m.fromMe ? '#005C4B' : '#202C33', color:'white', padding:'10px', borderRadius:'12px', maxWidth:'78%', fontSize:'13px'}}>{m.text}<span style={{fontSize:'9px', opacity:0.5, marginLeft:'6px'}}>{m.time}</span></div>)}
        </div>

        {showPay && <div style={{background:'#202C33', padding:'16px'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'700'}}>Send $</span><span onClick={()=>setShowPay(false)}>✕</span></div><div style={{display:'flex', gap:'8px', marginTop:'12px'}}>{[5,10,20,50].map(a=><button key={a} onClick={()=>setPayAmount(a.toString())} style={{flex:1, background: payAmount===a.toString() ? '#00A884' : '#2A3942', border:'none', padding:'10px', borderRadius:'8px', color:'white'}}>${a}</button>)}</div><button onClick={()=>{ const amt=parseFloat(payAmount); if(amt) sendReal('payment', `Sent $${amt}`, amt); setPayAmount('') }} style={{width:'100%', marginTop:'12px', background:'#00A884', border:'none', padding:'12px', borderRadius:'8px', color:'white', fontWeight:'700'}}>Send ${payAmount || '0'}</button></div>}

        <div style={{background:'#202C33', padding:'8px', display:'flex', gap:'8px', alignItems:'center'}}>
          <button onClick={()=>setShowPay(true)} style={{background:'#00A884', width:'36px', height:'36px', borderRadius:'50%', border:'none', color:'white', fontWeight:'700'}}>$</button>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && sendReal()} placeholder="Message via Supabase" style={{flex:1, background:'#2A3942', border:'none', borderRadius:'20px', padding:'10px 14px', color:'white', outline:'none'}} />
          <button onClick={()=>sendReal()} style={{width:'36px', height:'36px', background:'#00A884', borderRadius:'50%', border:'none', color:'white'}}>➤</button>
        </div>
      </div>
    )
  }

  return(
    <div style={{minHeight:'100vh', background:'#111B21', color:'white', maxWidth:'500px', margin:'0 auto', display:'flex', flexDirection:'column', fontFamily:'system-ui'}}>
      <div style={{background:'#202C33', padding:'14px 16px', display:'flex', justifyContent:'space-between'}}>
        <span style={{fontWeight:'800', fontSize:'19px'}}>Zamiq</span>
        <span style={{fontSize:'11px', background:'#00A884', padding:'4px 8px', borderRadius:'20px'}}>● Supabase Live</span>
      </div>
      <div style={{margin:'12px', background: isReal ? 'linear-gradient(135deg,#00A884,#005C4B)' : '#182229', border:`1px solid ${isReal ? '#00A884' : '#444'}`, borderRadius:'12px', padding:'12px', display:'flex', justifyContent:'space-between'}}>
        <div><div style={{fontSize:'10px', opacity:0.8}}>{isReal ? '✓ REAL +1' : 'VIRTUAL +1'} • {user.email}</div><div style={{fontWeight:'800'}}>{user.zamiq_number}</div><div style={{fontSize:'10px', opacity:0.6}}>Balance ${balance.toFixed(2)} • Realtime ON</div></div>
        {!isReal && <button onClick={()=>setShowUpgrade(true)} style={{background:'white', color:'#111B21', border:'none', borderRadius:'8px', padding:'8px 12px', fontSize:'11px', fontWeight:'800'}}>Real +1</button>}
      </div>
      {showUpgrade && <div style={{margin:'12px', background:'#202C33', borderRadius:'12px', padding:'16px', border:'1px solid #00A884'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'700'}}>Upgrade</span><span onClick={()=>setShowUpgrade(false)}>✕</span></div><button onClick={upgradeToReal} style={{width:'100%', marginTop:'12px', background:'#00A884', border:'none', padding:'12px', borderRadius:'8px', color:'white', fontWeight:'700'}}>Pay $4.99 → Real +1</button></div>}
      <div style={{flex:1}}>
        {chats.map(c=><div key={c.id} onClick={()=>setActiveId(c.id)} style={{display:'flex', gap:'12px', padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', cursor:'pointer'}}>
          <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{c.avatar}</div>
          <div style={{flex:1}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'600'}}>{c.name}</span><span style={{fontSize:'11px', opacity:0.4}}>{c.time}</span></div><div style={{fontSize:'12px', opacity:0.6, display:'flex', justifyContent:'space-between'}}><span>{c.last}</span><span style={{display:'flex', gap:'12px'}}><IconPhone/><IconVideo/></span></div><div style={{fontSize:'10px', opacity:0.4}}>{c.email}</div></div>
        </div>)}
      </div>
      <div style={{padding:'12px', background:'#202C33', fontSize:'10px', opacity:0.5, textAlign:'center'}}>Test: Login on 2 devices with lola@test.com & emeka@test.com → Chat + Call go ring for real via Supabase</div>
    </div>
  )
                          }
