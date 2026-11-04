'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase, genZamiqNumber, isSupabaseConfigured, genId, formatTime } from '@/lib/supabase'

type Msg = { id:string; fromMe:boolean; type:'text'|'payment'|'esim'|'call'; text:string; time:string; status:'sent'|'delivered'|'read'; amount?:number }
type Chat = { id:number; name:string; number:string; avatar:string; last:string; time:string; unread:number; msgs:Msg[] }

export default function ZamiqCalls(){
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
  const [callState, setCallState] = useState<'idle'|'calling'|'connected'>('idle')
  const [callType, setCallType] = useState<'voice'|'video'>('voice')
  const [callWith, setCallWith] = useState<Chat|null>(null)
  const [callTime, setCallTime] = useState(0)
  const [muted, setMuted] = useState(false)
  const [speaker, setSpeaker] = useState(false)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream|null>(null)

  const [chats, setChats] = useState<Chat[]>([
    {id:1, name:'Lola Yaba', number: genZamiqNumber(), avatar:'L', last:'You sent $20', time:'now', unread:0, msgs:[{id:genId(), fromMe:true, type:'payment', text:'Sent $20 for hair', time:'now', status:'read', amount:20}]},
    {id:2, name:'Emeka US', number: genZamiqNumber(), avatar:'E', last:'Tap call icons top right →', time:'09:12', unread:1, msgs:[]},
    {id:3, name:'Family Group ❤️', number:'5 members', avatar:'G', last:'Dad: Sunday', time:'Yesterday', unread:0, msgs:[]},
  ])

  useEffect(()=>{ const s=localStorage.getItem('zamiq_user'); if(s){ const u=JSON.parse(s); setUser(u); setIsReal(u.is_real||false) } },[])
  useEffect(()=>{ if(callState==='connected'){ const i=setInterval(()=>setCallTime(t=>t+1),1000); (window as any).ci=i; return()=>clearInterval(i) } },[callState])

  const login = async () => {
    if(!email.includes('@') || !name) return alert('Enter Gmail + name')
    const myNum = genZamiqNumber()
    const u = { email, name, zamiq_number: myNum, is_real:false }
    if(isSupabaseConfigured()){ try{ const {data}=await supabase.from('users').select('*').eq('email',email).single(); if(data){ setUser(data); localStorage.setItem('zamiq_user', JSON.stringify(data)); setIsReal(data.is_real); return } await supabase.from('users').insert({email,name,zamiq_number:myNum,is_real:false}) }catch{} }
    setUser(u); localStorage.setItem('zamiq_user', JSON.stringify(u))
  }

  const send = (type:Msg['type']='text', txt?:string, amt?:number) => {
    if(activeId===null) return
    const text = txt || input.trim(); if(!text && type==='text') return
    const newMsg:Msg = { id:genId(), fromMe:true, type, text, time:formatTime(), status:'read', amount:amt }
    setChats(p=>p.map(c=> c.id===activeId ? {...c, last: type==='payment'? `You sent $${amt}`: type==='call'? txt! : text, msgs:[...c.msgs, newMsg]} : c))
    if(type==='payment' && amt) setBalance(b=>b-amt)
    setInput(''); setShowPay(false)
  }

  const startCall = async (chat:Chat, type:'voice'|'video') => {
    setCallWith(chat); setCallType(type); setCallState('calling'); setCallTime(0)
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video: type==='video', audio: true })
      streamRef.current = stream
      if(localVideoRef.current) localVideoRef.current.srcObject = stream
      setTimeout(()=> setCallState('connected'), 1800)
    }catch(e){ alert('Allow camera/mic: '+e); setCallState('idle') }
  }

  const endCall = () => {
    streamRef.current?.getTracks().forEach(t=>t.stop())
    clearInterval((window as any).ci)
    const dur = `${Math.floor(callTime/60)}:${(callTime%60).toString().padStart(2,'0')}`
    if(callWith){ send('call', `${callType==='video'?'Video':'Voice'} call • ${callState==='connected'? dur : 'No answer'} • ${user.zamiq_number} → ${callWith.number}`) }
    setCallState('idle'); setCallWith(null); setCallTime(0); setMuted(false); setSpeaker(false)
  }

  const upgradeToReal = () => {
    const realNum = `+1 (415) ${Math.floor(100+Math.random()*900)}-${Math.floor(1000+Math.random()*9000)}`
    const newU = {...user, zamiq_number: realNum, is_real:true}
    setUser(newU); setIsReal(true); localStorage.setItem('zamiq_user', JSON.stringify(newU))
    setShowUpgrade(false)
  }

  const active = chats.find(c=>c.id===activeId)
  const fmtTime = (s:number)=> `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`

  // WhatsApp Simple Icons as SVG
  const IconPhone = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  )
  const IconVideo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 13 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
  )
  const IconPhoneOff = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.8"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6z"/><line x1="23" y1="1" x2="1" y2="23" stroke="#F15C6D" strokeWidth="2.5"/></svg>
  )

  if(!user) return(
    <div style={{minHeight:'100vh', background:'#111B21', color:'white', display:'flex', justifyContent:'center', fontFamily:'system-ui'}}>
      <div style={{width:'100%', maxWidth:'400px', padding:'24px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <div style={{background:'#00A884', width:'56px', height:'56px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'900', fontSize:'24px', marginBottom:'20px'}}>Z</div>
        <h1 style={{fontSize:'28px', fontWeight:'800'}}>Zamiq Calls</h1>
        <p style={{opacity:0.6, fontSize:'13px', margin:'12px 0 20px'}}>Voice + Video with WhatsApp icons<br/>+ $ Pay + Real +1 eSIM</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'10px', width:'100%'}} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@gmail.com" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'16px', width:'100%'}} />
        <button onClick={login} style={{background:'#00A884', border:'none', borderRadius:'10px', padding:'14px', fontWeight:'700', color:'white', width:'100%'}}>Continue → Get +1</button>
      </div>
    </div>
  )

  if(active){
    return(
      <div style={{height:'100vh', background:'#111B21', display:'flex', flexDirection:'column', maxWidth:'500px', margin:'0 auto', fontFamily:'system-ui', position:'relative'}}>
        {/* FULL SCREEN CALL */}
        {callState!=='idle' && callWith && (
          <div style={{position:'fixed', inset:0, background:'#0B141A', zIndex:100, display:'flex', flexDirection:'column', color:'white'}}>
            <div style={{flex:1, position:'relative', background:'#111B21'}}>
              <video ref={remoteVideoRef} autoPlay playsInline style={{width:'100%', height:'100%', objectFit:'cover', background:'#202C33', display: callType==='video' ? 'block' : 'none'}} />
              {callType==='voice' && <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#111B21'}}><div style={{width:'96px', height:'96px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'36px', fontWeight:'700'}}>{callWith.avatar}</div></div>}
              <video ref={localVideoRef} autoPlay playsInline muted style={{position:'absolute', bottom:'110px', right:'16px', width:'110px', height:'150px', borderRadius:'12px', objectFit:'cover', background:'#2A3942', border:'2px solid rgba(255,255,255,0.8)', display: callType==='video' ? 'block' : 'none'}} />
              <div style={{position:'absolute', top:'50px', left:0, right:0, textAlign:'center'}}>
                <div style={{fontWeight:'700', fontSize:'20px'}}>{callWith.name}</div>
                <div style={{opacity:0.7, fontSize:'13px', marginTop:'6px'}}>{callState==='calling' ? `Calling...` : fmtTime(callTime)}</div>
                <div style={{fontSize:'11px', opacity:0.5, marginTop:'4px'}}>{callType==='video' ? 'Video' : 'Voice'} • {isReal ? 'Real +1' : 'Virtual'} • Encrypted</div>
                <div style={{fontSize:'10px', opacity:0.4, marginTop:'2px'}}>{user.zamiq_number} → {callWith.number}</div>
              </div>
            </div>
            <div style={{background:'#202C33', padding:'20px 0 30px', display:'flex', justifyContent:'center', gap:'28px', alignItems:'center'}}>
              <button onClick={()=>setMuted(!muted)} style={{width:'48px', height:'48px', borderRadius:'50%', background: muted ? 'white' : '#2A3942', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={muted ? 'black' : 'white'} strokeWidth="1.8"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
              </button>
              <button onClick={endCall} style={{width:'64px', height:'64px', borderRadius:'50%', background:'#F15C6D', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}><IconPhoneOff/></button>
              <button onClick={()=>setSpeaker(!speaker)} style={{width:'48px', height:'48px', borderRadius:'50%', background: speaker ? 'white' : '#2A3942', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={speaker ? 'black' : 'white'} strokeWidth="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* Header with WhatsApp icons */}
        <div style={{background:'#202C33', padding:'10px 12px', display:'flex', gap:'14px', alignItems:'center', color:'white'}}>
          <span onClick={()=>setActiveId(null)} style={{cursor:'pointer', fontSize:'20px'}}>←</span>
          <div style={{width:'36px', height:'36px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{active.avatar}</div>
          <div style={{flex:1}}><div style={{fontWeight:'600', fontSize:'15px'}}>{active.name}</div><div style={{fontSize:'11px', opacity:0.6}}>{isReal ? '✓ Real +1' : active.number} • ${balance.toFixed(2)}</div></div>
          <button onClick={()=>startCall(active, 'voice')} style={{background:'transparent', border:'none', color:'white', cursor:'pointer', padding:'6px'}}><IconPhone/></button>
          <button onClick={()=>startCall(active, 'video')} style={{background:'transparent', border:'none', color:'white', cursor:'pointer', padding:'6px'}}><IconVideo/></button>
        </div>

        <div style={{flex:1, background:'#0B141A', padding:'12px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'8px'}}>
          {active.msgs.map(m=><div key={m.id} style={{alignSelf: m.fromMe ? 'flex-end' : 'flex-start', background: m.type==='payment' ? '#0A332C' : m.type==='call' ? '#182229' : m.fromMe ? '#005C4B' : '#202C33', border: m.type==='payment' ? '1px solid #00A884' : m.type==='call' ? '1px solid #2A3942' : 'none', color:'white', padding:'10px', borderRadius:'12px', maxWidth:'78%', fontSize:'13px'}}>
            {m.type==='call' ? <div style={{display:'flex', gap:'8px', alignItems:'center'}}><div style={{width:'32px', height:'32px', borderRadius:'50%', background: m.text.includes('Video') ? '#00A884' : '#2A3942', display:'flex', alignItems:'center', justifyContent:'center'}}>{m.text.includes('Video') ? <IconVideo/> : <IconPhone/>}</div><div><div style={{fontWeight:'600', fontSize:'12px'}}>{m.text}</div><div style={{fontSize:'10px', opacity:0.5}}>{m.time}</div></div></div> :
             m.type==='payment' ? <div><div style={{fontWeight:'700', color:'#00A884'}}>${m.amount}.00</div><div>{m.text}</div></div> :
             <>{m.text}<span style={{fontSize:'9px', opacity:0.5, marginLeft:'6px'}}>{m.time} ✓✓</span></>}
          </div>)}
        </div>

        {showPay && <div style={{background:'#202C33', padding:'16px'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'700'}}>Send $</span><span onClick={()=>setShowPay(false)}>✕</span></div><div style={{display:'flex', gap:'8px', marginTop:'12px'}}>{[5,10,20,50].map(a=><button key={a} onClick={()=>setPayAmount(a.toString())} style={{flex:1, background: payAmount===a.toString() ? '#00A884' : '#2A3942', border:'none', padding:'10px', borderRadius:'8px', color:'white'}}>${a}</button>)}</div><button onClick={()=>{ const amt=parseFloat(payAmount); if(amt) send('payment', `Sent $${amt}`, amt); setPayAmount('') }} style={{width:'100%', marginTop:'12px', background:'#00A884', border:'none', padding:'12px', borderRadius:'8px', color:'white', fontWeight:'700'}}>Send ${payAmount || '0'}</button></div>}

        <div style={{background:'#202C33', padding:'8px', display:'flex', gap:'8px', alignItems:'center'}}>
          <button onClick={()=>setShowPay(true)} style={{background:'#00A884', width:'36px', height:'36px', borderRadius:'50%', border:'none', color:'white', fontWeight:'700'}}>$</button>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} placeholder="Message" style={{flex:1, background:'#2A3942', border:'none', borderRadius:'20px', padding:'10px 14px', color:'white', outline:'none'}} />
          <button onClick={()=>send()} style={{width:'36px', height:'36px', background:'#00A884', borderRadius:'50%', border:'none', color:'white'}}>➤</button>
        </div>
      </div>
    )
  }

  return(
    <div style={{minHeight:'100vh', background:'#111B21', color:'white', maxWidth:'500px', margin:'0 auto', display:'flex', flexDirection:'column', fontFamily:'system-ui'}}>
      <div style={{background:'#202C33', padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{fontWeight:'800', fontSize:'19px'}}>Zamiq</span>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}><div onClick={()=>setShowAddMoney(true)} style={{background:'rgba(0,168,132,0.15)', padding:'4px 8px', borderRadius:'20px', fontSize:'11px', cursor:'pointer', border:'1px solid #00A884'}}>${balance.toFixed(2)} +</div></div>
      </div>

      <div style={{margin:'12px', background: isReal ? 'linear-gradient(135deg,#00A884,#005C4B)' : '#182229', border:`1px solid ${isReal ? '#00A884' : '#444'}`, borderRadius:'12px', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div><div style={{fontSize:'10px', opacity:0.8}}>{isReal ? '✓ REAL US +1 - eSIM' : 'VIRTUAL +1'}</div><div style={{fontWeight:'800', fontSize:'16px'}}>{user.zamiq_number}</div><div style={{fontSize:'10px', opacity:0.6}}>Tap call icons in chat → WhatsApp style</div></div>
        {!isReal && <button onClick={()=>setShowUpgrade(true)} style={{background:'white', color:'#111B21', border:'none', borderRadius:'8px', padding:'8px 12px', fontSize:'11px', fontWeight:'800'}}>Real +1</button>}
      </div>

      {showUpgrade && <div style={{margin:'12px', background:'#202C33', borderRadius:'12px', padding:'16px', border:'1px solid #00A884'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'700'}}>Upgrade to Real +1</span><span onClick={()=>setShowUpgrade(false)}>✕</span></div><button onClick={upgradeToReal} style={{width:'100%', marginTop:'12px', background:'#00A884', border:'none', padding:'12px', borderRadius:'8px', color:'white', fontWeight:'700'}}>Pay $4.99 → Real +1 (415)</button></div>}

      {showAddMoney && <div style={{margin:'12px', background:'#202C33', borderRadius:'12px', padding:'16px', border:'1px solid #00A884'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'700'}}>Add Money</span><span onClick={()=>setShowAddMoney(false)}>✕</span></div><input value={addAmount} onChange={e=>setAddAmount(e.target.value)} placeholder="Amount $" style={{width:'100%', background:'#2A3942', border:'none', borderRadius:'8px', padding:'12px', color:'white', marginTop:'12px'}} /><button onClick={()=>{ const a=parseFloat(addAmount); if(a){ setBalance(b=>b+a); setShowAddMoney(false); setAddAmount('') } }} style={{width:'100%', marginTop:'12px', background:'#00A884', border:'none', padding:'12px', borderRadius:'8px', color:'white', fontWeight:'700'}}>Add ${addAmount || '0'}</button></div>}

      <div style={{flex:1}}>
        {chats.map(c=><div key={c.id} onClick={()=>setActiveId(c.id)} style={{display:'flex', gap:'12px', padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', cursor:'pointer'}}>
          <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{c.avatar}</div>
          <div style={{flex:1}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'600'}}>{c.name}</span><span style={{fontSize:'11px', opacity:0.4}}>{c.time}</span></div><div style={{fontSize:'12px', opacity:0.6, display:'flex', justifyContent:'space-between'}}><span>{c.last}</span><span style={{display:'flex', gap:'12px'}}><IconPhone/><IconVideo/></span></div></div>
        </div>)}
      </div>
    </div>
  )
    }
