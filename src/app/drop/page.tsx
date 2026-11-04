'use client'
import React from 'react'

export default function Drop() {
  const [gist, setGist] = React.useState('')
  const [drops, setDrops] = React.useState([
    {id:1, text:'Jollof rice full for that buka for Yaba, 1k only', dist:'120m away', time:'2h ago', likes:12},
    {id:2, text:'NEPA don take light for Sabo, use gen', dist:'340m away', time:'4h ago', likes:5},
    {id:3, text:'Free WiFi for Coffee Shop Yaba, password: yaba123', dist:'800m away', time:'5h ago', likes:23},
  ])

  const addDrop = () => {
    if (!gist) return
    setDrops([{id:Date.now(), text:gist, dist:'Just now • 10m away', time:'now', likes:0}, ...drops])
    setGist('')
  }

  return (
    <div style={{background:'#FFFFFF', minHeight:'100vh', fontFamily:'-apple-system, sans-serif'}}>
      {/* Header - WhatsApp */}
      <div style={{background:'white', padding:'12px 16px', display:'flex', alignItems:'center', gap:'12px', borderBottom:'1px solid #E5E5EA', position:'sticky', top:0, zIndex:10}}>
        <a href="/" style={{color:'#007AFF', textDecoration:'none', fontSize:'17px'}}>‹ Chats</a>
        <h2 style={{margin:'0 auto', fontSize:'17px', fontWeight:'600', color:'#111B21'}}>Drop • Near You</h2>
        <span style={{width:'60px'}}></span>
      </div>

      {/* Map - Light */}
      <div style={{background:'#F0F2F5', margin:'12px', borderRadius:'16px', height:'180px', position:'relative', overflow:'hidden', border:'1px solid #E5E5EA'}}>
        <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 30% 40%, #E7FCE3 0%, #F0F2F5 50%, #FFFFFF 100%)'}}></div>
        <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center'}}>
          <div style={{width:'40px', height:'40px', background:'#111B21', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto', color:'white', fontSize:'20px', boxShadow:'0 4px 12px rgba(0,0,0,0.15)'}}>📍</div>
          <p style={{margin:'8px 0 0', fontSize:'13px', fontWeight:'600', color:'#111B21'}}>Yaba, Lagos</p>
          <p style={{margin:'2px 0 0', fontSize:'11px', color:'#667781'}}>{drops.length} drops near you</p>
        </div>
        {/* Pins */}
        <div style={{position:'absolute', top:'30%', left:'25%', width:'10px', height:'10px', background:'#25D366', borderRadius:'50%', border:'2px solid white', boxShadow:'0 2px 4px rgba(0,0,0,0.2)'}}></div>
        <div style={{position:'absolute', top:'60%', left:'70%', width:'10px', height:'10px', background:'#FF3B30', borderRadius:'50%', border:'2px solid white'}}></div>
        <div style={{position:'absolute', top:'45%', left:'60%', width:'10px', height:'10px', background:'#007AFF', borderRadius:'50%', border:'2px solid white'}}></div>
      </div>

      {/* Input - WhatsApp style */}
      <div style={{padding:'0 12px', display:'flex', gap:'8px'}}>
        <div style={{flex:1, background:'#F0F2F5', borderRadius:'20px', padding:'10px 14px', display:'flex', alignItems:'center'}}>
          <input value={gist} onChange={e=>setGist(e.target.value)} placeholder="Drop gist for people near you..." style={{background:'transparent', border:'none', outline:'none', flex:1, fontSize:'15px', color:'#111B21'}} />
        </div>
        <div onClick={addDrop} style={{background:'#111B21', color:'white', width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'18px'}}>➤</div>
      </div>
      <p style={{margin:'6px 16px 0', fontSize:'11px', color:'#8E8E93'}}>Anonymous • 24h • Visible to people within 1km</p>

      {/* Drops - WhatsApp chat style */}
      <div style={{marginTop:'16px'}}>
        <p style={{margin:'0 16px 8px', fontSize:'12px', fontWeight:'600', color:'#667781', letterSpacing:'0.5px'}}>NEAR YOU • {drops.length}</p>
        {drops.map(d=>(
          <div key={d.id} style={{padding:'12px 16px', borderBottom:'1px solid #F5F6F6', display:'flex', gap:'12px'}}>
            <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'#E9EDEF', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'14px'}}>📍</div>
            <div style={{flex:1}}>
              <div style={{display:'flex', gap:'6px', alignItems:'center'}}>
                <p style={{margin:0, fontSize:'13px', fontWeight:'600', color:'#111B21'}}>Anonymous</p>
                <span style={{width:'2px', height:'2px', background:'#8E8E93', borderRadius:'50%'}}></span>
                <p style={{margin:0, fontSize:'12px', color:'#667781'}}>{d.dist} • {d.time}</p>
              </div>
              <div style={{marginTop:'4px', background:'#F0F2F5', borderRadius:'12px 12px 12px 0', padding:'10px 12px', display:'inline-block', maxWidth:'85%'}}>
                <p style={{margin:0, fontSize:'14px', color:'#111B21', lineHeight:'1.4'}}>"{d.text}"</p>
              </div>
              <div style={{marginTop:'6px', display:'flex', gap:'12px'}}>
                <span style={{fontSize:'12px', color:'#667781'}}>❤️ {d.likes}</span>
                <span style={{fontSize:'12px', color:'#007AFF'}}>Reply</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{height:'20px'}}></div>
    </div>
  )
      }
