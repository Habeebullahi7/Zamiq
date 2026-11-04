'use client'
import { useState, useEffect } from 'react'
import { supabase, genZamiqNumber, isSupabaseConfigured } from '@/lib/supabase'

type Chat = { id:number; name:string; number:string; last:string; time:string }

export default function Zamiq(){
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [tab, setTab] = useState('chats')
  const [chats, setChats] = useState<Chat[]>([])
  const [active, setActive] = useState<Chat|null>(null)
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    const s = localStorage.getItem('zamiq_user')
    if(s){
      const u = JSON.parse(s)
      setUser(u)
      setChats([
        {id:1, name:'Lola Yaba', number: genZamiqNumber(), last:'Your new +1 number sweet!', time:'09:12'},
        {id:2, name:'Emeka US', number: genZamiqNumber(), last:'Call me on Zamiq', time:'Yesterday'},
      ])
    }
  },[])

  const login = async () => {
    if(!email.includes('@')) return alert('Enter Gmail')
    if(!name) return alert('Enter name')
    const myNum = genZamiqNumber()

    if(isSupabaseConfigured()){
      const { data } = await supabase.from('users').select('*').eq('email', email).single()
      if(data){
        setUser(data); localStorage.setItem('zamiq_user', JSON.stringify(data))
        return
      }
      await supabase.from('users').insert({ email, name, zamiq_number: myNum, is_real:false })
    }
    const u = { email, name, zamiq_number: myNum, is_real:false }
    localStorage.setItem('zamiq_user', JSON.stringify(u))
    setUser(u)
    setChats([
      {id:1, name:'Lola Yaba', number: genZamiqNumber(), last:'Welcome to Zamiq!', time:'now'},
    ])
  }

  if(!user){
    return(
      <div style={{minHeight:'100vh', background:'#111B21', color:'white', padding:'24px', fontFamily:'system-ui', maxWidth:'400px', margin:'0 auto', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <div style={{background:'#00A884', width:'48px', height:'48px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'900', fontSize:'20px', marginBottom:'16px'}}>Z</div>
        <h1 style={{fontSize:'28px', fontWeight:'800'}}>Welcome to Zamiq</h1>
        <p style={{opacity:0.6, fontSize:'14px', margin:'8px 0 20px'}}>Gmail login • We assign you<br/>free <b style={{color:'white'}}>+1 number</b> like Zangi</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'10px', width:'100%'}} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@gmail.com" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'16px', width:'100%'}} />
        <button onClick={login} style={{background:'#00A884', border:'none', borderRadius:'10px', padding:'14px', fontWeight:'700', color:'white', width:'100%'}}>Continue → Get +1 Number</button>
        <p style={{fontSize:'11px', opacity:0.4, textAlign:'center', marginTop:'12px'}}>Free virtual +1 (800) 736-XXXX • Upgrade later to real</p>
      </div>
    )
  }

  if(active){
    return(
      <div style={{height:'100vh', background:'#111B21', display:'flex', flexDirection:'column', maxWidth:'500px', margin:'0 auto', fontFamily:'system-ui'}}>
        <div style={{background:'#202C33', padding:'12px', display:'flex', gap:'12px', alignItems:'center', color:'white'}}>
          <span onClick={()=>setActive(null)} style={{cursor:'pointer'}}>←</span>
          <div style={{width:'36px', height:'36px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{active.name[0]}</div>
          <div><div style={{fontWeight:'600', fontSize:'14px'}}>{active.name}</div><div style={{fontSize:'11px', opacity:0.6}}>{active.number} • {user.zamiq_number}</div></div>
        </div>
        <div style={{flex:1, background:'#0B141A', padding:'12px', color:'white'}}><p style={{opacity:0.4, textAlign:'center', marginTop:'40px', fontSize:'13px'}}>Chat with {active.name}<br/>{active.number}<br/>You: {user.zamiq_number}</p></div>
        <div style={{background:'#202C33', padding:'10px', display:'flex', gap:'8px'}}><input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type a message" style={{flex:1, background:'#2A3942', border:'none', borderRadius:'20px', padding:'10px 14px', color:'white', outline:'none'}} /><div style={{width:'36px', height:'36px', background:'#00A884', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>➤</div></div>
      </div>
    )
  }

  return(
    <div style={{minHeight:'100vh', background:'#111B21', color:'white', fontFamily:'system-ui', maxWidth:'500px', margin:'0 auto', display:'flex', flexDirection:'column'}}>
      <div style={{background:'#202C33', padding:'14px 16px', display:'flex', justifyContent:'space-between'}}>
        <span style={{fontWeight:'800'}}>Zamiq</span>
        <span style={{fontSize:'11px', opacity:0.6}}>{user.zamiq_number} • {user.name}</span>
      </div>
      <div style={{margin:'12px', background:'#182229', border:'1px solid #00A884', borderRadius:'12px', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div><div style={{fontSize:'10px', opacity:0.6, letterSpacing:'1px'}}>YOUR NUMBER</div><div style={{fontWeight:'800', marginTop:'2px'}}>{user.zamiq_number}</div></div>
        <button style={{background:'#00A884', color:'white', border:'none', borderRadius:'8px', padding:'8px 12px', fontSize:'11px', fontWeight:'700'}}>Upgrade $4.99</button>
      </div>
      <div style={{display:'flex', background:'#202C33'}}>{['chats','updates','calls'].map(t=><div key={t} onClick={()=>setTab(t)} style={{flex:1, padding:'12px', textAlign:'center', fontSize:'12px', fontWeight:'700', textTransform:'uppercase', borderBottom: tab===t ? '3px solid #00A884' : 'none', opacity: tab===t ? 1 : 0.5, cursor:'pointer'}}>{t}</div>)}</div>
      <div style={{flex:1}}>{chats.map(c=><div key={c.id} onClick={()=>setActive(c)} style={{display:'flex', gap:'12px', padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', cursor:'pointer'}}><div style={{width:'44px', height:'44px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{c.name[0]}</div><div style={{flex:1}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:'600', fontSize:'14px'}}>{c.name}</span><span style={{fontSize:'11px', opacity:0.4}}>{c.time}</span></div><div style={{fontSize:'11px', opacity:0.5}}>{c.number}</div><div style={{fontSize:'13px', opacity:0.6}}>{c.last}</div></div></div>)}</div>
      <div style={{padding:'10px', textAlign:'center', fontSize:'10px', opacity:0.3}}>ZAMIQ • Gmail → {user.zamiq_number} • From scratch • WhatsApp style</div>
    </div>
  )
                   }
