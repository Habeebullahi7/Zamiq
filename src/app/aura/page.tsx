'use client'
import React from 'react'

export default function Aura() {
  const [isRecording, setIsRecording] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)
  const [records, setRecords] = React.useState<any[]>([])
  const mediaRef = React.useRef<any>(null)
  const chunksRef = React.useRef<any[]>([])
  const timerRef = React.useRef<any>(null)

  React.useEffect(()=>{
    if (isRecording) {
      timerRef.current = setInterval(()=> setSeconds(s=>s+1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return ()=> clearInterval(timerRef.current)
  }, [isRecording])

  const format = (s:number) => {
    const m = Math.floor(s/60)
    const sec = s%60
    return `${m}:${sec.toString().padStart(2,'0')}`
  }

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true})
      const mr = new MediaRecorder(stream)
      mediaRef.current = mr
      chunksRef.current = []
      mr.ondataavailable = (e:any)=> chunksRef.current.push(e.data)
      mr.onstop = ()=> {
        const blob = new Blob(chunksRef.current, {type:'audio/webm'})
        const url = URL.createObjectURL(blob)
        setRecords(r=>[{id:Date.now(), url, duration:seconds, time:new Date().toLocaleTimeString()}, ...r])
        stream.getTracks().forEach(t=>t.stop())
      }
      mr.start()
      setSeconds(0)
      setIsRecording(true)
    } catch(e) {
      // Mock if no mic permission
      setSeconds(0)
      setIsRecording(true)
    }
  }

  const stop = () => {
    if (mediaRef.current && mediaRef.current.state==='recording') {
      mediaRef.current.stop()
    } else if (isRecording) {
      // mock stop
      setRecords(r=>[{id:Date.now(), url:'', duration:seconds, time:new Date().toLocaleTimeString()}, ...r])
    }
    setIsRecording(false)
  }

  return (
    <div style={{background:'#FFFFFF', minHeight:'100vh', fontFamily:'-apple-system, sans-serif'}}>
      {/* Header */}
      <div style={{background:'white', padding:'12px 16px', display:'flex', alignItems:'center', gap:'12px', borderBottom:'1px solid #E5E5EA', position:'sticky', top:0}}>
        <a href="/" style={{color:'#007AFF', textDecoration:'none', fontSize:'17px'}}>‹ Chats</a>
        <h2 style={{margin:'0 auto', fontSize:'17px', fontWeight:'600', color:'#111B21'}}>Aura</h2>
        <span style={{width:'60px'}}></span>
      </div>

      <div style={{padding:'32px 16px', display:'flex', flexDirection:'column', alignItems:'center'}}>
        {/* Timer */}
        <div style={{marginTop:'40px', textAlign:'center'}}>
          <p style={{margin:0, fontSize:'14px', color:'#667781', letterSpacing:'0.5px'}}>{isRecording ? 'RECORDING' : 'TAP TO RECORD'}</p>
          <p style={{margin:'8px 0 0', fontSize:'48px', fontWeight:'200', color: isRecording ? '#FF3B30' : '#111B21', fontVariantNumeric:'tabular-nums'}}>{format(seconds)}</p>
          <p style={{margin:'8px 0 0', fontSize:'13px', color:'#8E8E93'}}>{isRecording ? 'No limit • Keep talking' : 'No limit • Record as long as you want'}</p>
        </div>

        {/* Big Mic Button */}
        <div style={{marginTop:'40px', position:'relative'}}>
          {isRecording && <div style={{position:'absolute', top:'-10px', left:'-10px', right:'-10px', bottom:'-10px', borderRadius:'50%', background:'rgba(255,59,48,0.15)', animation:'pulse 1.5s infinite'}}></div>}
          <div 
            onClick={isRecording ? stop : start}
            style={{
              width:'120px', height:'120px', borderRadius:'50%',
              background: isRecording ? '#FF3B30' : '#111B21',
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer',
              boxShadow: isRecording ? '0 12px 24px rgba(255,59,48,0.3)' : '0 12px 24px rgba(0,0,0,0.15)',
              transition:'all 0.2s',
              position:'relative', zIndex:1
            }}
          >
            <span style={{fontSize:'48px'}}>{isRecording ? '⏹️' : '🎙️'}</span>
          </div>
          <p style={{margin:'16px 0 0', textAlign:'center', fontSize:'15px', fontWeight:'600', color: isRecording ? '#FF3B30' : '#111B21'}}>{isRecording ? 'Tap to Stop' : 'Tap to Start'}</p>
        </div>

        {/* Records List */}
        {records.length>0 && (
          <div style={{marginTop:'48px', width:'100%', maxWidth:'400px'}}>
            <p style={{margin:'0 0 12px', fontSize:'13px', fontWeight:'600', color:'#667781', letterSpacing:'0.5px'}}>RECORDINGS • {records.length}</p>
            {records.map(r=>(
              <div key={r.id} style={{background:'#F0F2F5', borderRadius:'12px', padding:'12px 14px', marginBottom:'8px', display:'flex', alignItems:'center', gap:'12px'}}>
                <div style={{width:'36px', height:'36px', borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}>▶</div>
                <div style={{flex:1}}>
                  <div style={{height:'24px', display:'flex', alignItems:'center', gap:'2px'}}>
                    {[...Array(20)].map((_,i)=><div key={i} style={{width:'3px', height:`${8+Math.random()*16}px`, background:'#25D366', borderRadius:'2px', opacity:0.6}}></div>)}
                  </div>
                  <p style={{margin:'4px 0 0', fontSize:'12px', color:'#667781'}}>{r.time} • {format(r.duration)}</p>
                </div>
                <span style={{fontSize:'12px', fontWeight:'600', color:'#111B21'}}>{format(r.duration)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes pulse {0%{transform:scale(1); opacity:1} 50%{transform:scale(1.15); opacity:0.5} 100%{transform:scale(1); opacity:1}}`}</style>
    </div>
  )
                                         }
