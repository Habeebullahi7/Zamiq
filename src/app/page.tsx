'use client'
import { useState, useEffect } from 'react'

type User = { name:string; email:string; avatar:string; zamiqNumber:string; isRealNumber:boolean }
type Chat = { id:number; name:string; zamiqNumber:string; last:string; time:string; avatar:string; messages:any[] }

const FAKE_POOL = [
  '+1 (202) 555-0101', '+1 (202) 555-0102', '+1 (202) 555-0103',
  '+1 (415) 555-0111', '+1 (310) 555-0122', '+1 (212) 555-0133',
]

const genFake = () => FAKE_POOL[Math.floor(Math.random()*FAKE_POOL.length)]

export default function Zamiq(){
  const [user, setUser] = useState<User|null>(null)
  const [gmail, setGmail] = useState('')
  const [name, setName] = useState('')
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<Chat|null>(null)
  const [input, setInput] = useState('')
  const [showUpgrade, setShowUpgrade] = useState(false)

  useEffect(()=>{
    const saved = localStorage.getItem('zamiq_user')
    if(saved) {
      const u = JSON.parse(saved)
      setUser(u)
      setChats([
        {id:1, name:'Lola Yaba', zamiqNumber:'+1 (202) 555-0104', last:'You get new Zamiq number?', time:'09:12', avatar:'L', messages:[{text:'Omo your new US number sweet o', time:'09:12'}]},
        {id:2, name:'Emeka US', zamiqNumber:'+1 (415) 555-0112', last:'Call me for that number', time:'Yesterday', avatar:'E', messages:[]},
      ])
    }
  },[])

  const loginWithGmail = () => {
    if(!gmail.includes('@gmail.com')) { alert('Enter valid Gmail e.g. you@gmail.com'); return }
    if(!name) { alert('Enter name'); return }
    
    // Assign fake +1 immediately
    const fakeNumber = genFake()
    const u: User = { 
      name, 
      email: gmail, 
      avatar: name[0].toUpperCase(), 
      zamiqNumber: fakeNumber,
      isRealNumber: false 
    }
    localStorage.setItem('zamiq_user', JSON.stringify(u))
    setUser(u)
    setChats([
      {id:1, name:'Lola Yaba', zamiqNumber:'+1 (202) 555-0104', last:'You get new Zamiq number?', time:'09:12', avatar:'L', messages:[]},
    ])
  }

  const upgradeToReal = () => {
    // In real app, call Twilio API to buy number
    const realNumber = '+1 (202) 555-' + Math.floor(1000+Math.random()*8999)
    const upgraded = {...user!, zamiqNumber: realNumber, isRealNumber:true}
    localStorage.setItem('zamiq_user', JSON.stringify(upgraded))
    setUser(upgraded)
    setShowUpgrade(false)
    alert(`Upgraded! Your real US number: ${realNumber}`)
  }

  // LOGIN WITH GMAIL
  if(!user){
    return(
      <div style={{minHeight:'100vh', background:'#08080A', color:'white', display:'flex', flexDirection:'column', fontFamily:'system-ui', maxWidth:'400px', margin:'0 auto', padding:'24px'}}>
        <div style={{marginBottom:'40px', marginTop:'20px'}}>
          <div style={{fontSize:'11px', letterSpacing:'4px', fontWeight:'900', opacity:0.8}}>ZAMIQ</div>
          <h1 style={{fontSize:'36px', fontWeight:'900', lineHeight:'1', margin:'20px 0 10px'}}>Chat with<br/>US number.</h1>
          <p style={{opacity:0.5, fontSize:'14px'}}>Login with Gmail • We assign you<br/>free <span style={{color:'white', fontWeight:'700'}}>+1 number</span> like Zangi</p>
        </div>

        <div style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', padding:'20px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'12px', background:'white', color:'black', borderRadius:'12px', padding:'12px 14px', marginBottom:'16px'}}>
            <span style={{fontSize:'18px'}}>G</span>
            <div style={{flex:1}}>
              <div style={{fontSize:'10px', fontWeight:'700', letterSpacing:'1px', opacity:0.6}}>GMAIL</div>
              <input value={gmail} onChange={e=>setGmail(e.target.value)} placeholder="you@gmail.com" style={{width:'100%', border:'none', outline:'none', fontSize:'15px', fontWeight:'600'}} />
            </div>
          </div>

          <div style={{background:'rgba(255,255,255,0.06)', borderRadius:'12px', padding:'12px 14px'}}>
            <div style={{fontSize:'10px', fontWeight:'700', letterSpacing:'1px', opacity:0.5}}>YOUR NAME</div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Lola, Emeka..." style={{width:'100%', background:'transparent', border:'none', outline:'none', color:'white', fontSize:'16px', fontWeight:'600', marginTop:'4px'}} />
          </div>

          <div style={{marginTop:'16px', background:'rgba(255,255,255,0.03)', border:'1px dashed rgba(255,255,255,0.1)', borderRadius:'12px', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontSize:'10px', opacity:0.5, letterSpacing:'1px'}}>YOU WILL GET</div>
              <div style={{fontSize:'14px', fontWeight:'700', marginTop:'2px'}}>{genFake()} • FREE</div>
            </div>
            <span style={{fontSize:'20px'}}>🇺🇸</span>
          </div>

          <button onClick={loginWithGmail} style={{width:'100%', marginTop:'20px', background:'white', color:'black', border:'none', borderRadius:'20px', padding:'15px', fontWeight:'800', fontSize:'14px', cursor:'pointer'}}>Continue with Gmail →</button>
          
          <p style={{fontSize:'11px', opacity:0.35, textAlign:'center', marginTop:'12px'}}>Free virtual +1 number • Upgrade later to real US number for calls</p>
        </div>

        <div style={{marginTop:'auto', padding:'20px 0', textAlign:'center', fontSize:'11px', opacity:0.3}}>
          ZAMIQ • Zangi-style • Fake +1 pool: 555-0100 range • YABA → SF
        </div>
      </div>
    )
  }

  // CHAT SCREEN
  if(activeChat){
    return(
      <div style={{height:'100vh', background:'#08080A', color:'white', display:'flex', flexDirection:'column', maxWidth:'500px', margin:'0 auto'}}>
        <div style={{padding:'10px 12px', display:'flex', gap:'12px', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <span onClick={()=>setActiveChat(null)} style={{cursor:'pointer'}}>←</span>
          <div style={{width:'36px', height:'36px', borderRadius:'50%', background:'white', color:'black', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{activeChat.avatar}</div>
          <div style={{flex:1}}><div style={{fontWeight:'600', fontSize:'14px'}}>{activeChat.name}</div><div style={{fontSize:'11px', opacity:0.5}}>{activeChat.zamiqNumber}</div></div>
        </div>
        <div style={{flex:1, padding:'12px'}}><p style={{opacity:0.4, textAlign:'center', marginTop:'40px', fontSize:'13px'}}>Chat with {activeChat.name}<br/>{activeChat.zamiqNumber}<br/><br/>Your number: {user.zamiqNumber}</p></div>
        <div style={{padding:'10px', display:'flex', gap:'8px'}}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Message..." style={{flex:1, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', padding:'10px 14px', color:'white', outline:'none'}} /><div style={{width:'36px', height:'36px', background:'white', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'black'}}>➤</div></div>
      </div>
    )
  }

  // MAIN ZAMIQ HOME
  return(
    <div style={{minHeight:'100vh', background:'#08080A', color:'white', fontFamily:'system-ui', maxWidth:'500px', margin:'0 auto', display:'flex', flexDirection:'column'}}>
      <div style={{padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div><div style={{fontWeight:'900', letterSpacing:'2px', fontSize:'13px'}}>ZAMIQ</div><div style={{fontSize:'10px', opacity:0.5}}>{user.email}</div></div>
        <div onClick={()=>{localStorage.clear(); setUser(null)}} style={{fontSize:'11px', opacity:0.4, cursor:'pointer'}}>Logout</div>
      </div>

      {/* YOUR NUMBER CARD */}
      <div style={{margin:'16px', background: user.isRealNumber ? 'linear-gradient(135deg, #00A884, #008069)' : 'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', padding:'16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontSize:'10px', letterSpacing:'1px', opacity:0.7, fontWeight:'700'}}>{user.isRealNumber ? 'YOUR REAL US NUMBER' : 'YOUR VIRTUAL NUMBER'}</div>
          <div style={{fontSize:'20px', fontWeight:'900', marginTop:'4px'}}>{user.zamiqNumber}</div>
          <div style={{fontSize:'11px', opacity:0.6, marginTop:'2px'}}>{user.isRealNumber ? '✓ Real • Calls + SMS work' : '○ Virtual • Free • Upgrade to real'}</div>
        </div>
        {!user.isRealNumber && <button onClick={()=>setShowUpgrade(true)} style={{background:'white', color:'black', border:'none', borderRadius:'20px', padding:'10px 14px', fontWeight:'800', fontSize:'11px', cursor:'pointer'}}>UPGRADE $4.99</button>}
      </div>

      {showUpgrade && (
        <div style={{margin:'0 16px 16px', background:'white', color:'black', borderRadius:'16px', padding:'16px'}}>
          <div style={{fontWeight:'800'}}>Get real US number</div>
          <div style={{fontSize:'13px', opacity:0.6, marginTop:'4px'}}>• Receive real calls & SMS • Use for verification • Keep forever</div>
          <div style={{fontSize:'22px', fontWeight:'900', marginTop:'12px'}}>$4.99 / month</div>
          <button onClick={upgradeToReal} style={{width:'100%', marginTop:'12px', background:'black', color:'white', border:'none', borderRadius:'12px', padding:'12px', fontWeight:'700', cursor:'pointer'}}>Pay & Get Real Number</button>
          <div onClick={()=>setShowUpgrade(false)} style={{textAlign:'center', fontSize:'12px', opacity:0.5, marginTop:'8px', cursor:'pointer'}}>Later</div>
        </div>
      )}

      <div style={{padding:'0 16px', fontSize:'11px', opacity:0.4, letterSpacing:'1px', fontWeight:'700', marginTop:'8px'}}>CHATS</div>

      <div style={{flex:1, marginTop:'8px'}}>
        {chats.map(c=>(
          <div key={c.id} onClick={()=>setActiveChat(c)} style={{display:'flex', gap:'12px', padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.04)', cursor:'pointer'}}>
            <div style={{width:'44px', height:'44px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{c.avatar}</div>
            <div style={{flex:1}}><div style={{fontWeight:'600', fontSize:'14px'}}>{c.name}</div><div style={{fontSize:'11px', opacity:0.5}}>{c.zamiqNumber}</div><div style={{fontSize:'12px', opacity:0.6, marginTop:'2px'}}>{c.last}</div></div>
            <span style={{fontSize:'11px', opacity:0.3}}>{c.time}</span>
          </div>
        ))}
      </div>

      <div style={{padding:'12px', textAlign:'center', fontSize:'10px', opacity:0.25}}>ZAMIQ • Gmail → +1 assigned • Free virtual → Paid real US • Model: Zangi</div>
    </div>
  )
         }
