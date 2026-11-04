'use client'
import { useState, useEffect } from 'react'
import { supabase, genZamiqNumber, isSupabaseConfigured } from '@/lib/supabase'

export default function Zamiq(){
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [preview] = useState(genZamiqNumber())

  useEffect(()=>{
    const s = localStorage.getItem('zamiq_user')
    if(s) setUser(JSON.parse(s))
  },[])

  const login = async () => {
    if(!email.includes('@gmail.com')) return alert('Enter Gmail')
    if(!name) return alert('Enter name')
    const num = genZamiqNumber()
    
    if(!isSupabaseConfigured()){
      const u = { email, name, zamiq_number: num, is_real: false }
      localStorage.setItem('zamiq_user', JSON.stringify(u))
      setUser(u)
      return
    }

    const { data } = await supabase.from('users').select('*').eq('email', email).single()
    if(data){
      setUser(data)
      localStorage.setItem('zamiq_user', JSON.stringify(data))
      return
    }
    const { data: newUser } = await supabase.from('users').insert({ email, name, zamiq_number: num, is_real:false }).select().single()
    const final = newUser || { email, name, zamiq_number: num, is_real:false }
    setUser(final)
    localStorage.setItem('zamiq_user', JSON.stringify(final))
  }

  if(!user){
    return(
      <div style={{minHeight:'100vh', background:'#08080A', color:'white', padding:'24px', fontFamily:'system-ui'}}>
        <h1 style={{fontWeight:'900', fontSize:'32px'}}>ZAMIQ</h1>
        <p style={{opacity:0.5, fontSize:'13px', margin:'8px 0 24px'}}>Gmail → Auto {preview} • WhatsApp clone from scratch</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'14px', color:'white', outline:'none', marginBottom:'10px'}} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@gmail.com" style={{width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'14px', color:'white', outline:'none', marginBottom:'16px'}} />
        <button onClick={login} style={{width:'100%', background:'white', color:'black', border:'none', borderRadius:'12px', padding:'14px', fontWeight:'800'}}>Login with Gmail → Get +1 Number</button>
      </div>
    )
  }

  return(
    <div style={{minHeight:'100vh', background:'#08080A', color:'white', padding:'16px', fontFamily:'system-ui'}}>
      <div style={{background:'white', color:'black', borderRadius:'20px', padding:'20px', textAlign:'center'}}>
        <div style={{fontSize:'10px', letterSpacing:'2px', fontWeight:'800', opacity:0.5}}>YOUR ZAMIQ NUMBER</div>
        <div style={{fontSize:'28px', fontWeight:'900', margin:'10px 0'}}>{user.zamiq_number}</div>
        <div style={{fontSize:'12px'}}>{user.name} • {user.email}</div>
      </div>
      <div style={{marginTop:'16px', background:'rgba(255,255,255,0.05)', padding:'14px', borderRadius:'12px'}}>
        <div style={{fontWeight:'700', fontSize:'14px'}}>WhatsApp clone ready</div>
        <div style={{fontSize:'12px', opacity:0.5, marginTop:'4px'}}>Number assigned. Next: add chats, messages, calls like WhatsApp but called Zamiq.</div>
      </div>
      <button onClick={()=>{localStorage.clear(); setUser(null)}} style={{marginTop:'20px', width:'100%', background:'transparent', color:'rgba(255,255,255,0.4)', border:'none', fontSize:'12px'}}>Logout</button>
    </div>
  )
    }
