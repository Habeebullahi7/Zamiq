'use client'
import { useState, useRef } from 'react'

type Comment = { id:number; name:string; text?:string; audio?:string; time:string }
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
  commentList: Comment[]
}

export default function Lumen(){
  const [posts, setPosts] = useState<Post[]>([
    {id:1, name:'Lola', handle:'yaba_girl', text:'Morning light for Yaba market. Soft today.', feeling:'Soft', likes:342, views:2341, comments:2, time:'2m', commentList:[{id:101, name:'You', text:'This soft mehn 😍', time:'1m'}, {id:102, name:'Tunde', audio:'', time:'now'}]},
    {id:2, name:'Emeka', handle:'emeka_runs', text:'5am run done.', feeling:'Focus', likes:120, views:1820, comments:0, time:'12m', commentList:[]},
  ])
  const [newText, setNewText] = useState('')
  const [feeling, setFeeling] = useState('Soft')
  const [showComposer, setShowComposer] = useState(false)
  const [preview, setPreview] = useState('')
  const [previewType, setPreviewType] = useState<'image'|'video'|'audio'|''>('')
  const [activePost, setActivePost] = useState<Post|null>(null)
  const [commentText, setCommentText] = useState('')
  const [commentAudio, setCommentAudio] = useState('')
  const [isRec, setIsRec] = useState(false)
  const [recTime, setRecTime] = useState(0)
  const [isCommentRec, setIsCommentRec] = useState(false)
  const [cRecTime, setCRecTime] = useState(0)
  const [dmOpen, setDmOpen] = useState<Post|null>(null)
  const [dmText, setDmText] = useState('')

  const fileRef = useRef<HTMLInputElement>(null)
  const mediaRef = useRef<MediaRecorder|null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<any>(null)

  const createPost = () => {
    if(!newText && !preview) return
    const p:Post = { id:Date.now(), name:'You', handle:'you', text:newText, feeling, likes:0, views:1, comments:0, time:'now', image: previewType==='image'?preview:'', video: previewType==='video'?preview:'', audio: previewType==='audio'?preview:'', commentList:[] }
    setPosts([p, ...posts]); setNewText(''); setPreview(''); setPreviewType(''); setShowComposer(false)
  }

  const onFile = (e:any) => {
    const file = e.target.files[0]; if(!file) return
    setPreview(URL.createObjectURL(file)); setPreviewType(file.type.startsWith('video')?'video':'image')
  }

  const startVoice = async (forComment=false) => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({audio:true})
      chunksRef.current = []; const mr = new MediaRecorder(stream); mediaRef.current = mr
      mr.ondataavailable = e=> chunksRef.current.push(e.data)
      mr.onstop = () => {
        const url = URL.createObjectURL(new Blob(chunksRef.current, {type:'audio/webm'}))
        if(forComment) setCommentAudio(url); else { setPreview(url); setPreviewType('audio') }
        stream.getTracks().forEach(t=>t.stop())
      }
      mr.start()
      if(forComment){ setIsCommentRec(true); setCRecTime(0); timerRef.current=setInterval(()=>setCRecTime(s=>{if(s>=15){stopVoice(); return 15} return s+1}),1000) }
      else { setIsRec(true); setRecTime(0); timerRef.current=setInterval(()=>setRecTime(s=>{if(s>=15){stopVoice(); return 15} return s+1}),1000) }
    }catch{ alert('Allow mic') }
  }

  const stopVoice = () => { clearInterval(timerRef.current); mediaRef.current?.stop(); setIsRec(false); setIsCommentRec(false) }

  const like = (id:number) => setPosts(posts.map(p=> p.id===id ? {...p, likes: p.liked? p.likes-1 : p.likes+1, liked:!p.liked} : p))

  const addComment = () => {
    if(!commentText && !commentAudio) return
    const c:Comment = { id:Date.now(), name:'You', text:commentText, audio:commentAudio, time:'now' }
    const updated = posts.map(p=> p.id===activePost?.id ? {...p, commentList:[...p.commentList, c], comments:p.comments+1} : p)
    setPosts(updated)
    if(activePost) setActivePost({...activePost, commentList:[...activePost.commentList, c], comments:activePost.comments+1})
    setCommentText(''); setCommentAudio('')
  }

  return(
    <div style={{minHeight:'100vh', background:'#000', color:'white', fontFamily:'system-ui', maxWidth:'600px', margin:'0 auto', borderLeft:'1px solid #222', borderRight:'1px solid #222'}}>
      <div style={{position:'sticky', top:0, zIndex:20, background:'rgba(0,0,0,0.9)', padding:'12px 16px', display:'flex', justifyContent:'space-between', borderBottom:'1px solid #222'}}>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}><a href="/" style={{color:'white', textDecoration:'none'}}>←</a><span style={{fontWeight:'800'}}>LUMEN</span></div>
        <span style={{fontSize:'11px', opacity:0.5}}>Voice Comments • On</span>
      </div>

      <div style={{padding:'12px 16px', borderBottom:'1px solid #222', display:'flex', gap:'12px'}}>
        <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'#1DA1F2', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>Y</div>
        <div onClick={()=>setShowComposer(true)} style={{flex:1, background:'#111', border:'1px solid #222', borderRadius:'20px', padding:'12px 16px', color:'#666'}}>What's your feeling? Voice, photo, text...</div>
      </div>
      <input ref={fileRef} type="file" accept="image/*,video/*" hidden onChange={onFile} />

      {showComposer && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:50, padding:'16px'}}>
          <div style={{background:'black', border:'1px solid #222', borderRadius:'16px', padding:'16px'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><span onClick={()=>setShowComposer(false)} style={{color:'#1DA1F2'}}>Cancel</span><span onClick={createPost} style={{background:'#1DA1F2', padding:'6px 16px', borderRadius:'20px', fontWeight:'700', cursor:'pointer'}}>Post</span></div>
            <textarea value={newText} onChange={e=>setNewText(e.target.value)} placeholder="Share POV..." autoFocus style={{width:'100%', minHeight:'100px', background:'transparent', border:'none', color:'white', fontSize:'18px', outline:'none', marginTop:'12px'}} />
            {preview && previewType==='image' && <img src={preview} style={{width:'100%', borderRadius:'16px', marginTop:'10px'}} alt="" />}
            {preview && previewType==='video' && <video src={preview} controls style={{width:'100%', borderRadius:'16px', marginTop:'10px'}} />}
            {preview && previewType==='audio' && <div style={{marginTop:'10px', background:'#111', padding:'10px', borderRadius:'12px'}}><audio src={preview} controls style={{width:'100%'}} /></div>}
            <div style={{display:'flex', gap:'8px', marginTop:'12px', borderTop:'1px solid #222', paddingTop:'12px'}}>
              <span onClick={()=>fileRef.current?.click()} style={{background:'#111', padding:'8px 12px', borderRadius:'20px', fontSize:'13px', cursor:'pointer'}}>🖼️</span>
              {!isRec ? <span onClick={()=>startVoice(false)} style={{background:'#111', padding:'8px 12px', borderRadius:'20px', fontSize:'13px', cursor:'pointer'}}>🎙️ Voice</span> : <span onClick={stopVoice} style={{background:'red', padding:'8px 12px', borderRadius:'20px', fontSize:'13px'}}>⏹️ {recTime}s Stop</span>}
              <span style={{marginLeft:'auto', fontSize:'11px', opacity:0.5}}>{feeling}</span>
            </div>
            <div style={{display:'flex', gap:'6px', marginTop:'10px'}}>{['Soft','Focus','Calm','Raw'].map(f=><span key={f} onClick={()=>setFeeling(f)} style={{fontSize:'11px', padding:'4px 8px', borderRadius:'10px', background:feeling===f?'white':'#111', color:feeling===f?'black':'#666', cursor:'pointer'}}>{f}</span>)}</div>
          </div>
        </div>
      )}

      <div>
        {posts.map(p=>(
          <div key={p.id} style={{padding:'14px 16px', borderBottom:'1px solid #222'}}>
            <div style={{display:'flex', gap:'12px'}}>
              <div style={{width:'40px', height:'40px', borderRadius:'50%', background:p.handle==='you'?'#1DA1F2':'#333', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{p.name[0]}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex', gap:'6px'}}><b>{p.name}</b><span style={{color:'#666'}}>@{p.handle} · {p.time}</span><span style={{background:'#111', border:'1px solid #222', padding:'2px 6px', borderRadius:'8px', fontSize:'10px'}}>{p.feeling}</span></div>
                {p.text && <p style={{margin:'6px 0 0'}}>{p.text}</p>}
                {p.image && <img src={p.image} style={{width:'100%', borderRadius:'16px', marginTop:'8px'}} alt="" />}
                {p.video && <video src={p.video} controls style={{width:'100%', borderRadius:'16px', marginTop:'8px'}} />}
                {p.audio && <audio src={p.audio} controls style={{width:'100%', marginTop:'8px'}} />}
                <div style={{display:'flex', gap:'18px', marginTop:'10px', color:'#666', fontSize:'13px'}}>
                  <span onClick={()=>setActivePost(p)} style={{cursor:'pointer'}}>💬 {p.comments} {p.comments>0 && '- reply with voice'}</span>
                  <span onClick={()=>like(p.id)} style={{cursor:'pointer', color:p.liked?'#F91880':'#666'}}>{p.liked?'❤️':'🤍'} {p.likes}</span>
                  <span>👁️ {p.views}</span>
                  <span onClick={()=>setDmOpen(p)} style={{background:'#1DA1F2', color:'white', padding:'4px 10px', borderRadius:'12px', fontSize:'12px', marginLeft:'auto', cursor:'pointer'}}>DM</span>
                </div>
              </div>
            </div>

            {/* Preview of comments */}
            {p.commentList.length>0 && (
              <div style={{marginTop:'10px', marginLeft:'52px', background:'#0A0A0A', border:'1px solid #111', borderRadius:'12px', padding:'8px 12px'}}>
                {p.commentList.slice(-2).map(c=>(
                  <div key={c.id} style={{display:'flex', gap:'8px', padding:'4px 0', alignItems:'center'}}>
                    <b style={{fontSize:'12px'}}>{c.name}:</b>
                    {c.text && <span style={{fontSize:'13px'}}>{c.text}</span>}
                    {c.audio && <audio src={c.audio} controls style={{height:'28px', width:'160px'}} />}
                  </div>
                ))}
                {p.commentList.length>2 && <span onClick={()=>setActivePost(p)} style={{fontSize:'11px', color:'#1DA1F2', cursor:'pointer'}}>View {p.commentList.length} replies</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comment Thread - with voice */}
      {activePost && (
        <div style={{position:'fixed', inset:0, background:'#000', zIndex:60, display:'flex', flexDirection:'column'}}>
          <div style={{padding:'12px 16px', borderBottom:'1px solid #222', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span onClick={()=>setActivePost(null)} style={{color:'#1DA1F2', cursor:'pointer'}}>← Back</span><b>Replies • Voice + Text</b><span></span>
          </div>
          <div style={{padding:'14px 16px', borderBottom:'1px solid #222', display:'flex', gap:'12px'}}>
            <div style={{width:'40px', height:'40px', borderRadius:'50%', background:'#333', display:'flex', alignItems:'center', justifyContent:'center'}}>{activePost.name[0]}</div>
            <div><b>{activePost.name}</b> <span style={{color:'#666'}}>@{activePost.handle}</span><p style={{margin:'6px 0 0'}}>{activePost.text}</p>{activePost.audio && <audio src={activePost.audio} controls style={{marginTop:'8px', width:'100%'}} />}</div>
          </div>
          <div style={{flex:1, overflowY:'auto', padding:'12px 16px'}}>
            {activePost.commentList.map(c=>(
              <div key={c.id} style={{display:'flex', gap:'10px', padding:'10px 0', borderBottom:'1px solid #111'}}>
                <div style={{width:'32px', height:'32px', borderRadius:'50%', background:'#1DA1F2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:'700'}}>{c.name[0]}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex', gap:'6px'}}><b style={{fontSize:'13px'}}>{c.name}</b><span style={{color:'#666', fontSize:'12px'}}>{c.time}</span></div>
                  {c.text && <p style={{margin:'4px 0 0', fontSize:'14px'}}>{c.text}</p>}
                  {c.audio && <div style={{marginTop:'6px', background:'#111', borderRadius:'20px', padding:'6px 10px', display:'flex', alignItems:'center', gap:'8px'}}><audio src={c.audio} controls style={{flex:1, height:'32px'}} /><span style={{fontSize:'10px', opacity:0.5}}>Voice reply</span></div>}
                </div>
              </div>
            ))}
          </div>
          <div style={{padding:'12px 16px', borderTop:'1px solid #222', background:'#0A0A0A'}}>
            {commentAudio && <div style={{marginBottom:'8px', background:'#111', padding:'8px', borderRadius:'10px', display:'flex', gap:'8px', alignItems:'center'}}><audio src={commentAudio} controls style={{flex:1, height:'30px'}} /><span onClick={()=>setCommentAudio('')} style={{cursor:'pointer'}}>✕</span></div>}
            <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
              <input value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Reply... text or voice" style={{flex:1, background:'black', border:'1px solid #222', borderRadius:'20px', padding:'12px 16px', color:'white', outline:'none'}} />
              {!isCommentRec ? <span onClick={()=>startVoice(true)} style={{width:'40px', height:'40px', background:'#1DA1F2', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>🎙️</span> : <span onClick={stopVoice} style={{width:'40px', height:'40px', background:'red', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'12px'}}>{cRecTime}s</span>}
              <span onClick={addComment} style={{background:'white', color:'black', padding:'10px 16px', borderRadius:'20px', fontWeight:'700', cursor:'pointer', opacity: (commentText||commentAudio) ? 1 : 0.4}}>Reply</span>
            </div>
            <p style={{margin:'6px 0 0', fontSize:'11px', opacity:0.4, textAlign:'center'}}>{isCommentRec ? '🔴 Recording voice reply... tap to stop' : 'Tap 🎙️ to reply with voice note (15s)'}</p>
          </div>
        </div>
      )}

      {dmOpen && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:70, display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
          <div style={{background:'#16181C', width:'100%', maxWidth:'600px', borderRadius:'20px 20px 0 0', padding:'16px'}}><div style={{display:'flex', justifyContent:'space-between'}}><b>{dmOpen.name}</b><span onClick={()=>setDmOpen(null)} style={{cursor:'pointer'}}>✕</span></div><div style={{display:'flex', gap:'8px', marginTop:'12px'}}><input value={dmText} onChange={e=>setDmText(e.target.value)} placeholder="Message..." style={{flex:1, background:'black', border:'1px solid #222', borderRadius:'20px', padding:'12px'}} /><span onClick={()=>{alert('DM sent'); setDmOpen(null); setDmText('')}} style={{background:'#1DA1F2', padding:'12px 16px', borderRadius:'20px', cursor:'pointer'}}>Send</span></div></div>
        </div>
      )}

      <div onClick={()=>setShowComposer(true)} style={{position:'fixed', bottom:'20px', right:'20px', width:'56px', height:'56px', background:'#1DA1F2', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', cursor:'pointer'}}>+</div>
    </div>
  )
            }
