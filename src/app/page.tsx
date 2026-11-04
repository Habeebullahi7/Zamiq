'use client'
import { useState, useEffect } from 'react'
import { supabase, genZamiqNumber, isSupabaseConfigured } from '@/lib/supabase'

type Chat = { id:number; name:string; number:string; last:string; time:string; unread:number; msgs:{fromMe:boolean; text:string; time:string}[] }

export default function Zamiq(){
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [tab, setTab] = useState('chats')
  const [activeId, setActiveId] = useState<number|null>(null)
  const [input, setInput] = useState('')
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(()=>{
    const s = localStorage.getItem('zamiq_user')
    const c = localStorage.getItem('zamiq_chats')
    if(s){
      setUser(JSON.parse(s))
      if(c) setChats(JSON.parse(c))
      else setChats([
        {id:1, name:'Lola (Lagos)', number: genZamiqNumber(), last:'Welcome to Zamiq! Your free +1', time:'now', unread:1, msgs:[{fromMe:false, text:'Welcome to Zamiq! Your free +1 number don ready.', time:'now'}]},
        {id:2, name:'Emeka US', number: genZamiqNumber(), last:'How the US number?', time:'9:12', unread:0, msgs:[{fromMe:false, text:'Guy your +1 number dey work?', time:'9:12'}]},
        {id:3, name:'Zamiq Support', number:'+1 (800) 736-0000', last:'Gmail → +1 assigned ✓', time:'Yesterday', unread:0, msgs:[{fromMe:false, text:'Gmail → +1 assigned ✓\nSupabase: users table\nFrom scratch', time:'Yesterday'}]},
      ])
    }
  },[])

  useEffect(()=>{ if(chats.length) localStorage.setItem('zamiq_chats', JSON.stringify(chats)) },[chats])

  const login = async () => {
    if(!email.includes('@')) return alert('Put Gmail')
    if(!name) return alert('Put name')
    const myNum = genZamiqNumber()
    const u = { email, name, zamiq_number: myNum, is_real:false }

    if(isSupabaseConfigured()){
      try{
        const { data } = await supabase.from('users').select('*').eq('email', email).single()
        if(data){ setUser(data); localStorage.setItem('zamiq_user', JSON.stringify(data)); return }
        await supabase.from('users').insert({ email, name, zamiq_number: myNum, is_real:false })
      }catch{}
    }
    setUser(u)
    localStorage.setItem('zamiq_user', JSON.stringify(u))
    const init = [
      {id:1, name:'Lola (Lagos)', number: genZamiqNumber(), last:'Welcome to Zamiq!', time:'now', unread:1, msgs:[{fromMe:false, text:'Welcome to Zamiq! Your free +1 number don ready.', time:'now'}]},
      {id:2, name:'Emeka US', number: genZamiqNumber(), last:'How the US number?', time:'9:12', unread:0, msgs:[]},
    ]
    setChats(init as any)
  }

  const send = () => {
    if(!input.trim() || activeId===null) return
    setChats(prev => prev.map(ch => ch.id===activeId ? {...ch, last:input, msgs:[...ch.msgs, {fromMe:true, text:input, time:'now'}]} : ch))
    setInput('')
    setTimeout(()=>{
      setChats(prev => prev.map(ch => ch.id===activeId ? {...ch, msgs:[...ch.msgs, {fromMe:false, text:'Seen ✓ • Zamiq +1 to +1', time:'now'}]} : ch))
    }, 800)
  }

  const active = chats.find(c=>c.id===activeId)

  // LOGIN SCREEN
  if(!user){
    return(
      <div style={{minHeight:'100vh', background:'#111B21', color:'white', display:'flex', justifyContent:'center', fontFamily:'system-ui'}}>
        <div style={{width:'100%', maxWidth:'400px', padding:'24px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <div style={{background:'#00A884', width:'56px', height:'56px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'900', fontSize:'24px', marginBottom:'20px'}}>Z</div>
          <h1 style={{fontSize:'28px', fontWeight:'800', lineHeight:'1.1'}}>Welcome to<br/>Zamiq</h1>
          <p style={{opacity:0.6, fontSize:'14px', margin:'12px 0 28px', lineHeight:'1.4'}}>From scratch build:<br/>Gmail login → Supabase saves →<br/>Auto assign <b style={{color:'white'}}>+1 (800) 736-XXXX</b></p>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'10px', width:'100%'}} />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@gmail.com" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'18px', width:'100%'}} />
          <button onClick={login} style={{background:'#00A884', border:'none', borderRadius:'10px', padding:'14px', fontWeight:'700', color:'white', width:'100%', cursor:'pointer'}}>Continue → Get +1 Number</button>
          <div style={{marginTop:'16px', background:'#182229', borderRadius:'10px', padding:'12px', fontSize:'11px', opacity:0.5, border:'1px solid rgba(0,168,132,0.2)'}}>Preview number: <span style={{color:'#00A884', fontWeight:'700'}}>{genZamiqNumber()}</span><br/>Free virtual • Upgrade $4.99 later to real</div>
        </div>
      </div>
    )
  }

  // CHAT OPEN
  if(active){
    return(
      <div style={{height:'100vh', background:'#111B21', display:'flex', flexDirection:'column', maxWidth:'500px', margin:'0 auto', fontFamily:'system-ui'}}>
        <div style={{background:'#202C33', padding:'10px 12px', display:'flex', gap:'12px', alignItems:'center', color:'white'}}>
          <span onClick={()=>setActiveId(null)} style={{cursor:'pointer', fontSize:'20px'}}>←</span>
          <div style={{width:'36px', height:'36px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{active.name[0]}</div>
          <div style={{flex:1}}><div style={{fontWeight:'600', fontSize:'14px'}}>{active.name}</div><div style={{fontSize:'11px', opacity:0.6}}>{active.number} • you: {user.zamiq_number}</div></div>
          <span>📞</span><span>📹</span>
        </div>
        <div style={{flex:1, background:'#0B141A', padding:'12px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'8px'}}>
          <div style={{alignSelf:'center', background:'#182229', padding:'6px 10px', borderRadius:'8px', fontSize:'10px', opacity:0.5, margin:'10px 0'}}>End-to-end encrypted • Zamiq +1 to +1</div>
          {active.msgs.map((m,i)=><div key={i} style={{alignSelf: m.fromMe ? 'flex-end' : 'flex-start', background: m.fromMe ? '#005C4B' : '#202C33', color:'white', padding:'8px 10px', borderRadius: m.fromMe ? '12px 0 12px 12px' : '0 12px 12px 12px', maxWidth:'75%', fontSize:'13px'}}>{m.text}<span style={{fontSize:'9px', opacity:0.5, marginLeft:'8px'}}>{m.time}</span></div>)}
        </div>
        <div style={{background:'#202C33', padding:'8px', display:'flex', gap:'8px', alignItems:'center'}}><span style={{fontSize:'20px'}}>😊</span><span style={{fontSize:'20px'}}>📎</span><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} placeholder="Type a message" style={{flex:1, background:'#2A3942', border:'none', borderRadius:'20px', padding:'10px 14px', color:'white', outline:'none'}} /><button onClick={send} style={{width:'36px', height:'36px', background:'#00A884', borderRadius:'50%', border:'none', color:'white', cursor:'pointer'}}>➤</button></div>
      </div>
    )
  }

  // MAIN LIST
  return(
    <div style={{minHeight:'100vh', background:'#111B21', color:'white', fontFamily:'system-ui', maxWidth:'500px', margin:'0 auto', display:'flex', flexDirection:'column'}}>
      <div style={{background:'#202C33', padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{fontWeight:'800', fontSize:'18px'}}>Zamiq</span>
        <div style={{display:'flex', gap:'16px', fontSize:'18px'}}><span>🔍</span><span>⋮</span></div>
      </div>
      <div style={{margin:'12px', background:'#182229', border:'1px solid #00A884', borderRadius:'12px', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div><div style={{fontSize:'10px', opacity:0.6, letterSpacing:'1px'}}>YOUR ZAMIQ NUMBER</div><div style={{fontWeight:'800', fontSize:'16px', marginTop:'2px'}}>{user.zamiq_number}</div><div style={{fontSize:'10px', opacity:0.5}}>{user.name} • {user.email}</div></div>
        <button onClick={()=>alert('Upgrade to real +1 coming - $4.99')} style={{background:'#00A884', color:'white', border:'none', borderRadius:'8px', padding:'8px 12px', fontSize:'11px', fontWeight:'700', cursor:'pointer'}}>Upgrade</button>
      </div>
      <div style={{display:'flex', background:'#202C33'}}>{['chats','updates','communities','calls'].map(t=><div key={t} onClick={()=>setTab(t)} style={{flex:1, padding:'12px 4px', textAlign:'center', fontSize:'11px', fontWeight:'700', textTransform:'uppercase', borderBottom: tab===t ? '3px solid #00A884' : '3px solid transparent', opacity: tab===t ? 1 : 0.5, cursor:'pointer'}}>{t}</div>)}</div>
      <div style={{flex:1, background:'#111B21'}}>
        {tab==='chats' && chats.map(c=><div key={c.id} onClick={()=>setActiveId(c.id)} style={{display:'flex', gap:'12px', padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', cursor:'pointer'}}>
          <div style={{width:'46px', height:'46px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', fontSize:'18px'}}>{c.name[0]}</div>
          <div style={{flex:1, overflow:'hidden'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'600', fontSize:'15px'}}>{c.name}</span><span style={{fontSize:'11px', opacity:0.4}}>{c.time}</span></div><div style={{fontSize:'11px', opacity:0.5, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{c.number}</div><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:'13px', opacity:0.6, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{c.last}</span>{c.unread>0 && <span style={{background:'#00A884', color:'white', fontSize:'10px', padding:'2px 6px', borderRadius:'10px'}}>{c.unread}</span>}</div></div>
        </div>)}
        {tab!=='chats' && <div style={{padding:'40px', textAlign:'center', opacity:0.4, fontSize:'13px'}}>{tab} coming soon • Zamiq from scratch</div>}
      </div>
      <div style={{display:'flex', justifyContent:'center', gap:'6px', padding:'8px', background:'#202C33'}}>
        <div style={{width:'40px', height:'4px', background:'rgba(255,255,255,0.3)', borderRadius:'2px'}}></div>
      </div>
      <div style={{padding:'6px', textAlign:'center', fontSize:'9px', opacity:0.2}}>Gmail {user.email} → {user.zamiq_number} • Supabase {isSupabaseConfigured() ? 'connected' : 'local'} • From scratch</div>
    </div>
  )
      }
