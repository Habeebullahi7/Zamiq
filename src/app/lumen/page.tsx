'use client'
import { useState } from 'react'

export default function Lumen() {
  const [felt, setFelt] = useState(false)
  return (
    <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif'}}>
      <div style={{padding:'16px', display:'flex', justifyContent:'space-between'}}>
        <h2 style={{margin:0, color:'#D4AF37'}}>LUMEN</h2>
        <span style={{opacity:0.6, fontSize:'12px'}}>POV only • 15s • No Face</span>
      </div>

      <div style={{position:'relative', background:'#000', height:'70vh', margin:'0 16px', borderRadius:'20px', overflow:'hidden'}}>
        <div style={{width:'100%', height:'100%', background:'#112240', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <p style={{opacity:0.5}}>POV video here</p>
        </div>
        <div style={{position:'absolute', bottom:'20px', left:'16px'}}>
          <p style={{margin:0, background:'#D4AF37', color:'#0A1931', display:'inline-block', padding:'4px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold'}}>Calm • Yaba • 2h ago</p>
          <p style={{margin:'8px 0 0 0'}}>Morning still soft. No rush.</p>
        </div>
        <div onClick={()=>setFelt(!felt)} style={{position:'absolute', right:'16px', bottom:'80px', background: felt ? '#D4AF37' : 'rgba(255,255,255,0.2)', width:'50px', height:'50px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <span>{felt ? '💛' : '🤍'}</span>
        </div>
      </div>

      <div style={{padding:'16px'}}>
        <a href="/" style={{color:'white', textDecoration:'none', opacity:0.6}}>← Chats</a>
      </div>
    </div>
  )
}
