'use client'
import { useState } from 'react'

const STORIES = [
  {id:1, name:'Lola', user:'Yaba • 2m away', feeling:'Soft', color:'#FFD6E0', glow:'#FF8FAB', text:'Morning light for Yaba market. Everything soft today.', pov:true, aura:0.92, views:2341, likes:342, comments:[{u:'Emeka', t:'Soft die 🥺'}, {u:'Tolu', t:'Where for Yaba?'}, {u:'You', t:'Felt it 💛'}]},
  {id:2, name:'Emeka', user:'Sabo • 340m', feeling:'Focus', color:'#C4D9FF', glow:'#6FA0FF', text:'5am run. No talk. Just move.', pov:true, aura:0.81, views:1820, likes:120, comments:[{u:'Coach', t:'Keep am up'}, {u:'Lola', t:'Focus!'}]},
  {id:3, name:'Mum', user:'Home • 1.2km', feeling:'Calm', color:'#D6FFD6', glow:'#7CFF7C', text:'Jollof don ready. Come chop.', pov:false, aura:0.95, views:4521, likes:892, comments:[{u:'You', t:'Coming!'}, {u:'Sis', t:'Save my own'}]},
]

export default function Lumen(){
  const [active, setActive] = useState(0)
  const [liked, setLiked] = useState<any>({})
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [stories, setStories] = useState(STORIES)
  const s = stories[active]

  const toggleLike = () => {
    setLiked((l:any)=>({...l, [s.id]:!l[s.id]}))
    setStories(prev=>prev.map(st=> st.id===s.id ? {...st, likes: liked[s.id] ? st.likes-1 : st.likes+1} : st))
  }

  const addComment = () => {
    if(!newComment) return
    setStories(prev=>prev.map(st=> st.id===s.id ? {...st, comments:[...st.comments, {u:'You', t:newComment}]} : st))
    setNewComment('')
  }

  return(
    <div style={{
      minHeight:'100vh', 
      background:`radial-gradient(800px at 50% -20%, ${s.glow}22 0%, transparent 60%), radial-gradient(600px at 90% 80%, ${s.color}18 0%, transparent), #0A0A0B`,
      color:'white', fontFamily:'Inter, system-ui', 
      display:'flex', flexDirection:'column',
      transition:'background 0.8s ease'
    }}>
      
      <div style={{padding:'18px 20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <a href="/" style={{color:'white', textDecoration:'none', fontSize:'14px', opacity:0.6}}>← CHATS</a>
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <div style={{width:'6px', height:'6px', background:s.glow, borderRadius:'50%', boxShadow:`0 0 12px ${s.glow}`}}></div>
          <span style={{fontSize:'11px', letterSpacing:'2.5px', fontWeight:'800'}}>LUMEN</span>
        </div>
        <div style={{fontSize:'11px', opacity:0.5, display:'flex', gap:'12px'}}>
          <span>👁️ {s.views.toLocaleString()}</span>
        </div>
      </div>

      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', padding:'10px 20px'}}>
        
        <div style={{position:'relative'}}>
          <div style={{
            position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
            width:'320px', height:'320px',
            background:`radial-gradient(circle, ${s.glow}30 0%, ${s.color}15 30%, transparent 70%)`,
            filter:'blur(30px)', borderRadius:'50%',
            animation:'breathe 4s ease-in-out infinite'
          }}></div>
          
          <div style={{
            width:'220px', height:'280px',
            background:'rgba(255,255,255,0.04)',
            backdropFilter:'blur(30px)',
            border:`1px solid ${s.color}30`,
            borderRadius:'120px',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            boxShadow:`0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`,
            position:'relative', overflow:'hidden'
          }}>
            <div style={{fontSize:'48px', filter:`drop-shadow(0 0 20px ${s.glow}80)`}}>{s.pov ? '◍' : '◎'}</div>
            <p style={{margin:'12px 0 0', fontSize:'10px', letterSpacing:'3px', opacity:0.5, fontWeight:'700'}}>{s.pov ? 'POV • BACK' : 'SELF • FRONT'}</p>
            <div style={{marginTop:'16px', width:'60px', height:'1px', background:`linear-gradient(90deg, transparent, ${s.glow}, transparent)`}}></div>
            <p style={{margin:'16px 0 0', fontSize:'12px', color:s.color, letterSpacing:'1px', fontWeight:'600'}}>{s.feeling.toUpperCase()}</p>
          </div>
        </div>

        <div style={{marginTop:'24px', textAlign:'center', maxWidth:'280px'}}>
          <p style={{margin:0, fontSize:'18px', fontWeight:'300', lineHeight:'1.4'}}>"{s.text}"</p>
          <div style={{marginTop:'12px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', opacity:0.5}}>
            <span style={{fontSize:'11px'}}>{s.name}</span>
            <span style={{width:'2px', height:'2px', background:'white', borderRadius:'50%'}}></span>
            <span style={{fontSize:'11px'}}>{s.user}</span>
          </div>
        </div>

        {/* Views + Likes + Comments - Row */}
        <div style={{marginTop:'20px', display:'flex', gap:'10px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', padding:'8px 12px', borderRadius:'20px', backdropFilter:'blur(10px)'}}>
            <span style={{fontSize:'12px'}}>👁️</span>
            <span style={{fontSize:'12px', fontWeight:'600'}}>{s.views.toLocaleString()}</span>
            <span style={{fontSize:'10px', opacity:0.5}}>views</span>
          </div>
          
          <div onClick={toggleLike} style={{display:'flex', alignItems:'center', gap:'6px', background: liked[s.id] ? `${s.glow}20` : 'rgba(255,255,255,0.08)', border:`1px solid ${liked[s.id] ? `${s.glow}50` : 'rgba(255,255,255,0.1)'}`, padding:'8px 12px', borderRadius:'20px', cursor:'pointer', transition:'all 0.3s'}}>
            <span style={{fontSize:'14px'}}>{liked[s.id] ? '❤️' : '🤍'}</span>
            <span style={{fontSize:'12px', fontWeight:'600'}}>{s.likes}</span>
          </div>

          <div onClick={()=>setShowComments(!showComments)} style={{display:'flex', alignItems:'center', gap:'6px', background: showComments ? 'white' : 'rgba(255,255,255,0.08)', color: showComments ? 'black' : 'white', border:'1px solid rgba(255,255,255,0.1)', padding:'8px 12px', borderRadius:'20px', cursor:'pointer'}}>
            <span style={{fontSize:'14px'}}>💬</span>
            <span style={{fontSize:'12px', fontWeight:'600'}}>{s.comments.length}</span>
          </div>
        </div>
      </div>

      {/* Comments Sheet - Special */}
      {showComments && (
        <div style={{background:'rgba(18,18,20,0.96)', backdropFilter:'blur(24px)', borderTop:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px 20px 0 0', padding:'16px', maxHeight:'50vh', display:'flex', flexDirection:'column', animation:'slideUp 0.3s ease'}}>
          <div style={{width:'36px', height:'4px', background:'rgba(255,255,255,0.2)', borderRadius:'2px', margin:'0 auto 16px'}}></div>
          
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}>
            <p style={{margin:0, fontWeight:'700', fontSize:'14px'}}>Comments • {s.comments.length} • {s.views} views</p>
            <span onClick={()=>setShowComments(false)} style={{opacity:0.5, cursor:'pointer'}}>✕</span>
          </div>

          <div style={{flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:'12px'}}>
            {s.comments.map((c:any,i:number)=>(
              <div key={i} style={{display:'flex', gap:'10px'}}>
                <div style={{width:'28px', height:'28px', borderRadius:'50%', background: c.u==='You' ? s.glow : 'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', flexShrink:0}}>{c.u[0]}</div>
                <div style={{background:'rgba(255,255,255,0.06)', padding:'8px 12px', borderRadius:'14px 14px 14px 4px', maxWidth:'80%'}}>
                  <p style={{margin:0, fontSize:'12px', fontWeight:'600', opacity:0.8}}>{c.u}</p>
                  <p style={{margin:'2px 0 0', fontSize:'13px'}}>{c.t}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:'12px', display:'flex', gap:'8px', paddingTop:'12px', borderTop:'1px solid rgba(255,255,255,0.06)'}}>
            <input value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="Add feeling..." style={{flex:1, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'20px', padding:'10px 14px', color:'white', outline:'none', fontSize:'14px'}} />
            <div onClick={addComment} style={{background:'white', color:'black', width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontWeight:'700'}}>➤</div>
          </div>
        </div>
      )}

      {!showComments && (
        <div style={{padding:'16px 20px'}}>
          <div style={{display:'flex', justifyContent:'center', gap:'8px', marginBottom:'16px'}}>
            {STORIES.map((_,i)=>(
              <div key={i} onClick={()=>setActive(i)} style={{
                width: i===active ? '24px' : '6px', height:'6px',
                background: i===active ? s.glow : 'rgba(255,255,255,0.2)',
                borderRadius:'3px', cursor:'pointer', transition:'all 0.4s',
                boxShadow: i===active ? `0 0 10px ${s.glow}` : 'none'
              }}></div>
            ))}
          </div>

          <div style={{display:'flex', gap:'10px'}}>
            <div onClick={toggleLike} style={{flex:1, background: liked[s.id] ? s.glow : 'white', color: liked[s.id] ? 'white' : 'black', padding:'14px', borderRadius:'14px', textAlign:'center', fontWeight:'700', fontSize:'14px', cursor:'pointer', transition:'all 0.3s', boxShadow: liked[s.id] ? `0 0 20px ${s.glow}60` : 'none'}}>
              {liked[s.id] ? '❤️ Felt • ' : '🤍 Feel • '}{s.likes}
            </div>
            <div onClick={()=>setShowComments(true)} style={{width:'52px', height:'52px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>💬</div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes breathe {0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.08)}}
        @keyframes slideUp {from{transform:translateY(100%)} to{transform:translateY(0)}}
      `}</style>
    </div>
  )
        }
