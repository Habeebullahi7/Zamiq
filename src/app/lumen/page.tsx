'use client'
import { useState, useRef } from 'react'

type Comment = { id:number; name:string; text?:string; audio?:string; time:string }
type Post = { id:number; name:string; text:string; feeling:string; likes:number; views:number; comments:number; liked?:boolean; time:string; image?:string; audio?:string; commentList:Comment[] }

export default function Lumen(){
  const [posts, setPosts] = useState<Post[]>([
    {id:1, name:'Lola', text:'Morning light for Yaba market. Everything soft today.', feeling:'Soft', likes:342, views:2341, comments:1, time:'2m', image:'', commentList:[{id:101, name:'You', text:'Soft mehn 😍', time:'1m'}]},
    {id:2, name:'Emeka', text:'5am run. Sabo to Yaba. Focus.', feeling:'Focus', likes:120, views:1820, comments:0, time:'12m', audio:'', commentList:[]},
  ])
  const [newText, setNewText] = useState('')
  const [feeling, setFeeling] = useState('Soft')
  const [showComposer, setShowComposer] = useState(false)
  const [preview, setPreview] = useState('')
  const [previewType, setPreviewType] = useState<'image'|'audio'|''>('')
  const [activePost, setActivePost] = useState<Post|null>(null)
  const [commentText, setCommentText] = useState('')
  const [commentAudio, setCommentAudio] = useState('')
  const [isRec, setIsRec] = useState(false)
  const [isCommentRec, setIsCommentRec] = useState(false)
  const [recTime, setRecTime] = useState(0)
  const [cRecTime, setCRecTime] = useState(0)

  const fileRef = useRef<HTMLInputElement>(null)
  const mediaRef = useRef<MediaRecorder|null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<any>(null)

  const feelingStyle = (f:string) => {
    if(f==='Soft') return {bg:'rgba(255,214,224,0.12)', border:'rgba(255,143,171,0.3)', dot:'#FF8FAB'}
    if(f==='Focus') return {bg:'rgba(196,217,255,0.12)', border:'rgba(111,160,255,0.3)', dot:'#6FA0FF'}
    if(f==='Calm') return {bg:'rgba(214,255,214,0.12)', border:'rgba(124,255,124,0.3)', dot:'#7CFF7C'}
    return {bg:'rgba(255,255,255,0.06)', border:'rgba(255,255,255,0.15)', dot:'#fff'}
  }

  const createPost = () => {
    if(!newText && !preview) return
    const p:Post = { id:Date.now(), name:'You', text:newText, feeling, likes:0, views:1, comments:0, time:'now', image: previewType==='image'?preview:'', audio: previewType==='audio'?preview:'', commentList:[] }
    setPosts([p, ...posts]); setNewText(''); setPreview(''); setPreviewType(''); setShowComposer(false)
  }

  const onFile = (e:any) => { const f=e.target.files[0]; if(!f) return; setPreview(URL.createObjectURL(f)); setPreviewType('image') }

  const startVoice = async (forComment=false) => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({audio:true}); chunksRef.current=[]; const mr=new MediaRecorder(stream); mediaRef.current=mr
      mr.ondataavailable=e=>chunksRef.current.push(e.data)
      mr.onstop=()=>{ const url=URL.createObjectURL(new Blob(chunksRef.current,{type:'audio/webm'})); if(forComment) setCommentAudio(url); else {setPreview(url); setPreviewType('audio')}; stream.getTracks().forEach(t=>t.stop()) }
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
    setPosts(posts.map(p=> p.id===activePost?.id ? {...p, commentList:[...p.commentList, c], comments:p.comments+1} : p))
    if(activePost) setActivePost({...activePost, commentList:[...activePost.commentList, c], comments:activePost.comments+1})
    setCommentText(''); setCommentAudio('')
  }

  return(
    <div style={{minHeight:'100vh', background:'#08080A', color:'white', fontFamily:'system-ui'}}>
      {/* Header - NOT twitter */}
      <div style={{padding:'18px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <a href="/" style={{color:'white', textDecoration:'none', fontSize:'13px', opacity:0.6}}>‹ chats</a>
        <span style={{fontSize:'11px', letterSpacing:'3px', fontWeight:'800', opacity:0.9}}>LUMEN</span>
        <span style={{fontSize:'10px', opacity:0.4}}>YABA • LIVE</span>
      </div>

      {/* Composer - Soft card not tweet box */}
      <div style={{padding:'16px 20px'}}>
        <div onClick={()=>setShowComposer(true)} style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'18px', padding:'14px 16px', display:'flex', alignItems:'center', gap:'12px', cursor:'pointer'}}>
          <div style={{width:'32px', height:'32px', borderRadius:'50%', background:'white', color:'black', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', fontSize:'12px'}}>Y</div>
          <span style={{color:'rgba(255,255,255,0.4)', fontSize:'14px'}}>Share your POV • voice, light, feeling...</span>
          <span style={{marginLeft:'auto', opacity:0.3}}>○</span>
        </div>
      </div>

      {/* Feed - POV Cards, not tweets */}
      <div style={{padding:'0 16px 80px', display:'flex', flexDirection:'column', gap:'16px', maxWidth:'520px', margin:'0 auto'}}>
        {posts.map(p=>{
          const f = feelingStyle(p.feeling)
          return(
            <div key={p.id} style={{background:f.bg, border:`1px solid ${f.border}`, borderRadius:'22px', padding:'16px', backdropFilter:'blur(10px)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:'700'}}>{p.name[0]}</div>
                  <span style={{fontSize:'13px', fontWeight:'600'}}>{p.name}</span>
                  <span style={{width:'4px', height:'4px', background:f.dot, borderRadius:'50%'}}></span>
                  <span style={{fontSize:'11px', opacity:0.5}}>{p.time}</span>
                </div>
                <span style={{fontSize:'10px', letterSpacing:'1px', padding:'4px 10px', borderRadius:'20px', background:'rgba(255,255,255,0.08)', border:`1px solid ${f.border}`, color:f.dot, fontWeight:'700'}}>{p.feeling.toUpperCase()}</span>
              </div>

              {p.text && <p style={{margin:'0 0 12px', fontSize:'15px', lineHeight:'1.5', letterSpacing:'0.1px'}}>{p.text}</p>}
              {p.image && <img src={p.image} style={{width:'100%', borderRadius:'16px', marginBottom:'12px', border:'1px solid rgba(255,255,255,0.08)'}} alt="" />}
              {p.audio && (
                <div style={{marginBottom:'12px', background:'rgba(0,0,0,0.3)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'14px', padding:'10px 14px', display:'flex', alignItems:'center', gap:'10px'}}>
                  <div style={{width:'36px', height:'36px', borderRadius:'50%', background:f.dot, display:'flex', alignItems:'center', justifyContent:'center', color:'black', fontWeight:'700'}}>▶</div>
                  <div style={{flex:1, display:'flex', gap:'3px', alignItems:'center', height:'24px'}}>{[...Array(18)].map((_,i)=><div key={i} style={{width:'3px', height:`${6+Math.random()*18}px`, background:f.dot, borderRadius:'2px', opacity:0.6+i*0.02}}></div>)}</div>
                  <audio src={p.audio} controls style={{width:'120px', height:'28px'}} />
                </div>
              )}

              <div style={{display:'flex', alignItems:'center', gap:'16px', paddingTop:'10px', borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                <span onClick={()=>setActivePost(p)} style={{fontSize:'13px', opacity:0.6, cursor:'pointer', display:'flex', gap:'6px', alignItems:'center'}}><span style={{fontSize:'16px'}}>◐</span> {p.comments} reply {p.comments===0 && <span style={{fontSize:'11px'}}>+ voice</span>}</span>
                <span onClick={()=>like(p.id)} style={{fontSize:'13px', cursor:'pointer', color: p.liked ? f.dot : 'rgba(255,255,255,0.6)'}}>{p.liked ? '●' : '○'} {p.likes}</span>
                <span style={{fontSize:'12px', opacity:0.35, marginLeft:'auto'}}>◍ {p.views}</span>
                <span style={{width:'28px', height:'28px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', cursor:'pointer'}}>↗</span>
              </div>

              {p.commentList.length>0 && (
                <div style={{marginTop:'12px', display:'flex', flexDirection:'column', gap:'8px'}}>
                  {p.commentList.slice(-2).map(c=>(
                    <div key={c.id} style={{background:'rgba(0,0,0,0.25)', borderRadius:'12px', padding:'8px 12px', display:'flex', gap:'8px', alignItems:'center'}}>
                      <span style={{fontSize:'11px', fontWeight:'700', opacity:0.7}}>{c.name}</span>
                      {c.text && <span style={{fontSize:'13px'}}>{c.text}</span>}
                      {c.audio && <audio src={c.audio} controls style={{height:'26px', width:'140px'}} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Composer Modal - Aura style */}
      {showComposer && (
        <div style={{position:'fixed', inset:0, background:'rgba(8,8,10,0.96)', backdropFilter:'blur(20px)', zIndex:50, padding:'20px'}}>
          <div style={{maxWidth:'520px', margin:'0 auto'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}><span onClick={()=>setShowComposer(false)} style={{opacity:0.6, cursor:'pointer'}}>✕</span><span style={{fontSize:'11px', letterSpacing:'2px', fontWeight:'700'}}>NEW POV</span><span onClick={createPost} style={{background:'white', color:'black', padding:'6px 14px', borderRadius:'20px', fontSize:'13px', fontWeight:'700', cursor:'pointer'}}>Share</span></div>
            <div style={{background:feelingStyle(feeling).bg, border:`1px solid ${feelingStyle(feeling).border}`, borderRadius:'20px', padding:'16px'}}>
              <textarea value={newText} onChange={e=>setNewText(e.target.value)} placeholder="Light, sound, feeling... wetin you see?" autoFocus style={{width:'100%', minHeight:'90px', background:'transparent', border:'none', color:'white', fontSize:'17px', outline:'none', resize:'none'}} />
              {preview && previewType==='image' && <img src={preview} style={{width:'100%', borderRadius:'14px', marginTop:'12px'}} alt="" />}
              {preview && previewType==='audio' && <audio src={preview} controls style={{width:'100%', marginTop:'12px'}} />}
              <div style={{display:'flex', gap:'8px', marginTop:'16px'}}>
                {['Soft','Focus','Calm','Raw'].map(f=>{ const s=feelingStyle(f); return <span key={f} onClick={()=>setFeeling(f)} style={{padding:'6px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', cursor:'pointer', background: feeling===f ? s.dot : 'rgba(255,255,255,0.06)', color: feeling===f ? 'black' : 'rgba(255,255,255,0.6)', border:`1px solid ${s.border}`}}>{f}</span>})}
              </div>
              <div style={{display:'flex', gap:'10px', marginTop:'16px', paddingTop:'14px', borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                <span onClick={()=>fileRef.current?.click()} style={{width:'40px', height:'40px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>◑</span>
                {!isRec ? <span onClick={()=>startVoice(false)} style={{width:'40px', height:'40px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>◍</span> : <span onClick={stopVoice} style={{padding:'8px 14px', borderRadius:'20px', background:'#FF4D5E', fontSize:'12px', fontWeight:'700'}}>● {recTime}s • stop</span>}
                <span style={{marginLeft:'auto', fontSize:'11px', opacity:0.4, alignSelf:'center'}}>POV • {feeling}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments - Voice */}
      {activePost && (
        <div style={{position:'fixed', inset:0, background:'#08080A', zIndex:60, display:'flex', flexDirection:'column', maxWidth:'520px', margin:'0 auto'}}>
          <div style={{padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between'}}><span onClick={()=>setActivePost(null)} style={{cursor:'pointer'}}>‹ back</span><span style={{fontSize:'11px', letterSpacing:'2px'}}>REPLIES</span><span></span></div>
          <div style={{flex:1, overflowY:'auto', padding:'16px'}}>
            <div style={{background:feelingStyle(activePost.feeling).bg, border:`1px solid ${feelingStyle(activePost.feeling).border}`, borderRadius:'18px', padding:'14px', marginBottom:'16px'}}><b style={{fontSize:'13px'}}>{activePost.name}</b><p style={{margin:'6px 0 0'}}>{activePost.text}</p></div>
            {activePost.commentList.map(c=>(
              <div key={c.id} style={{padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', display:'flex', gap:'10px'}}>
                <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px'}}>{c.name[0]}</div>
                <div>{c.text && <p style={{margin:0, fontSize:'14px'}}>{c.text}</p>}{c.audio && <audio src={c.audio} controls style={{marginTop:'6px', height:'30px', width:'200px'}} />}</div>
              </div>
            ))}
          </div>
          <div style={{padding:'12px 16px', borderTop:'1px solid rgba(255,255,255,0.06), background:'rgba(255,255,255,0.02)'}}>
            {commentAudio && <div style={{marginBottom:'8px', display:'flex', gap:'8px'}}><audio src={commentAudio} controls style={{flex:1, height:'30px'}} /><span onClick={()=>setCommentAudio('')} style={{cursor:'pointer'}}>✕</span></div>}
            <div style={{display:'flex', gap:'8px', alignItems:'center'}}><input value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Reply with feeling..." style={{flex:1, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', padding:'12px 16px', color:'white', outline:'none'}} />{!isCommentRec ? <span onClick={()=>startVoice(true)} style={{width:'40px', height:'40px', borderRadius:'50%', background:'white', color:'black', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>◍</span> : <span onClick={stopVoice} style={{padding:'8px 12px', borderRadius:'20px', background:'red', fontSize:'12px'}}>{cRecTime}s</span>}<span onClick={addComment} style={{background:'white', color:'black', padding:'10px 14px', borderRadius:'20px', fontWeight:'700', cursor:'pointer'}}>↗</span></div>
          </div>
        </div>
      )}

      <div onClick={()=>setShowComposer(true)} style={{position:'fixed', bottom:'20px', right:'20px', width:'52px', height:'52px', background:'white', color:'black', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', fontWeight:'700', cursor:'pointer', boxShadow:'0 8px 24px rgba(0,0,0,0.4)'}}>+</div>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
    </div>
  )
                            }
