'use client'
import { useState, useRef } from 'react'

export default function Lumen(){
  const [mode, setMode] = useState<'view'|'record'>('view')
  const [facing, setFacing] = useState<'user'|'environment'>('environment') // POV = back camera
  const [recording, setRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [videos, setVideos] = useState<any[]>([
    {id:1, url:'', feeling:'Soft', views:2341, likes:342, comments:3, name:'Lola', pov:true},
  ])
  const [active, setActive] = useState(0)
  const [feeling, setFeeling] = useState('Soft')
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRef = useRef<MediaRecorder|null>(null)
  const streamRef = useRef<MediaStream|null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<any>(null)

  const startCamera = async (face = facing) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video:{facingMode:face, width:{ideal:1080}, height:{ideal:1920}},
        audio:true
      })
      streamRef.current = stream
      if(videoRef.current){ videoRef.current.srcObject = stream; videoRef.current.play() }
    } catch(e){ alert('Camera need permission - allow camera for LUMEN') }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t=>t.stop())
  }

  const startRecord = async () => {
    if(!streamRef.current) await startCamera()
    chunksRef.current = []
    const mr = new MediaRecorder(streamRef.current!, {mimeType:'video/webm'})
    mediaRef.current = mr
    mr.ondataavailable = e=> { if(e.data.size>0) chunksRef.current.push(e.data) }
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, {type:'video/webm'})
      const url = URL.createObjectURL(blob)
      setVideos(v=>[{id:Date.now(), url, feeling, views:0, likes:0, comments:0, name:'You', pov: facing==='environment'}, ...v])
      setActive(0)
      setMode('view')
      stopCamera()
    }
    mr.start()
    setRecording(true)
    setSeconds(0)
    timerRef.current = setInterval(()=>setSeconds(s=>{ if(s>=5){ stopRecord(); return 5 } return s+1 }), 1000)
  }

  const stopRecord = () => {
    clearInterval(timerRef.current)
    if(mediaRef.current && mediaRef.current.state==='recording') mediaRef.current.stop()
    setRecording(false)
  }

  const switchCamera = async () => {
    const newFace = facing==='environment' ? 'user' : 'environment'
    setFacing(newFace)
    stopCamera()
    await startCamera(newFace)
  }

  const openRecord = async () => {
    setMode('record')
    setTimeout(()=>startCamera(), 100)
  }

  const s = videos[active]

  // VIEW MODE
  if(mode==='view'){
    return(
      <div style={{minHeight:'100vh', background:'#0A0A0B', color:'white', fontFamily:'system-ui', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'18px 20px', display:'flex', justifyContent:'space-between'}}>
          <a href="/" style={{color:'white', textDecoration:'none', opacity:0.6, fontSize:'14px'}}>← CHATS</a>
          <span style={{fontSize:'11px', letterSpacing:'2.5px', fontWeight:'800'}}>LUMEN • {videos.length}</span>
          <span onClick={openRecord} style={{background:'white', color:'black', padding:'6px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', cursor:'pointer'}}>＋ Record</span>
        </div>

        <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px'}}>
          <div style={{width:'220px', height:'380px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', overflow:'hidden', position:'relative'}}>
            {s?.url ? <video src={s.url} autoPlay loop muted playsInline style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'48px'}}>{s?.pov ? '◍ POV' : '◎ SELF'}</div>}
            <div style={{position:'absolute', bottom:0, left:0, right:0, padding:'12px', background:'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)'}}>
              <p style={{margin:0, fontWeight:'700', fontSize:'13px'}}>{s?.name} • {s?.feeling}</p>
              <p style={{margin:'4px 0 0', fontSize:'11px', opacity:0.7}}>👁️ {s?.views} • ❤️ {s?.likes} • 💬 {s?.comments}</p>
            </div>
          </div>

          <div style={{marginTop:'20px', display:'flex', gap:'8px'}}>
            {videos.map((_,i)=><div key={i} onClick={()=>setActive(i)} style={{width: active===i ? '24px' : '6px', height:'6px', background: active===i ? 'white' : 'rgba(255,255,255,0.2)', borderRadius:'3px', cursor:'pointer'}}></div>)}
          </div>

          <p style={{marginTop:'16px', fontSize:'13px', opacity:0.5, textAlign:'center'}}>Tap + Record to add your LUMEN<br/>5 sec • POV (back cam) or Selfie (front cam)</p>
        </div>

        <div style={{padding:'16px 20px'}}>
          <div onClick={openRecord} style={{background:'white', color:'black', padding:'16px', borderRadius:'14px', textAlign:'center', fontWeight:'700', cursor:'pointer'}}>📹 Record LUMEN • 5 sec POV</div>
        </div>
      </div>
    )
  }

  // RECORD MODE
  return(
    <div style={{height:'100vh', background:'black', position:'relative', overflow:'hidden', fontFamily:'system-ui'}}>
      <video ref={videoRef} autoPlay muted playsInline style={{width:'100%', height:'100%', objectFit:'cover', transform: facing==='user' ? 'scaleX(-1)' : 'none'}}></video>

      {/* Top */}
      <div style={{position:'absolute', top:0, left:0, right:0, padding:'16px', display:'flex', justifyContent:'space-between', zIndex:10, background:'linear-gradient(180deg, rgba(0,0,0,0.6), transparent)'}}>
        <span onClick={()=>{stopCamera(); setMode('view')}} style={{color:'white', fontSize:'14px', cursor:'pointer'}}>✕ Cancel</span>
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          {recording && <div style={{width:'8px', height:'8px', background:'red', borderRadius:'50%', animation:'blink 1s infinite'}}></div>}
          <span style={{color:'white', fontWeight:'700', fontSize:'14px'}}>{recording ? `0:0${seconds} / 0:05` : 'LUMEN'}</span>
        </div>
        <span onClick={switchCamera} style={{color:'white', fontSize:'20px', cursor:'pointer'}}>🔄</span>
      </div>

      {/* Feeling Selector */}
      <div style={{position:'absolute', top:'60px', left:0, right:0, display:'flex', justifyContent:'center', gap:'8px', zIndex:10}}>
        {['Soft','Focus','Calm','Raw'].map(f=>(
          <span key={f} onClick={()=>setFeeling(f)} style={{background: feeling===f ? 'white' : 'rgba(0,0,0,0.4)', color: feeling===f ? 'black' : 'white', padding:'6px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', cursor:'pointer', backdropFilter:'blur(10px)'}}>{f}</span>
        ))}
      </div>

      {/* Bottom */}
      <div style={{position:'absolute', bottom:0, left:0, right:0, padding:'20px', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px', zIndex:10, background:'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)'}}>
        <p style={{margin:0, color:'white', fontSize:'11px', letterSpacing:'1px', opacity:0.7}}>{facing==='environment' ? 'POV • BACK CAMERA • Show wetin you see' : 'SELFIE • FRONT CAMERA • Show you'}</p>
        
        <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
          <div onClick={switchCamera} style={{width:'48px', height:'48px', background:'rgba(255,255,255,0.15)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', cursor:'pointer', backdropFilter:'blur(10px)'}}>🔄</div>
          
          <div onClick={recording ? stopRecord : startRecord} style={{
            width:'80px', height:'80px', borderRadius:'50%',
            background: recording ? 'red' : 'white',
            border:'4px solid rgba(255,255,255,0.3)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', transition:'all 0.2s',
            boxShadow: recording ? '0 0 30px red' : '0 0 20px rgba(255,255,255,0.3)'
          }}>
            <div style={{width: recording ? '28px' : '60px', height: recording ? '28px' : '60px', background: recording ? 'white' : 'red', borderRadius: recording ? '4px' : '50%', transition:'all 0.2s'}}></div>
          </div>

          <div style={{width:'48px', height:'48px', background:'rgba(255,255,255,0.15)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:'700', color:'white', cursor:'pointer'}}>5s</div>
        </div>

        <p style={{margin:0, color:'white', fontSize:'11px', opacity:0.5}}>{recording ? 'Recording... tap to stop' : 'Tap red to record • 5 sec max'}</p>
      </div>

      <style>{`@keyframes blink{0%,100%{opacity:1} 50%{opacity:0}}`}</style>
    </div>
  )
                   }
