'use client'
import React from 'react'

function GhostBlock() {
  const [ghost, setGhost] = React.useState(false)
  return (
    <div style={{background:'#112240', padding:'12px', borderRadius:'12px', marginBottom:'16px'}}>
        <p style={{margin:0, opacity:0.6, fontSize:'12px'}}>Your ZAMIQ Number</p>
        <p style={{margin:'4px 0 0 0', color:'#D4AF37', fontWeight:'bold'}}>+1 (800) 736-8298</p>
        <div onClick={()=>setGhost(!ghost)} style={{marginTop:'8px', background: ghost ? '#ff4d4d' : 'white', color: ghost ? 'white' : 'black', display:'inline-block', padding:'4px 10px', borderRadius:'6px', fontSize:'12px', cursor:'pointer', fontWeight:'bold'}}>
          {ghost ? '👻 ON - You be Ghost' : '👻 OFF - Tap to hide'}
        </div>
    </div>
  )
}

const CHATS = [
  {id:1, name:'Lola', last:'You: Soft! I felt am', time:'11:42 AM', unread:2, type:'All'},
  {id:2, name:'Emeka Business ⚓', last:'⚓ VOW: I go pay 20k tomorrow', time:'10:15 AM', unread:0, type:'Business'},
  {id:3, name:'Yaba Drop 📍', last:'Someone dropped gist near you', time:'9:03 AM', unread:0, type:'LUMEN'},
  {id:4, name:'Mum', last:'You don chop?', time:'8:30 AM', unread:1, type:'All'},
  {id:5, name:'Lagos Runs', last:'Package don land', time:'Yesterday', unread:0, type:'Business'},
]

export default function Home() {
  const [filter, setFilter] = React.useState('All')
  const [search, setSearch] = React.useState('')
  const [activeChat, setActiveChat] = React.useState<any>(null)
  const [msg, setMsg] = React.useState('')
  const [messages, setMessages] = React.useState<any[]>([])

  const filtered = CHATS.filter(c => {
    const matchFilter = filter==='All' ? true : filter==='Unread' ? c.unread>0 : c.type===filter
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const send = () => {
    if (!msg) return
    setMessages([...messages, {from:'me', text:msg, chat:activeChat.name}])
    setMsg('')
    setTimeout(()=> setMessages(m=>[...m, {from:'them', text:'Soft! I felt am 💛', chat:activeChat.name}]), 1000)
  }

  if (activeChat) {
    return (
      <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'16px', background:'#112240', display:'flex', alignItems:'center', gap:'12px'}}>
          <span onClick={()=>setActiveChat(null)} style={{cursor:'pointer'}}>←</span>
          <p style={{margin:0, fontWeight:'bold'}}>{activeChat.name}</p>
          <span style={{marginLeft:'auto', fontSize:'12px', opacity:0.6}}>👻 {activeChat.name.includes('Business') ? 'ANCHOR' : 'Ghost'}</span>
        </div>
        <div style={{flex:1, padding:'16px'}}>
          <p style={{opacity:0.5, textAlign:'center', fontSize:'12px'}}>⚓ This chat is sealed • {new Date().toLocaleTimeString()}</p>
          {messages.filter(m=>m.chat===activeChat.name).map((m,i)=>(
            <div key={i} style={{marginTop:'12px', textAlign: m.from==='me' ? 'right' : 'left'}}>
              <span style={{background: m.from==='me' ? '#D4AF37' : '#112240', color: m.from==='me' ? '#0A1931' : 'white', padding:'8px 12px', borderRadius:'12px', display:'inline-block', maxWidth:'80%'}}>{m.text}</span>
            </div>
          ))}
        </div>
        <div style={{padding:'12px', display:'flex', gap:'8px', background:'#112240'}}>
          <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type..." style={{flex:1, padding:'10px', borderRadius:'20px', border:'none', background:'#0A1931', color:'white'}} />
          <div onClick={send} style={{background:'#D4AF37', color:'#0A1931', width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontWeight:'bold'}}>➤</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:'16px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
        <h1 style={{color:'#D4AF37', fontSize:'32px', fontWeight:'900', margin:0}}>ZAMIQ</h1>
        <div style={{display:'flex', gap:'8px'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" style={{padding:'6px 10px', borderRadius:'20px', border:'none', background:'#112240', color:'white', width:'90px'}} />
          <span>⋮</span>
        </div>
      </div>

      <GhostBlock />

      <div style={{display:'flex', gap:'8px', marginBottom:'16px', overflowX:'auto'}}>
        {['All','Unread','Business','LUMEN'].map(f=>(
          <span key={f} onClick={()=>setFilter(f)} style={{background: filter===f ? '#D4AF37' : '#112240', color: filter===f ? '#0A1931' : 'white', padding:'6px 12px', borderRadius:'20px', fontSize:'13px', fontWeight: filter===f ? 'bold' : 'normal', cursor:'pointer', whiteSpace:'nowrap'}}>{f}</span>
        ))}
      </div>

      {filtered.map(c=>(
        <div key={c.id} onClick={()=>setActiveChat(c)} style={{background:'#112240', padding:'14px', borderRadius:'12px', marginBottom:'10px', display:'flex', justifyContent:'space-between', cursor:'pointer', borderLeft: c.name.includes('Business') ? '3px solid #D4AF37' : c.name.includes('Drop') ? '3px solid #ff4d4d' : 'none'}}>
          <div>
            <p style={{margin:0, fontWeight:'bold'}}>{c.name}</p>
            <p style={{margin:'4px 0 0 0', opacity:0.7, fontSize:'14px'}}>{c.last}</p>
          </div>
          <div style={{textAlign:'right'}}>
            <p style={{margin:0, fontSize:'12px', opacity:0.6}}>{c.time}</p>
            {c.unread>0 && <p style={{margin:'4px 0 0 0', background:'#D4AF37', color:'#0A1931', borderRadius:'50%', width:'20px', height:'20px', textAlign:'center', fontSize:'12px', lineHeight:'20px', float:'right'}}>{c.unread}</p>}
          </div>
        </div>
      ))}

      <div style={{marginTop:'20px', textAlign:'center', display:'flex', gap:'10px', justifyContent:'center'}}>
        <a href="/lumen" style={{color:'#D4AF37', fontSize:'13px', textDecoration:'none', background:'#112240', padding:'8px 14px', borderRadius:'20px'}}>LUMEN</a>
        <a href="/anchor" style={{color:'#D4AF37', fontSize:'13px', textDecoration:'none', background:'#112240', padding:'8px 14px', borderRadius:'20px'}}>⚓ ANCHOR</a>
        <a href="/aura" style={{color:'#D4AF37', fontSize:'13px', textDecoration:'none', background:'#112240', padding:'8px 14px', borderRadius:'20px'}}>AURA</a>
        <a href="/drop" style={{color:'#D4AF37', fontSize:'13px', textDecoration:'none', background:'#112240', padding:'8px 14px', borderRadius:'20px'}}>DROP</a>
      </div>
    </div>
  )
}
