'use client'
import { useState, useRef } from 'react'

type Post = {
  id:number
  name:string
  handle:string
  text:string
  feeling:string
  likes:number
  views:number
  comments:number
  liked?:boolean
  time:string
  image?:string
  video?:string
  audio?:string
}

export default function Lumen(){
  const [posts, setPosts] = useState<Post[]>([
    {id:1, name:'Lola', handle:'yaba_girl', text:'Morning light for Yaba market. Soft today.', feeling:'Soft', likes:342, views:2341, comments:12, time:'2m'},
    {id:2, name:'Emeka', handle:'emeka_runs', text:'5am run done. Sabo to Yaba.', feeling:'Focus', likes:120, views:1820, comments:3, time:'12m', audio:''},
  ])
  const [newText, setNewText] = useState('')
  const [feeling, setFeeling] = useState('Soft')
  const [showComposer, setShowComposer] = useState(false)
  const [preview, setPreview] = useState('')
  const [previewType, setPreviewType] = useState<'image'|'video'|'audio'|''>('')
  const [dmOpen, setDmOpen] = useState<Post|null>(null)
  const [dmText, setDmText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recTime, setRecTime] = useState(0)

  const fileRef = useRef<HTMLInputElement>(null)
  const mediaRecRef = useRef<MediaRecorder|null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<any>(null)

  const createPost = () => {
    if(!newText && !preview) return
    const p:Post = {
      id:Date.now(), name:'You', handle:'you', text:newText, feeling,
      likes:0, views:1, comments:0, time:'now',
      image: previewType==='image' ? preview : '',
      video: previewType==='video' ? preview : '',
      audio: previewType==='audio' ? preview : '',
    }
    setPosts([p, ...posts])
    setNewText(''); setPreview(''); setPreviewType(''); setShowComposer(false)
  }

  const onFile = (e:any) => {
    const file = e.target.files[0]
    if(!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    setPreviewType(file.type.startsWith('video') ? 'video' : 'image')
  }

  const startVoice = async () => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({audio:true})
      audioChunksRef.current = []
      const mr = new MediaRecorder(stream)
      mediaRecRef.current = mr
      mr.ondataavailable = e=> audioChunksRef.current.push(e.data)
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {type:'audio/webm'})
        const url = URL.createObjectURL(blob)
        setPreview(url); setPreviewType('audio')
        stream.getTracks().forEach(t=>t.stop())
      }
      mr.start()
      setIsRecording(true); setRecTime(0)
      timerRef.current = setInterval(()=>setRecTime(s=>{if(s>=15){stopVoice(); return 15} return s+1}),1000)
    }catch{ alert('Allow mic') }
  }

  const stopVoice = () => {
    clearInterval(timerRef.current)
    mediaRecRef.current?.stop()
    setIsRecording(false)
  }

  const like = (id:number) => {
    setPosts(posts.map(p=> p.id===id ? {...p, likes: p.liked ? p.likes-1 : p.likes+1, liked: !p.liked} : p))
  }

  const sendDM = () => {
    if(!dmText || !dmOpen) return
    alert(`DM sent to @${dmOpen.handle}: ${dmText}`)
    setDmText(''); setDmOpen(null)
  }

  return(
    <div style={{minHeight:'100vh', background:'#000', color:'white', fontFamily:'-apple-system, system-ui', maxWidth:'600px', margin:'0 auto', borderLeft:'1px solid #222', borderRight:'1px solid #222'}}>
      <div style={{position:'sticky', top:0, zIndex:20, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(12px)', padding:'12px 16px', display:'flex', justifyContent:'space-between', borderBottom:'1px solid #222'}}>
        <div style={{display:'flex', gap:'16px', alignItems:'center'}}><a href="/" style={{color:'white', textDecoration:'none'}}>←</a><span style={{fontWeight:'800', fontSize:'18px'}}>LUMEN</span></div>
        <span style={{fontSize:'11px', opacity:0.5}}>Voice + Photo + Text</span>
      </div>

      <div style={{padding:'12px 16px', borderBottom:'1px solid #222', display:'flex', gap:'12px'}}>
        <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'#1DA1F2', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>Y</div>
        <div style={{flex:1}}>
          <div onClick={()=>setShowComposer(true)} style={{background:'#111', border:'1px solid #222', borderRadius:'20px', padding:'12px 16px', color:'#666', cursor:'text'}}>{newText || "What's your feeling? Text, voice, photo..."}</div>
          <div style={{display:'flex', gap:'12px', marginTop:'10px', alignItems:'center'}}>
            <span onClick={()=>fileRef.current?.click()} style={{cursor:'pointer'}}>🖼️</span>
            <span onClick={()=>{setShowComposer(true); setTimeout(startVoice,200)}} style={{cursor:'pointer'}}>🎙️</span>
            <div style={{display:'flex', gap:'6px'}}>
              {['Soft','Focus','Calm','Raw'].map(f=><span key={f} onClick={()=>setFeeling(f)} style={{fontSize:'11px', padding:'4px 8px', borderRadius:'12px', background:feeling===f?'white':'#111', color:feeling===f?'black':'#666', border:'1px solid #222', cursor:'pointer'}}>{f}</span>)}
            </div>
          </div>
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*,video/*" hidden onChange={onFile} />

      {showComposer && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:50, padding:'16px'}}>
          <div style={{background:'black', border:'1px solid #222', borderRadius:'16px', padding:'16px', maxWidth:'600px', margin:'0 auto'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}>
              <span onClick={()=>setShowComposer(false)} style={{color:'#1DA1F2', cursor:'pointer'}}>Cancel</span>
              <span style={{fontWeight:'700'}}>New LUMEN</span>
              <span onClick={createPost} style={{background:'#1DA1F2', color:'white', padding:'6px 16px', borderRadius:'20px', fontWeight:'700', cursor:'pointer'}}>Post</span>
            </div>
            <textarea value={newText} onChange={e=>setNewText(e.target.value)} placeholder="Wetin you dey feel? Talk, type, show..." autoFocus style={{width:'100%', minHeight:'100px', background:'transparent', border:'none', color:'white', fontSize:'18px', outline:'none', resize:'none'}} maxLength={280} />
            
            {preview && previewType==='image' && <img src={preview} style={{width:'100%', borderRadius:'16px', marginTop:'12px'}} alt="" />}
            {preview && previewType==='video' && <video src={preview} controls style={{width:'100%', borderRadius:'16px', marginTop:'12px'}} />}
            {preview && previewType==='audio' && <div style={{marginTop:'12px', background:'#111', padding:'12px', borderRadius:'12px', display:'flex', alignItems:'center', gap:'10px'}}><span>🎙️ Voice ready</span><audio src={preview} controls style={{flex:1}} /></div>}

            <div style={{marginTop:'14px', display:'flex', gap:'8px', borderTop:'1px solid #222', paddingTop:'12px', alignItems:'center'}}>
              <span onClick={()=>fileRef.current?.click()} style={{background:'#111', border:'1px solid #222', padding:'8px 12px', borderRadius:'20px', cursor:'pointer', fontSize:'13px'}}>🖼️ Photo/Video</span>
              
              {!isRecording ? <span onClick={startVoice} style={{background:'#111', border:'1px solid #222', padding:'8px 12px', borderRadius:'20px', cursor:'pointer', fontSize:'13px'}}>🎙️ Record Voice</span>
              : <span onClick={stopVoice} style={{background:'red', padding:'8px 16px', borderRadius:'20px', cursor:'pointer', fontSize:'13px', display:'flex', gap:'6px', alignItems:'center'}}><span style={{width:'8px', height:'8px', background:'white', borderRadius:'50%'}}></span> {recTime}s • Tap to Stop</span>}

              <span style={{marginLeft:'auto', fontSize:'11px', opacity:0.5}}>{feeling}</span>
            </div>
            {isRecording && <p style={{margin:'8px 0 0', fontSize:'12px', color:'red'}}>Recording voice aura... max 15 sec</p>}
          </div>
        </div>
      )}

      <div>
        {posts.map(p=>(
          <div key={p.id} style={{padding:'14px 16px', borderBottom:'1px solid #222', display:'flex', gap:'12px'}}>
            <div style={{width:'40px', height:'40px', borderRadius:'50%', background: p.handle==='you' ? '#1DA1F2' : '#333', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{p.name[0]}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', gap:'6px', alignItems:'center'}}><span style={{fontWeight:'700'}}>{p.name}</span><span style={{color:'#666', fontSize:'13px'}}>@{p.handle} · {p.time}</span><span style={{background:'#111', border:'1px solid #222', padding:'2px 8px', borderRadius:'10px', fontSize:'10px'}}>{p.feeling}</span></div>
              {p.text && <p style={{margin:'6px 0 0', fontSize:'15px', lineHeight:'1.4'}}>{p.text}</p>}
              {p.image && <img src={p.image} style={{marginTop:'10px', width:'100%', borderRadius:'16px', border:'1px solid #222'}} alt="" />}
              {p.video && <video src={p.video} controls style={{marginTop:'10px', width:'100%', borderRadius:'16px'}} />}
              {p.audio && <div style={{marginTop:'10px', background:'#111', border:'1px solid #222', borderRadius:'20px', padding:'10px 14px', display:'flex', alignItems:'center', gap:'10px'}}><audio src={p.audio} controls style={{flex:1, height:'32px'}} /><span style={{fontSize:'11px', opacity:0.5}}>Voice Aura</span></div>}
              <div style={{display:'flex', gap:'20px', marginTop:'10px', color:'#666', fontSize:'13px'}}>
                <span>💬 {p.comments}</span><span onClick={()=>like(p.id)} style={{cursor:'pointer', color:p.liked?'#F91880':'#666'}}>{p.liked?'❤️':'🤍'} {p.likes}</span><span>👁️ {p.views}</span><span onClick={()=>setDmOpen(p)} style={{background:'#1DA1F2', color:'white', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', cursor:'pointer', marginLeft:'auto'}}>DM</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {dmOpen && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:60, display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
          <div style={{background:'#16181C', width:'100%', maxWidth:'600px', borderRadius:'20px 20px 0 0', padding:'16px'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}><span style={{fontWeight:'700'}}>{dmOpen.name} @{dmOpen.handle}</span><span onClick={()=>setDmOpen(null)} style={{cursor:'pointer'}}>✕</span></div>
            <div style={{display:'flex', gap:'8px'}}><input value={dmText} onChange={e=>setDmText(e.target.value)} placeholder={`Message @${dmOpen.handle}...`} style={{flex:1, background:'#000', border:'1px solid #222', borderRadius:'20px', padding:'12px 16px', color:'white'}} /><div onClick={sendDM} style={{background:'#1DA1F2', padding:'12px 20px', borderRadius:'20px', fontWeight:'700', cursor:'pointer'}}>Send</div></div>
          </div>
        </div>
      )}

      <div onClick={()=>setShowComposer(true)} style={{position:'fixed', bottom:'20px', right:'20px', width:'56px', height:'56px', background:'#1DA1F2', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', cursor:'pointer'}}>+</div>
    </div>
  )
                }
