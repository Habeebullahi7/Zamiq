'use client'
import { useState } from 'react'

export default function Aura() {
  const [recording, setRecording] = useState(false)
  const [text, setText] = useState("I dey open, but soft soft... no stress today")
  const [mood, setMood] = useState("Soft")

  const startRecord = () => {
    setRecording(true)
    // For now mock transcribe - later we go use Whisper
    setTimeout(() => {
      setRecording(false)
      const samples = [
        "I dey calm today, no disturb me",
        "Focus mode, I dey work for Yaba",
        "I dey open to gist, but soft",
        "Busy die, message tomorrow"
      ]
      const newText = samples[Math.floor(Math.random()*samples.length)]
      setText(newText)
      if (newText.includes("calm") || newText.includes("soft")) setMood("Soft")
      else if (newText.includes("Focus") || newText.includes("work")) setMood("Focus")
      else if (newText.includes("Busy")) setMood("Busy")
      else setMood("Open")
    }, 2000)
  }

  return (
    <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:'16px'}}>
      <h2 style={{color:'#D4AF37', margin:'0 0 20px 0'}}>🎙️ AURA - Voice Mood</h2>
      
      <div style={{background:'#112240', padding:'20px', borderRadius:'16px', textAlign:'center'}}>
        <div onClick={startRecord} style={{width:'80px', height:'80px', background: recording ? '#ff4d4d' : '#D4AF37', borderRadius:'50%', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', cursor:'pointer', animation: recording ? 'pulse 1s infinite' : 'none'}}>
          {recording ? '⏹️' : '🎤'}
        </div>
        <p style={{margin:'12px 0 0 0', fontWeight:'bold'}}>Your Aura is: {mood}</p>
        <p style={{margin:'4px 0 0 0', opacity:0.6, fontSize:'13px'}}>{recording ? 'Listening... talk now' : 'Expires in 18h 42m'}</p>
        
        <div style={{marginTop:'16px', background:'#0A1931', padding:'12px', borderRadius:'20px', display:'flex', alignItems:'center', gap:'12px'}}>
          <span>▶️</span>
          <div style={{flex:1, height:'4px', background:'#D4AF37', borderRadius:'2px'}}></div>
          <span style={{fontSize:'12px'}}>0:08</span>
        </div>
        
        <p style={{marginTop:'12px', fontStyle:'italic', opacity:0.8}}>"{text}"</p>
        <p style={{marginTop:'8px', fontSize:'11px', opacity:0.5}}>Transcribed auto • Mood detected: {mood}</p>
      </div>

      <div style={{marginTop:'20px', display:'flex', gap:'8px'}}>
        {['Soft','Focus','Busy','Open'].map(m => (
          <span key={m} onClick={()=>setMood(m)} style={{background: mood===m ? '#D4AF37' : '#112240', color: mood===m ? '#0A1931' : 'white', padding:'8px 14px', borderRadius:'20px', fontSize:'13px', fontWeight: mood===m ? 'bold' : 'normal', cursor:'pointer'}}>{m}</span>
        ))}
      </div>

      <div onClick={startRecord} style={{marginTop:'20px', background:'#D4AF37', color:'#0A1931', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold', cursor:'pointer'}}>
        {recording ? '⏹️ Stop & Transcribe' : '🎙️ Record New Aura'}
      </div>

      <div style={{marginTop:'20px'}}>
        <a href="/" style={{color:'white', opacity:0.6, textDecoration:'none'}}>← Chats</a>
      </div>
    </div>
  )
}
