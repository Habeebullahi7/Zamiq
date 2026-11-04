'use client'
import React from 'react'

const VIDEOS = [
  {id:1, user:'@yaba_girl', name:'Lola', feeling:'Soft', text:'Morning for Yaba market 🌅 soft vibes only', likes:'12.4K', comments:'342', isPOV:true},
  {id:2, user:'@emeka_runs', name:'Emeka', feeling:'Focus', text:'5am delivery run ⚓ locked in', likes:'8.1K', comments:'120', isPOV:false},
  {id:3, user:'@mum_lagos', name:'Mum', feeling:'Calm', text:'Jollof ready for lunch 😊', likes:'23K', comments:'892', isPOV:false},
]

export default function Lumen() {
  const [active, setActive] = React.useState(0)
  const [liked, setLiked] = React.useState<any>({})
  const videoRef = React.useRef<any>(null)
  const [isRecording, setIsRecording] = React.useState(false)

  const v = VIDEOS[active]

  const next = () => setActive(a=> (a+1)%VIDEOS.length)
  const prev = () => setActive(a=> a===0 ? VIDEOS.length-1 : a-1)

  return (
    <div style={{background:'black', height:'100vh', width:'100vw', position:'relative', overflow:'hidden', fontFamily:'-apple-system, sans-serif', color:'white'}}>
      
      {/* VIDEO BACKGROUND - TikTok */}
      <div style={{
        position:'absolute', inset:0,
        background: v.isPOV ? 'linear-gradient(180deg, #1a1a1a 0%, #000 100%)' : '#111',
        display:'flex', alignItems:'center', justifyContent:'center'
      }}>
        {/* Mock video */}
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'80px', opacity:0.8}}>{v.isPOV ? '📹' : '🤳'}</div>
          <p style={{marginTop:'12px', fontSize:'14px', opacity:0.5, letterSpacing:'2px'}}>{v.isPOV ? 'POV • BACK CAMERA' : 'FRONT CAMERA'} • {v.feeling}</p>
        </div>
        {/* Gradient overlays */}
        <div style={{position:'absolute', top:0, left:0, right:0, height:'120px', background:'linear-gradient(180deg, rgba(0,0,0,0.5), transparent)'}}></div>
        <div style={{position:'absolute', bottom:0, left:0, right:0, height:'300px', background:'linear-gradient(0deg, rgba(0,0,0,0.7), transparent)'}}></div>
      </div>

      {/* TOP BAR - TikTok */}
      <div style={{position:'absolute', top:0, left:0, right:0, padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:10}}>
        <a href="/" style={{color:'white', textDecoration:'none', fontSize:'16px', fontWeight:'600'}}>‹</a>
        <div style={{display:'flex', gap:'20px', fontSize:'15px', fontWeight:'600'}}>
          <span style={{opacity:0.6}}>Following</span>
          <span style={{borderBottom:'2px solid white', paddingBottom:'4px'}}>For You • LUMEN</span>
        </div>
        <span style={{fontSize:'20px'}}>🔍</span>
      </div>

      {/* RIGHT ACTIONS - TikTok */}
      <div style={{position:'absolute', right:'12px', bottom:'120px', display:'flex', flexDirection:'column', gap:'22px', alignItems:'center', zIndex:10}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#222', border:'2px solid white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{v.name[0]}</div>
          <div style={{width:'20px', height:'20px', background:'#FF2D55', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'-10px', fontSize:'12px', fontWeight:'800'}}>+</div>
        </div>

        <div onClick={()=>setLiked(l=>({...l, [v.id]:!l[v.id]}))} style={{display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer'}}>
          <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px'}}>{liked[v.id] ? '❤️' : '🤍'}</div>
          <span style={{marginTop:'4px', fontSize:'12px', fontWeight:'600'}}>{v.likes}</span>
        </div>

        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px'}}>💬</div>
          <span style={{marginTop:'4px', fontSize:'12px', fontWeight:'600'}}>{v.comments}</span>
        </div>

        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px'}}>↗️</div>
          <span style={{marginTop:'4px', fontSize:'12px', fontWeight:'600'}}>Share</span>
        </div>

        <div style={{width:'48px', height:'48px', borderRadius:'12px', background:'#333', display:'flex', alignItems:'center', justifyContent:'center'}}>🎵</div>
      </div>

      {/* BOTTOM INFO - TikTok */}
      <div style={{position:'absolute', bottom:'20px', left:'12px', right:'80px', zIndex:10}}>
        <p style={{margin:0, fontWeight:'700', fontSize:'15px'}}>{v.user}</p>
        <p style={{margin:'6px 0 0', fontSize:'14px', lineHeight:'1.3', opacity:0.9}}>{v.text}</p>
        <div style={{marginTop:'8px', display:'flex', gap:'6px'}}>
          <span style={{background:'rgba(255,255,255,0.15)', padding:'4px 8px', borderRadius:'4px', fontSize:'12px', fontWeight:'600'}}>#{v.feeling}</span>
          <span style={{background:'rgba(255,255,255,0.15)', padding:'4px 8px', borderRadius:'4px', fontSize:'12px'}}>{v.isPOV ? '#POV' : '#Selfie'}</span>
        </div>
        <div style={{marginTop:'10px', display:'flex', alignItems:'center', gap:'8px'}}>
          <span style={{fontSize:'12px'}}>🎵 Original sound • {v.name}</span>
        </div>
      </div>

      {/* Swipe Areas - TikTok gesture */}
      <div onClick={prev} style={{position:'absolute', top:'80px', left:0, right:'70px', height:'40%', zIndex:5}}></div>
      <div onClick={next} style={{position:'absolute', bottom:'100px', left:0, right:'70px', height:'40%', zIndex:5}}></div>

      {/* Progress Bar */}
      <div style={{position:'absolute', bottom:0, left:0, right:0, height:'2px', background:'rgba(255,255,255,0.2)', zIndex:20}}>
        <div style={{width:'42%', height:'100%', background:'white'}}></div>
      </div>

      {/* Record Button - Center Bottom */}
      <div onClick={()=>setIsRecording(!isRecording)} style={{position:'absolute', bottom:'18px', left:'50%', transform:'translateX(-50%)', width:'60px', height:'60px', borderRadius:'50%', background: isRecording ? '#FF2D55' : 'white', border:'4px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', zIndex:20}}>
        <span style={{fontSize:'24px'}}>{isRecording ? '⏹️' : '📹'}</span>
      </div>

      {/* Tap hint */}
      <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'rgba(0,0,0,0.6)', padding:'8px 12px', borderRadius:'20px', fontSize:'11px', opacity:0.5, pointerEvents:'none', zIndex:1}}>Tap top/bottom to swipe • {active+1}/{VIDEOS.length}</div>
    </div>
  )
}
