'use client'
import { useState, useEffect } from 'react'
import { supabase, genZamiqNumber, isSupabaseConfigured, genId, formatTime } from '@/lib/supabase'

type Msg = { id:string; fromMe:boolean; type:'text'|'payment'|'esim'; text:string; time:string; status:'sent'|'delivered'|'read'; amount?:number }
type Chat = { id:number; name:string; number:string; avatar:string; last:string; time:string; unread:number; msgs:Msg[] }

export default function ZamiqPayAndSim(){
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [activeId, setActiveId] = useState<number|null>(null)
  const [input, setInput] = useState('')
  const [showPay, setShowPay] = useState(false)
  const [payAmount, setPayAmount] = useState('')
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [balance, setBalance] = useState(127.50)
  const [isReal, setIsReal] = useState(false)
  const [chats, setChats] = useState<Chat[]>([
    {id:1, name:'Lola Yaba', number: genZamiqNumber(), avatar:'L', last:'You sent $20 • Tap to view', time:'now', unread:0, msgs:[{id:genId(), fromMe:true, type:'payment', text:'Sent $20 for hair', time:'now', status:'read', amount:20}]},
    {id:2, name:'Emeka US', number: genZamiqNumber(), avatar:'E', last:'Upgrade to real +1 for bank OTP', time:'09:12', unread:1, msgs:[{id:genId(), fromMe:false, type:'text', text:'Guy your free number no fit receive Chase OTP. Upgrade to real.', time:'09:12', status:'read'}]},
  ])

  useEffect(()=>{ const s=localStorage.getItem('zamiq_user'); if(s){ const u=JSON.parse(s); setUser(u); setIsReal(u.is_real||false) } },[])

  const login = async () => {
    if(!email.includes('@') || !name) return alert('Enter Gmail + name')
    const myNum = genZamiqNumber()
    const u = { email, name, zamiq_number: myNum, is_real:false, balance:127.5 }
    if(isSupabaseConfigured()){ try{ const {data}=await supabase.from('users').select('*').eq('email',email).single(); if(data){ setUser(data); localStorage.setItem('zamiq_user', JSON.stringify(data)); setIsReal(data.is_real); return } await supabase.from('users').insert({email,name,zamiq_number:myNum,is_real:false}) }catch{} }
    setUser(u); localStorage.setItem('zamiq_user', JSON.stringify(u))
  }

  const send = (type:Msg['type']='text', txt?:string, amt?:number) => {
    if(activeId===null) return
    const text = txt || input.trim(); if(!text && type==='text') return
    const newMsg:Msg = { id:genId(), fromMe:true, type, text, time:formatTime(), status:'read', amount:amt }
    setChats(p=>p.map(c=> c.id===activeId ? {...c, last: type==='payment'? `You sent $${amt}`: type==='esim'? '🎉 Real +1 activated!' : text, msgs:[...c.msgs, newMsg]} : c))
    if(type==='payment' && amt){ setBalance(b=>b-amt); }
    setInput(''); setShowPay(false)
  }

  const upgradeToReal = () => {
    const realNum = `+1 (415) ${Math.floor(100+Math.random()*900)}-${Math.floor(1000+Math.random()*9000)}`
    const newU = {...user, zamiq_number: realNum, is_real:true}
    setUser(newU); setIsReal(true); localStorage.setItem('zamiq_user', JSON.stringify(newU))
    if(activeId) send('esim', `🎉 UPGRADED! New REAL number: ${realNum} - Now fit receive US bank OTP, WhatsApp verify, SMS. eSIM active!`)
    setShowUpgrade(false)
    if(isSupabaseConfigured()) supabase.from('users').update({zamiq_number:realNum, is_real:true}).eq('email', user.email).then(()=>{})
    alert(`Success! ${realNum} activated as eSIM`)
  }

  const active = chats.find(c=>c.id===activeId)

  if(!user) return(
    <div style={{minHeight:'100vh', background:'#111B21', color:'white', display:'flex', justifyContent:'center', fontFamily:'system-ui'}}>
      <div style={{width:'100%', maxWidth:'400px', padding:'24px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <div style={{background:'#00A884', width:'56px', height:'56px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'900', fontSize:'24px', marginBottom:'20px'}}>Z</div>
        <h1 style={{fontSize:'28px', fontWeight:'800'}}>Zamiq Pay + eSIM</h1>
        <p style={{opacity:0.6, fontSize:'13px', margin:'12px 0 20px'}}>Feature #7: Send $ inside chat<br/>Feature #10: Upgrade to real +1 for bank OTP</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'10px', width:'100%'}} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@gmail.com" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'16px', width:'100%'}} />
        <button onClick={login} style={{background:'#00A884', border:'none', borderRadius:'10px', padding:'14px', fontWeight:'700', color:'white', width:'100%'}}>Continue → Get +1</button>
      </div>
    </div>
  )

  if(active){
    return(
      <div style={{height:'100vh', background:'#111B21', display:'flex', flexDirection:'column', maxWidth:'500px', margin:'0 auto', fontFamily:'system-ui'}}>
        <div style={{background:'#202C33', padding:'10px 12px', display:'flex', gap:'12px', alignItems:'center', color:'white'}}>
          <span onClick={()=>setActiveId(null)} style={{cursor:'pointer'}}>←</span>
          <div style={{width:'36px', height:'36px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{active.avatar}</div>
          <div style={{flex:1}}><div style={{fontWeight:'600', fontSize:'14px'}}>{active.name}</div><div style={{fontSize:'11px', opacity:0.6}}>{isReal ? '✓ Real +1 • OTP ready' : active.number} • Bal: ${balance.toFixed(2)}</div></div>
          <span onClick={()=>setShowPay(true)} style={{cursor:'pointer', background:'#00A884', padding:'6px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:'700'}}>$ Send</span>
        </div>

        <div style={{flex:1, background:'#0B141A', padding:'12px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'8px'}}>
          {active.msgs.map(m=><div key={m.id} style={{alignSelf: m.fromMe ? 'flex-end' : 'flex-start', background: m.type==='payment' ? (m.fromMe ? '#0A332C' : '#182229') : m.fromMe ? '#005C4B' : '#202C33', border: m.type==='payment' ? '1px solid #00A884' : 'none', color:'white', padding:m.type==='payment'?'12px':'8px 10px', borderRadius:'12px', maxWidth:'75%', fontSize:'13px'}}>
            {m.type==='payment' ? <div><div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><span style={{fontWeight:'700', color:'#00A884', fontSize:'16px'}}>${m.amount}.00</span><span style={{fontSize:'10px', opacity:0.5}}>{m.time} ✓✓</span></div><div style={{marginTop:'6px'}}>{m.text}</div><div style={{marginTop:'8px', background:'#00A884', textAlign:'center', padding:'6px', borderRadius:'6px', fontSize:'11px', fontWeight:'700'}}>✓ Completed • Tap to view receipt</div></div> :
             m.type==='esim' ? <div><div style={{fontSize:'20px'}}>🎉</div><div style={{fontWeight:'700', marginTop:'4px'}}>{m.text}</div><div style={{fontSize:'10px', opacity:0.6, marginTop:'4px'}}>Powered by Telnyx eSIM • {user.zamiq_number}</div></div> :
             <>{m.text}<span style={{fontSize:'9px', opacity:0.5, marginLeft:'8px'}}>{m.time} ✓✓</span></>}
          </div>)}
        </div>

        {showPay && <div style={{background:'#202C33', padding:'16px', borderTop:'1px solid #00A884'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}><span style={{fontWeight:'700'}}>Send Money</span><span onClick={()=>setShowPay(false)} style={{cursor:'pointer'}}>✕</span></div>
          <div style={{fontSize:'11px', opacity:0.5, marginBottom:'8px'}}>Balance: ${balance.toFixed(2)} • To: {active.name} {active.number}</div>
          <div style={{display:'flex', gap:'8px', marginBottom:'12px'}}>{[5,10,20,50].map(a=><button key={a} onClick={()=>setPayAmount(a.toString())} style={{flex:1, background: payAmount===a.toString() ? '#00A884' : '#2A3942', border:'none', padding:'10px', borderRadius:'8px', color:'white', fontWeight:'700'}}>${a}</button>)}</div>
          <input value={payAmount} onChange={e=>setPayAmount(e.target.value)} type="number" placeholder="Amount $" style={{width:'100%', background:'#2A3942', border:'none', borderRadius:'8px', padding:'12px', color:'white', marginBottom:'8px'}} />
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Note (e.g. for hair)" style={{width:'100%', background:'#2A3942', border:'none', borderRadius:'8px', padding:'12px', color:'white', marginBottom:'12px'}} />
          <button onClick={()=>{ const amt=parseFloat(payAmount); if(!amt || amt>balance) return alert('Invalid amount'); send('payment', input || `Sent $${amt}`, amt); setPayAmount('') }} style={{width:'100%', background:'#00A884', border:'none', padding:'12px', borderRadius:'8px', color:'white', fontWeight:'700'}}>Send ${payAmount || '0'} to {active.name}</button>
          <div style={{fontSize:'9px', opacity:0.4, textAlign:'center', marginTop:'8px'}}>Powered by Zamiq Pay • Stripe + Paystack • Instant to {isReal ? 'real +1' : 'virtual +1'}</div>
        </div>}

        <div style={{background:'#202C33', padding:'8px', display:'flex', gap:'8px', alignItems:'center'}}>
          <span onClick={()=>setShowPay(true)} style={{background:'#00A884', width:'36px', height:'36px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontWeight:'700'}}>$</span>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} placeholder="Type message or tap $ to send money" style={{flex:1, background:'#2A3942', border:'none', borderRadius:'20px', padding:'10px 14px', color:'white', outline:'none'}} />
          <button onClick={()=>send()} style={{width:'36px', height:'36px', background:'#00A884', borderRadius:'50%', border:'none', color:'white'}}>➤</button>
        </div>
      </div>
    )
  }

  return(
    <div style={{minHeight:'100vh', background:'#111B21', color:'white', maxWidth:'500px', margin:'0 auto', display:'flex', flexDirection:'column', fontFamily:'system-ui'}}>
      <div style={{background:'#202C33', padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{fontWeight:'800', fontSize:'19px'}}>Zamiq</span>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}><div style={{background:'rgba(0,168,132,0.15)', padding:'4px 8px', borderRadius:'20px', fontSize:'11px'}}>${balance.toFixed(2)}</div><span onClick={()=>setShowUpgrade(true)} style={{cursor:'pointer'}}>⋮</span></div>
      </div>

      <div style={{margin:'12px', background: isReal ? 'linear-gradient(135deg,#00A884,#005C4B)' : 'linear-gradient(135deg,#182229,#202C33)', border:`1px solid ${isReal ? '#00A884' : '#444'}`, borderRadius:'12px', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div><div style={{fontSize:'10px', opacity:0.8}}>{isReal ? '✓ REAL US NUMBER - eSIM ACTIVE' : 'YOUR VIRTUAL +1'}</div><div style={{fontWeight:'800', fontSize:'16px'}}>{user.zamiq_number}</div><div style={{fontSize:'10px', opacity:0.7}}>{isReal ? '✓ Receives bank OTP • WhatsApp verify • SMS' : 'Free virtual • Upgrade for OTP'}</div></div>
        {!isReal && <button onClick={()=>setShowUpgrade(true)} style={{background:'white', color:'#111B21', border:'none', borderRadius:'8px', padding:'8px 12px', fontSize:'11px', fontWeight:'800'}}>Get Real +1</button>}
        {isReal && <div style={{fontSize:'20px'}}>✓</div>}
      </div>

      {showUpgrade && <div style={{margin:'12px', background:'#202C33', borderRadius:'12px', padding:'16px', border:'1px solid #00A884'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'700'}}>Upgrade to Real US +1</span><span onClick={()=>setShowUpgrade(false)} style={{cursor:'pointer'}}>✕</span></div>
        <div style={{marginTop:'12px', fontSize:'13px', lineHeight:'1.4'}}>
          <div>✓ Real number from California/Texas</div>
          <div>✓ Receives Chase, BoA, PayPal OTP</div>
          <div>✓ Can verify WhatsApp with it</div>
          <div>✓ eSIM - no physical SIM needed</div>
          <div>✓ Keep your free number as backup</div>
          <div style={{marginTop:'8px', fontSize:'11px', opacity:0.5}}>Powered by Telnyx + Twilio • $4.99/month • Cancel anytime</div>
        </div>
        <button onClick={upgradeToReal} style={{width:'100%', marginTop:'12px', background:'#00A884', border:'none', padding:'12px', borderRadius:'8px', color:'white', fontWeight:'700'}}>Pay $4.99 → Activate Real +1 Now</button>
      </div>}

      <div style={{flex:1, background:'#111B21'}}>
        {chats.map(c=><div key={c.id} onClick={()=>setActiveId(c.id)} style={{display:'flex', gap:'12px', padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', cursor:'pointer'}}>
          <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{c.avatar}</div>
          <div style={{flex:1}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'600'}}>{c.name}</span><span style={{fontSize:'11px', opacity:0.4}}>{c.time}</span></div><div style={{fontSize:'12px', opacity:0.6}}>{c.last}</div></div>
        </div>)}
      </div>

      <div style={{padding:'12px', background:'#202C33', display:'flex', justifyContent:'space-around', fontSize:'11px', opacity:0.6}}>
        <span>💬 Chats</span><span onClick={()=>setShowPay(true)} style={{color:'#00A884', fontWeight:'700'}}>$ Pay</span><span onClick={()=>setShowUpgrade(true)}>📱 Real +1</span><span>${balance.toFixed(2)}</span>
      </div>
    </div>
  )
               }
