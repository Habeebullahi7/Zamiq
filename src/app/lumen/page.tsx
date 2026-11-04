'use client'
import React from 'react'

export default function Lumen() {
  const [recording, setRecording] = React.useState(false)
  const [facing, setFacing] = React.useState<'environment'|'user'>('environment')
  const [videos, setVideos] = React.useState<any[]>([
    {id:1, user:'You • POV', time:'Now', feeling:'Soft', cam:'back'},
  ])
  const [feel, setFeel] = React.useState('Soft')
  const videoRef = React.useRef<any>(null)
  const [stream, setStream] = React.useState<any>(null)

  const startCam = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({video:{facingMode:facing}, audio:true})
      setStream(s)
      if (videoRef.current) videoRef.current.srcObject = s
      setRecording(true)
      setTimeout(()=>{
        stopCam()
        setVideos(v=>[{id:Date.now(), user:`You • ${facing==='user' ? 'Front' : 'POV'}`, time:'Just now', feeling:feel, cam:facing}, ...v])
      }, 5000)
    } catch(e) {
      setRecording(true)
      setTimeout(()=>{
        setRecording(false)
        setVideos(v=>[{id:Date.now(), user:`You • ${facing==='user' ? 'Front' : 'POV'}`, time:'Just now', feeling:feel, cam:facing}, ...v])
      }, 2000)
    }
  }

  const stopCam = () => {
    if (stream) stream.getTracks().forEach((t:any)=>t.stop())
    setRecording(false)
    setStream(null)
  }

  const switchCam = () => {
    const newFacing = facing==='environment' ? 'user' : 'environment'
    setFacing(newFacing)
    if (stream) {
      stream.getTracks().forEach((t:any)=>t.stop())
      setStream(null)
      setTimeout(async ()=>{
        try {
          const s = await navigator.mediaDevices.getUserMedia({video:{facingMode:newFacing}, audio:true})
          setStream(s)
          if (videoRef.current) videoRef.current.srcObject = s
        } catch {}
      }, 100)
    }
  }

  React.useEffect(()=>{
    if (recording) startCam()
    // eslint-disable-next-line
  }, [facing])

  return (
    <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:'16px'}}>
      <h2 style={{color:'#D4AF37', margin:'0 0 20px 0'}}>🌟 LUMEN - POV Stories</h2>
      
      {recording && (
        <div style={{background:'black', height:'320px', borderRadius:'16px', overflow:'hidden', position:'relative', marginBottom:'16px'}}>
          <video ref={videoRef} autoPlay muted playsInline style={{width:'100%', height:'100%', objectFit:'cover', transform: facing==='user' ? 'scaleX(-1)' : 'none'}}></video>
          <div style={{position:'absolute', top:'12px', left:'12px', background:'#ff4d4d', padding:'4px 8px', borderRadius:'6px', fontSize:'12px', fontWeight:'bold'}}>● REC {facing==='user' ? 'Front' : 'Back'} cam</div>
          <div onClick={switchCam} style={{position:'absolute', top:'12px', right:'12px', background:'#112240', padding:'6px 10px', borderRadius:'20px', fontSize:'12px', cursor:'pointer'}}>🔄 Switch to {facing==='user' ? 'Back' : 'Front'}</div>
          <div style={{position:'absolute', bottom:'12px', left:'0', right:'0', display:'flex', justifyContent:'center', gap:'20px', alignItems:'center'}}>
            <div onClick={switchCam} style={{background:'#112240', width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>🔄</div>
            <div onClick={stopCam} style={{background:'#ff4d4d', width:'60px', height:'60px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'3px solid white'}}>⏹️</div>
            <div style={{width:'40px'}}></div>
          </div>
        </div>
      )}

      {!recording && (
        <>
          <div style={{display:'flex', gap:'8px', marginBottom:'12px'}}>
            <span onClick={()=>setFacing('environment')} style={{background: facing==='environment' ? '#D4AF37' : '#112240', color: facing==='environment' ? '#0A1931' : 'white', padding:'8px 14px', borderRadius:'20px', fontSize:'13px', cursor:'pointer', fontWeight:'bold'}}>📹 Back (POV)</span>
            <span onClick={()=>setFacing('user')} style={{background: facing==='user' ? '#D4AF37' : '#112240', color: facing==='user' ? '#0A1931' : 'white', padding:'8px 14px', borderRadius:'20px', fontSize:'13px', cursor:'pointer', fontWeight:'bold'}}>🤳 Front (Selfie)</span>
          </div>
          <div onClick={startCam} style={{background:'#112240', height:'120px', borderRadius:'16px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'2px dashed #D4AF37', marginBottom:'16px'}}>
            <div style={{fontSize:'32px'}}>{facing==='user' ? '🤳' : '📹'}</div>
            <p style={{margin:'8px 0 0 0', color:'#D4AF37', fontWeight:'bold'}}>Tap to Record {facing==='user' ? 'Front' : 'POV'} (5 sec)</p>
            <p style={{margin:'4px 0 0 0', fontSize:'11px', opacity:0.5}}>{facing==='user' ? 'Front camera - show your face' : 'Back camera - show wetin dey front'}</p>
          </div>
        </>
      )}

      <div style={{display:'flex', gap:'8px', marginBottom:'16px'}}>
        {['Soft','Focus','Raw','Calm'].map(m=>(
          <span key={m} onClick={()=>setFeel(m)} style={{background: feel===m ? '#D4AF37' : '#112240', color: feel===m ? '#0A1931' : 'white', padding:'6px 12px', borderRadius:'20px', fontSize:'13px', cursor:'pointer', fontWeight: feel===m ? 'bold' : 'normal'}}>{m}</span>
        ))}
      </div>
      
      {videos.map(v=>(
        <div key={v.id} style={{background:'#112240', padding:'12px', borderRadius:'12px', marginBottom:'10px'}}>
          <div style={{background:'black', height:'140px', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}>{v.cam==='user' ? '🤳' : '📹'} {v.cam==='user' ? 'Front' : 'POV'} • {v.feeling}</div>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:'8px'}}>
            <p style={{margin:0, fontSize:'13px', fontWeight:'bold'}}>{v.user}</p>
            <p style={{margin:0, fontSize:'12px', opacity:0.6}}>{v.time}</p>
          </div>
        </div>
      ))}

      <div style={{marginTop:'20px'}}>
        <a href="/" style={{color:'white', opacity:0.6, textDecoration:'none'}}>← Chats</a>
      </div>
    </div>
  )
          }
