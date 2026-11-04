'use client'
import { useState, useEffect } from 'react'
import { supabase, genZamiqNumber, isSupabaseConfigured } from '@/lib/supabase'

type User = { email:string; name:string; zamiq_number:string; is_real:boolean }

export default function Zamiq(){
  const [user, setUser] = useState<User|null>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [envOk, setEnvOk] = useState(true)

  useEffect(()=>{
    setEnvOk(isSupabaseConfigured())
    const saved = localStorage.getItem('zamiq_user')
    if(saved) setUser(JSON.parse(saved))
  },[])

  const login = async () => {
    if(!email.includes('@')) return alert('Enter Gmail')
    if(!name) return alert('Enter name')
    setLoading(true)

    // If Supabase no configure, use local only (no crash)
    if(!envOk){
      const localUser = { email, name, zamiq_number: genZamiqNumber(), is_real:false }
      localStorage.setItem('zamiq_user', JSON.stringify(localUser))
      setUser(localUser)
      setLoading(false)
      return
    }

    const { data: existing } = await supabase.from('users').select('*').eq('email', email).single()
    if(existing){
      setUser(existing)
      localStorage.setItem('zamiq_user', JSON.stringify(existing))
      setLoading(false)
      return
    }

    const newNumber = genZamiqNumber()
    const { data, error } = await supabase.from('users').insert({
      email, name, zamiq_number: newNumber, is_real:false
    }).select().single()

    if(error){
      // Fallback to local if table no exist yet
      const localUser = { email, name, zamiq_number: newNumber, is_real:false }
      localStorage.setItem('zamiq_user', JSON.stringify(localUser))
      setUser(localUser)
    } else {
      setUser(data)
      localStorage.setItem('zamiq_user', JSON.stringify(data))
    }
    setLoading(false)
  }

  const upgrade = async () => {
    if(!user) return
    const realNum = genZamiqNumber().replace('800', '202')
    if(!envOk){
      const upgraded = {...user, zamiq_number: realNum, is_real:true}
      setUser(upgraded)
      localStorage.setItem('zamiq_user', JSON.stringify(upgraded))
      return
    }
    const { data } = await supabase.from('users').update({ zamiq_number: realNum, is_real:true }).eq('email', user.email).select().single()
    if(data){
      setUser(data)
      localStorage.setItem('zamiq_user', JSON.stringify(data))
    }
  }

  if(!user){
    return(
      <div style={{minHeight:'100vh', background:'#08080A', color:'white', padding:'24px', fontFamily:'system-ui', maxWidth:'400px', margin:'0 auto', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <h1 style={{fontWeight:'900', fontSize:'32px'}}>ZAMIQ</h1>
        <p style={{opacity:0.5, fontSize:'13px', margin:'8px 0 20px'}}>
          {envOk ? 'Supabase connected • Gmail → +1' : 'Local mode • Vercel env missing, but app no crash'}
        </p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" style={{background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'14px', color:'white', outline:'none', marginBottom:'10px'}} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@gmail.com" style={{background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'14px', color:'white', outline:'none', marginBottom:'16px'}} />
        <button onClick={login} disabled={loading} style={{background:'white', color:'black', border:'none', borderRadius:'12px', padding:'14px', fontWeight:'800'}}>{loading ? 'Generating +1...' : 'Login → Get +1 Number'}</button>
        <div style={{marginTop:'16px', background:'rgba(255,255,255,0.04)', borderRadius:'10px', padding:'10px', fontSize:'11px', opacity:0.4}}>
          Will assign: {genZamiqNumber()} <br/> Format: +1 (800) 736-XXXX • Fake pool • Later pay for real
        </div>
      </div>
    )
  }

  return(
    <div style={{minHeight:'100vh', background:'#08080A', color:'white', padding:'16px', fontFamily:'system-ui', maxWidth:'500px', margin:'0 auto'}}>
      <div style={{background:'white', color:'black', borderRadius:'20px', padding:'20px', textAlign:'center'}}>
        <div style={{fontSize:'10px', letterSpacing:'2px', fontWeight:'800', opacity:0.5}}>{user.is_real ? 'REAL US NUMBER ✓' : 'VIRTUAL NUMBER • FREE'}</div>
        <div style={{fontSize:'28px', fontWeight:'900', margin:'10px 0'}}>{user.zamiq_number}</div>
        <div style={{fontSize:'12px', opacity:0.6}}>{user.name} • {user.email}</div>
        {!user.is_real && <button onClick={upgrade} style={{marginTop:'14px', background:'black', color:'white', border:'none', borderRadius:'10px', padding:'10px 16px', fontWeight:'700', cursor:'pointer'}}>Upgrade to Real $4.99</button>}
        {user.is_real && <div style={{marginTop:'10px', fontSize:'11px', background:'#E5FFE5', padding:'6px 12px', borderRadius:'20px', display:'inline-block'}}>Real US number active for calls</div>}
      </div>
      <button onClick={()=>{localStorage.clear(); setUser(null)}} style={{marginTop:'20px', width:'100%', background:'transparent', color:'rgba(255,255,255,0.4)', border:'none', fontSize:'12px'}}>Logout / New Number</button>
      <div style={{marginTop:'20px', fontSize:'10px', opacity:0.25, textAlign:'center'}}>{envOk ? 'Supabase OK • users table' : 'Local mode • Add env for Supabase'} • ZAMIQ from scratch</div>
    </div>
  )
    }
