'use client'
import { useState, useRef } from 'react'

type Post = {
  id:number
  name:string
  handle:string
  text:string
  image?:string
  video?:string
  feeling:string
  likes:number
  views:number
  comments:number
  liked?:boolean
  time:string
}

export default function Lumen(){
  const [posts, setPosts] = useState<Post[]>([
    {id:1, name:'Lola', handle:'yaba_girl', text:'Morning light for Yaba market. Everything soft today. Who dey around?', feeling:'Soft', likes:342, views:2341, comments:12, time:'2m', image:''},
    {id:2, name:'Emeka', handle:'emeka_runs', text:'5am run done. Sabo to Yaba. Focus mode.', feeling:'Focus', likes:120, views:1820, comments:3, time:'12m'},
  ])
  const [newText, setNewText] = useState('')
  const [feeling, setFeeling] = useState('Soft')
  const [showComposer, setShowComposer] = useState(false)
  const [preview, setPreview] = useState('')
  const [dmOpen, setDmOpen] = useState<Post|null>(null)
  const [dmText, setDmText] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const createPost = () => {
    if(!newText && !preview) return
    const p:Post = {
      id:Date.now(),
      name:'You',
      handle:'you',
      text:newText,
      image: preview.includes('image') ? preview : '',
      video: preview.includes('video') ? preview : '',
      feeling,
      likes:0, views:1, comments:0,
      time:'now'
    }
    setPosts([p, ...posts])
    setNewText(''); setPreview(''); setShowComposer(false)
  }

  const onFile = (e:any) => {
    const file = e.target.files[0]
    if(!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const like = (id:number) => {
    setPosts(posts.map(p=> p.id===id ? {...p, likes: p.liked ? p.likes-1 : p.likes+1, liked: !p.liked} : p))
  }

  const sendDM = () => {
    if(!dmText || !dmOpen) return
    alert(`DM sent to @${dmOpen.handle}: "${dmText}" - e go show for Chats`)
    setDmText(''); setDmOpen(null)
  }

  return(
    <div style={{minHeight:'100vh', background:'#000', color:'white', fontFamily:'-apple-system, system-ui', maxWidth:'600px', margin:'0 auto', borderLeft:'1px solid #222', borderRight:'1px solid #222'}}>

      {/* Header - Twitter */}
      <div style={{position:'sticky', top:0, zIndex:20, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(12px)', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #222'}}>
        <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
          <a href="/" style={{color:'white', textDecoration:'none', fontSize:'18px'}}>←</a>
          <span style={{fontWeight:'800', fontSize:'18px', letterSpacing:'0.5px'}}>LUMEN</span>
        </div>
        <span style={{fontSize:'11px', opacity:0.5}}>👁️ Live • Yaba</span>
      </div>

      {/* Composer - Twitter */}
      <div style={{padding:'12px 16px', borderBottom:'1px solid #222', display:'flex', gap:'12px'}}>
        <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'#333', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', flexShrink:0}}>Y</div>
        <div style={{flex:1}}>
          <div onClick={()=>setShowComposer(true)} style={{background:'#111', border:'1px solid #222', borderRadius:'20px', padding:'12px 16px', color: newText ? 'white' : '#666', cursor:'text', minHeight:'44px'}}>
            {newText || "What's your feeling? Share your POV..."}
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'10px'}}>
            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
              <span onClick={()=>fileRef.current?.click()} style={{color:'#1DA1F2', cursor:'pointer', fontSize:'18px'}}>🖼️</span>
              <span onClick={()=>fileRef.current?.click()} style={{color:'#1DA1F2', cursor:'pointer', fontSize:'18px'}}>🎥</span>
              <div style={{display:'flex', gap:'6px'}}>
                {['Soft','Focus','Calm','Raw'].map(f=>(
                  <span key={f} onClick={()=>setFeeling(f)} style={{fontSize:'11px', padding:'4px 8px', borderRadius:'12px', background: feeling===f ? 'white' : '#111', color: feeling===f ? 'black' : '#666', border:'1px solid #222', cursor:'pointer', fontWeight:'600'}}>{f}</span>
                ))}
              </div>
            </div>
            <span style={{fontSize:'11px', opacity:0.4}}>{newText.length}/280</span>
          </div>
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*,video/*" hidden onChange={onFile} />

      {/* Full Composer Modal */}
      {showComposer && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:50, padding:'16px'}}>
          <div style={{background:'black', border:'1px solid #222', borderRadius:'16px', padding:'16px', maxWidth:'600px', margin:'0 auto'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}>
              <span onClick={()=>setShowComposer(false)} style={{color:'#1DA1F2', cursor:'pointer'}}>Cancel</span>
              <span style={{fontWeight:'700'}}>New LUMEN</span>
              <span onClick={createPost} style={{background:'#1DA1F2', color:'white', padding:'6px 16px', borderRadius:'20px', fontWeight:'700', cursor:'pointer', opacity: (newText||preview) ? 1 : 0.5}}>Post</span>
            </div>
            <textarea value={newText} onChange={e=>setNewText(e.target.value)} placeholder="Share your POV... wetin you see, wetin you feel?" autoFocus style={{width:'100%', minHeight:'120px', background:'transparent', border:'none', color:'white', fontSize:'18px', outline:'none', resize:'none'}} maxLength={280} />
            {preview && <div style={{marginTop:'12px', position:'relative'}}><img src={preview} style={{width:'100%', borderRadius:'16px', maxHeight:'300px', objectFit:'cover'}} alt="" /><span onClick={()=>setPreview('')} style={{position:'absolute', top:'8px', right:'8px', background:'black', width:'28px', height:'28px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>✕</span></div>}
            <div style={{marginTop:'12px', display:'flex', gap:'8px', paddingTop:'12px', borderTop:'1px solid #222'}}>
              <span onClick={()=>fileRef.current?.click()} style={{background:'#111', border:'1px solid #222', padding:'8px 12px', borderRadius:'20px', fontSize:'13px', cursor:'pointer'}}>🖼️ Photo</span>
              <span onClick={()=>fileRef.current?.click()} style={{background:'#111', border:'1px solid #222', padding:'8px 12px', borderRadius:'20px', fontSize:'13px', cursor:'pointer'}}>🎥 Video</span>
              <span style={{marginLeft:'auto', fontSize:'12px', opacity:0.5, display:'flex', alignItems:'center', gap:'6px'}}><span style={{width:'6px', height:'6px', background:'#1DA1F2', borderRadius:'50%'}}></span> {feeling} • POV</span>
            </div>
          </div>
        </div>
      )}

      {/* Feed - Twitter */}
      <div>
        {posts.map(p=>(
          <div key={p.id} style={{padding:'12px 16px', borderBottom:'1px solid #222', display:'flex', gap:'12px'}}>
            <div style={{width:'40px', height:'40px', borderRadius:'50%', background:p.handle==='you' ? '#1DA1F2' : '#333', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', flexShrink:0}}>{p.name[0]}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', gap:'6px', alignItems:'center', flexWrap:'wrap'}}>
                <span style={{fontWeight:'700', fontSize:'15px'}}>{p.name}</span>
                <span style={{color:'#666', fontSize:'14px'}}>@{p.handle}</span>
                <span style={{color:'#666', fontSize:'14px'}}>· {p.time}</span>
                <span style={{background:`${p.feeling==='Soft' ? '#FFD6E0' : p.feeling==='Focus' ? '#C4D9FF' : '#D6FFD6'}20`, color:p.feeling==='Soft' ? '#FF8FAB' : p.feeling==='Focus' ? '#6FA0FF' : '#7CFF7C', padding:'2px 8px', borderRadius:'10px', fontSize:'10px', fontWeight:'700'}}>{p.feeling}</span>
              </div>

              <p style={{margin:'6px 0 0', fontSize:'15px', lineHeight:'1.4', whiteSpace:'pre-wrap', wordBreak:'break-word'}}>{p.text}</p>

              {p.image && <img src={p.image} style={{marginTop:'10px', width:'100%', borderRadius:'16px', border:'1px solid #222', maxHeight:'400px', objectFit:'cover'}} alt="" />}
              {p.video && <video src={p.video} controls style={{marginTop:'10px', width:'100%', borderRadius:'16px', border:'1px solid #222'}} />}

              {/* Actions - Twitter */}
              <div style={{display:'flex', justifyContent:'space-between', marginTop:'10px', maxWidth:'90%'}}>
                <span style={{display:'flex', alignItems:'center', gap:'6px', color:'#666', fontSize:'13px', cursor:'pointer'}}>
                  <span>💬</span> {p.comments}
                </span>
                <span onClick={()=>like(p.id)} style={{display:'flex', alignItems:'center', gap:'6px', color: p.liked ? '#F91880' : '#666', fontSize:'13px', cursor:'pointer'}}>
                  <span>{p.liked ? '❤️' : '🤍'}</span> {p.likes}
                </span>
                <span style={{display:'flex', alignItems:'center', gap:'6px', color:'#666', fontSize:'13px'}}>
                  <span>👁️</span> {p.views.toLocaleString()}
                </span>
                <span style={{color:'#666', fontSize:'13px', cursor:'pointer'}}>↗️</span>
                <span onClick={()=>setDmOpen(p)} style={{background:'#1DA1F2', color:'white', padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', cursor:'pointer'}}>DM</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DM Modal */}
      {dmOpen && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:60, display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
          <div style={{background:'#16181C', width:'100%', maxWidth:'600px', borderRadius:'20px 20px 0 0', borderTop:'1px solid #222', padding:'16px', maxHeight:'70vh', display:'flex', flexDirection:'column'}}>
            <div style={{width:'36px', height:'4px', background:'#333', borderRadius:'2px', margin:'0 auto 16px'}}></div>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'16px'}}>
              <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <div style={{width:'36px', height:'36px', borderRadius:'50%', background:'#333', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{dmOpen.name[0]}</div>
                <div>
                  <p style={{margin:0, fontWeight:'700', fontSize:'14px'}}>{dmOpen.name} • @{dmOpen.handle}</p>
                  <p style={{margin:0, fontSize:'12px', opacity:0.5}}>DM from LUMEN</p>
                </div>
              </div>
              <span onClick={()=>setDmOpen(null)} style={{opacity:0.5, cursor:'pointer'}}>✕</span>
            </div>
            <div style={{background:'#000', border:'1px solid #222', borderRadius:'12px', padding:'12px', marginBottom:'12px'}}>
              <p style={{margin:0, fontSize:'13px', opacity:0.6}}>Replying to:</p>
              <p style={{margin:'4px 0 0', fontSize:'14px'}}>"{dmOpen.text.slice(0,100)}"</p>
            </div>
            <div style={{display:'flex', gap:'8px'}}>
              <input value={dmText} onChange={e=>setDmText(e.target.value)} placeholder={`Message @${dmOpen.handle}...`} autoFocus style={{flex:1, background:'#000', border:'1px solid #222', borderRadius:'20px', padding:'12px 16px', color:'white', outline:'none'}} />
              <div onClick={sendDM} style={{background:'#1DA1F2', color:'white', padding:'12px 20px', borderRadius:'20px', fontWeight:'700', cursor:'pointer'}}>Send</div>
            </div>
            <p style={{margin:'10px 0 0', fontSize:'11px', opacity:0.4, textAlign:'center'}}>DM go enter for Chats page • End-to-end vibe</p>
          </div>
        </div>
      )}

      {/* Floating Post Button - Twitter */}
      <div onClick={()=>setShowComposer(true)} style={{position:'fixed', bottom:'20px', right:'20px', width:'56px', height:'56px', background:'#1DA1F2', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', fontWeight:'700', cursor:'pointer', boxShadow:'0 4px 12px rgba(29,161,242,0.4)', zIndex:30}}>+</div>

    </div>
  )
          }
