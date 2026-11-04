'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase, genZamiqNumber, isSupabaseConfigured, EMOJIS, formatTime, genId } from '@/lib/supabase'

type Msg = { id:string; fromMe:boolean; type:'text'|'image'|'voice'|'file'|'location'|'contact'; text:string; time:string; status:'sent'|'delivered'|'read'; replyTo?:string }
type Chat = { id:number; name:string; number:string; avatar:string; last:string; time:string; unread:number; isGroup:boolean; isMuted:boolean; isPinned:boolean; msgs:Msg[]; online?:string }
type Status = { id:number; name:string; time:string; seen:boolean }
type Call = { id:number; name:string; time:string; type:'voice'|'video'; incoming:boolean; missed:boolean }

export default function WhatsAppClone(){
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [tab, setTab] = useState<'chats'|'updates'|'communities'|'calls'>('chats')
  const [activeId, setActiveId] = useState<number|null>(null)
  const [input, setInput] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [search, setSearch] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [showAttach, setShowAttach] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  
  const [chats, setChats] = useState<Chat[]>([
    {id:1, name:'Lola Yaba', number: genZamiqNumber(), avatar:'L', last:'Welcome to Zamiq! Voice + Video + Status dey', time:'now', unread:2, isGroup:false, isMuted:false, isPinned:true, online:'online', msgs:[{id:genId(), fromMe:false, type:'text', text:'Welcome to Zamiq! Full WhatsApp clone don ready 🎉', time:'now', status:'read'}, {id:genId(), fromMe:false, type:'text', text:'You get voice note, video call, status, group - everything', time:'now', status:'read'}]},
    {id:2, name:'Family Group ❤️', number:'Group • 5 members', avatar:'👨‍👩‍👧‍👦', last:'Dad: See you Sunday', time:'09:12', unread:5, isGroup:true, isMuted:false, isPinned:true, msgs:[{id:genId(), fromMe:false, type:'text', text:'Dad: See you Sunday', time:'09:12', status:'read'}]},
    {id:3, name:'Emeka US', number: genZamiqNumber(), avatar:'E', last:'📹 Video call', time:'Yesterday', unread:0, isGroup:false, isMuted:false, isPinned:false, online:'last seen today 8:22 PM', msgs:[]},
    {id:4, name:'Zamiq Support', number:'+1 (800) 736-0000', avatar:'Z', last:'Gmail → +1 ✓ Supabase ✓', time:'Yesterday', unread:0, isGroup:false, isMuted:true, isPinned:false, msgs:[]},
  ])
  const [statuses] = useState<Status[]>([
    {id:1, name:'My status', time:'Tap to add status', seen:false},
    {id:2, name:'Lola Yaba', time:'10 minutes ago', seen:false},
    {id:3, name:'Emeka US', time:'Today, 8:30 AM', seen:true},
  ])
  const [calls, setCalls] = useState<Call[]>([
    {id:1, name:'Lola Yaba', time:'Today, 8:22 AM', type:'video', incoming:true, missed:false},
    {id:2, name:'Emeka US', time:'Yesterday, 9:15 PM', type:'voice', incoming:false, missed:true},
  ])

  useEffect(()=>{
    const s = localStorage.getItem('zamiq_user')
    if(s) setUser(JSON.parse(s))
  },[])

  const login = async () => {
    if(!email.includes('@')) return alert('Enter Gmail')
    if(!name) return alert('Enter name')
    const myNum = genZamiqNumber()
    const u = { email, name, zamiq_number: myNum, is_real:false, avatar: name[0].toUpperCase() }
    if(isSupabaseConfigured()){ try{ const {data}=await supabase.from('users').select('*').eq('email',email).single(); if(data){ setUser(data); localStorage.setItem('zamiq_user', JSON.stringify(data)); return } await supabase.from('users').insert({email,name,zamiq_number:myNum,is_real:false}) }catch{} }
    setUser(u); localStorage.setItem('zamiq_user', JSON.stringify(u))
  }

  const send = (type:Msg['type']='text', customText?:string) => {
    const text = customText || input.trim()
    if(!text && type==='text') return
    if(activeId===null) return
    const newMsg:Msg = { id:genId(), fromMe:true, type, text, time:formatTime(), status:'sent' }
    setChats(prev => prev.map(ch => ch.id===activeId ? {...ch, last: type==='image'?'📷 Photo': type==='voice'?'🎤 Voice message': type==='file'?'📎 File': text, msgs:[...ch.msgs, newMsg]} : ch))
    setInput(''); setShowEmoji(false); setShowAttach(false)
    setTimeout(()=> setChats(p=>p.map(ch=> ch.id===activeId ? {...ch, msgs: ch.msgs.map(m=> m.id===newMsg.id ? {...m, status:'read' as const} : m)} : ch)), 1000)
    if(type==='text'){ setTimeout(()=>{ const reply:Msg={id:genId(), fromMe:false, type:'text', text:['Seen ✓','LOL 😂','We go talk later','Your +1 number sweet o!','Zamiq to the world!'][Math.floor(Math.random()*5)], time:formatTime(), status:'read'}; setChats(p=>p.map(ch=> ch.id===activeId ? {...ch, msgs:[...ch.msgs, reply]} : ch)) }, 1200) }
  }

  const active = chats.find(c=>c.id===activeId)
  const filtered = chats.filter(c=> c.name.toLowerCase().includes(search.toLowerCase()))

  if(!user){
    return(
      <div style={{minHeight:'100vh', background:'#111B21', color:'white', display:'flex', justifyContent:'center', fontFamily:'system-ui'}}>
        <div style={{width:'100%', maxWidth:'400px', padding:'24px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <div style={{background:'#00A884', width:'56px', height:'56px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'900', fontSize:'24px', marginBottom:'20px'}}>Z</div>
          <h1 style={{fontSize:'28px', fontWeight:'800'}}>Welcome to Zamiq</h1>
          <p style={{opacity:0.6, fontSize:'13px', margin:'12px 0 20px'}}>Full WhatsApp clone:<br/>Chats • Groups • Status • Calls • Voice • Video • Files • +1 number</p>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'10px', width:'100%'}} />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@gmail.com" style={{background:'#202C33', border:'none', borderRadius:'10px', padding:'14px', color:'white', outline:'none', marginBottom:'16px', width:'100%'}} />
          <button onClick={login} style={{background:'#00A884', border:'none', borderRadius:'10px', padding:'14px', fontWeight:'700', color:'white', width:'100%', cursor:'pointer'}}>Continue → Get +1 Number</button>
        </div>
      </div>
    )
  }

  if(showSettings){
    return(
      <div style={{minHeight:'100vh', background:'#111B21', color:'white', maxWidth:'500px', margin:'0 auto', fontFamily:'system-ui'}}>
        <div style={{background:'#202C33', padding:'12px', display:'flex', gap:'12px', alignItems:'center'}}><span onClick={()=>setShowSettings(false)} style={{cursor:'pointer'}}>←</span><span style={{fontWeight:'600'}}>Settings</span></div>
        <div style={{padding:'16px', display:'flex', gap:'16px', alignItems:'center'}}><div style={{width:'64px', height:'64px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', fontWeight:'700'}}>{user.avatar}</div><div><div style={{fontWeight:'700', fontSize:'18px'}}>{user.name}</div><div style={{opacity:0.6, fontSize:'13px'}}>{user.zamiq_number}</div><div style={{opacity:0.5, fontSize:'11px'}}>{user.email}</div></div></div>
        <div style={{background:'#202C33', marginTop:'16px'}}>{[['Privacy','End-to-end encrypted'],['Chats','Theme, wallpaper, history'],['Notifications','Message, group & call tones'],['Storage','Manage storage'],['Invite friend','Share Zamiq'],['Logout',`Logout ${user.zamiq_number}`]].map(([t,d])=><div key={t} onClick={()=>{ if(t==='Logout'){ localStorage.clear(); setUser(null); setShowSettings(false)} }} style={{padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', cursor:'pointer'}}><div style={{fontSize:'14px'}}>{t}</div><div style={{fontSize:'11px', opacity:0.5}}>{d}</div></div>)}</div>
      </div>
    )
  }

  if(active){
    return(
      <div style={{height:'100vh', background:'#111B21', display:'flex', flexDirection:'column', maxWidth:'500px', margin:'0 auto', fontFamily:'system-ui', position:'relative'}}>
        <div style={{background:'#202C33', padding:'10px 12px', display:'flex', gap:'12px', alignItems:'center', color:'white'}}>
          <span onClick={()=>setActiveId(null)} style={{cursor:'pointer', fontSize:'20px'}}>←</span>
          <div style={{width:'36px', height:'36px', borderRadius:'50%', background: active.isGroup ? '#FF6B6B' : '#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{active.avatar}</div>
          <div style={{flex:1}}><div style={{fontWeight:'600', fontSize:'14px'}}>{active.name} {active.isPinned && '📌'} {active.isMuted && '🔇'}</div><div style={{fontSize:'11px', opacity:0.6}}>{active.online || active.number}</div></div>
          <span onClick={()=>{ const c:Call={id:Date.now(), name:active.name, time:'now', type:'video', incoming:false, missed:false}; setCalls([c, ...calls]); alert(`Video call to ${active.name} - ${active.number}\nFrom your number ${user.zamiq_number}\n(WebRTC coming)`)} } style={{cursor:'pointer'}}>📹</span>
          <span onClick={()=>{ const c:Call={id:Date.now(), name:active.name, time:'now', type:'voice', incoming:false, missed:false}; setCalls([c, ...calls]); alert(`Voice call to ${active.name}`)} } style={{cursor:'pointer'}}>📞</span>
          <span>⋮</span>
        </div>

        <div style={{flex:1, background:'#0B141A', padding:'12px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'6px', backgroundImage:`url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")`}}>
          <div style={{alignSelf:'center', background:'#182229', padding:'6px 10px', borderRadius:'8px', fontSize:'10px', opacity:0.6, margin:'10px 0', color:'#8696A0'}}>🔒 Messages are end-to-end encrypted • {user.zamiq_number} → {active.number}</div>
          {active.msgs.map(m=><div key={m.id} style={{alignSelf: m.fromMe ? 'flex-end' : 'flex-start', background: m.fromMe ? '#005C4B' : '#202C33', color:'white', padding:'8px 10px', borderRadius: m.fromMe ? '12px 0 12px 12px' : '0 12px 12px 12px', maxWidth:'75%', fontSize:'13.5px', position:'relative'}}>
            {m.type==='image' && <div style={{width:'200px', height:'120px', background:'#2A3942', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}>📷 Photo</div>}
            {m.type==='voice' && <div style={{display:'flex', alignItems:'center', gap:'8px'}}><span style={{background:'#00A884', borderRadius:'50%', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center'}}>▶️</span><div><div style={{width:'100px', height:'3px', background:'#00A884', borderRadius:'2px'}}></div><div style={{fontSize:'10px', opacity:0.5}}>0:12</div></div></div>}
            <div>{m.text}</div>
            <div style={{display:'flex', justifyContent:'flex-end', gap:'4px', marginTop:'2px'}}><span style={{fontSize:'10px', opacity:0.5}}>{m.time}</span>{m.fromMe && <span style={{fontSize:'10px', color: m.status==='read' ? '#53BDEB' : '#8696A0'}}>{m.status==='read' ? '✓✓' : m.status==='delivered' ? '✓✓' : '✓'}</span>}</div>
          </div>)}
        </div>

        {showAttach && <div style={{background:'#202C33', padding:'12px', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>{[{e:'📷',t:'Camera',a:()=>send('image','📷 Photo')},{e:'🖼️',t:'Gallery',a:()=>fileRef.current?.click()},{e:'📄',t:'Document',a:()=>send('file','📎 document.pdf')},{e:'📍',t:'Location',a:()=>send('location','📍 My location')},{e:'👤',t:'Contact',a:()=>send('contact','👤 Contact: Lola')},{e:'🎵',t:'Audio',a:()=>send('voice','🎤 Voice note')}].map(x=><div key={x.t} onClick={x.a} style={{textAlign:'center', cursor:'pointer'}}><div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 4px', fontSize:'20px'}}>{x.e}</div><div style={{fontSize:'10px'}}>{x.t}</div></div>)}</div>}

        {showEmoji && <div style={{background:'#202C33', padding:'8px', display:'flex', gap:'8px', flexWrap:'wrap'}}>{EMOJIS.map(e=><span key={e} onClick={()=>setInput(input+e)} style={{fontSize:'22px', cursor:'pointer'}}>{e}</span>)}</div>}

        <div style={{background:'#202C33', padding:'8px', display:'flex', gap:'8px', alignItems:'center'}}>
          <span onClick={()=>setShowEmoji(!showEmoji)} style={{cursor:'pointer', fontSize:'22px'}}>😊</span>
          <span onClick={()=>setShowAttach(!showAttach)} style={{cursor:'pointer', fontSize:'22px'}}>📎</span>
          <input ref={fileRef} type="file" hidden onChange={()=>send('image','📷 Gallery photo')} />
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} placeholder="Type a message" style={{flex:1, background:'#2A3942', border:'none', borderRadius:'20px', padding:'10px 14px', color:'white', outline:'none'}} />
          {input ? <button onClick={()=>send()} style={{width:'36px', height:'36px', background:'#00A884', borderRadius:'50%', border:'none', color:'white', cursor:'pointer'}}>➤</button> : <button onMouseDown={()=>setIsRecording(true)} onMouseUp={()=>{setIsRecording(false); send('voice','🎤 Voice message 0:05')}} style={{width:'36px', height:'36px', background: isRecording ? '#F15C6D' : '#00A884', borderRadius:'50%', border:'none', color:'white', cursor:'pointer'}}>{isRecording ? '●' : '🎤'}</button>}
        </div>
        {isRecording && <div style={{background:'#F15C6D', color:'white', textAlign:'center', padding:'6px', fontSize:'12px'}}>● Recording... slide to cancel</div>}
      </div>
    )
  }

  return(
    <div style={{minHeight:'100vh', background:'#111B21', color:'white', fontFamily:'system-ui', maxWidth:'500px', margin:'0 auto', display:'flex', flexDirection:'column'}}>
      <div style={{background:'#202C33', padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{fontWeight:'800', fontSize:'19px'}}>Zamiq</span>
        <div style={{display:'flex', gap:'16px', alignItems:'center'}}><span style={{fontSize:'18px'}}>📷</span><span onClick={()=>setSearch(search ? '' : ' ')} style={{fontSize:'18px', cursor:'pointer'}}>🔍</span><span onClick={()=>setShowSettings(true)} style={{cursor:'pointer'}}>⋮</span></div>
      </div>

      <div style={{margin:'12px', background:'linear-gradient(135deg,#182229,#202C33)', border:'1px solid #00A884', borderRadius:'12px', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div><div style={{fontSize:'10px', opacity:0.6, letterSpacing:'1px'}}>YOUR ZAMIQ +1 NUMBER</div><div style={{fontWeight:'800', fontSize:'16px', marginTop:'2px'}}>{user.zamiq_number}</div><div style={{fontSize:'10px', opacity:0.5}}>{user.name} • {user.email} • Encrypted</div></div>
        <button onClick={()=>alert('Upgrade to REAL US number - $4.99 - Twilio integration coming')} style={{background:'#00A884', color:'white', border:'none', borderRadius:'8px', padding:'8px 12px', fontSize:'11px', fontWeight:'700', cursor:'pointer'}}>Upgrade $4.99</button>
      </div>

      {search!=='' && <div style={{padding:'8px 12px', background:'#111B21'}}><input autoFocus value={search===' ' ? '' : search} onChange={e=>setSearch(e.target.value)} placeholder="Search or start new chat" style={{width:'100%', background:'#202C33', border:'none', borderRadius:'8px', padding:'10px', color:'white', outline:'none'}} /></div>}

      <div style={{display:'flex', background:'#202C33'}}>{[
        {id:'chats', l:`Chats (${chats.length})`},
        {id:'updates', l:'Updates'},
        {id:'communities', l:'Communities'},
        {id:'calls', l:`Calls (${calls.length})`}
      ].map(t=><div key={t.id} onClick={()=>setTab(t.id as any)} style={{flex:1, padding:'12px 2px', textAlign:'center', fontSize:'11px', fontWeight:'700', textTransform:'uppercase', borderBottom: tab===t.id ? '3px solid #00A884' : '3px solid transparent', opacity: tab===t.id ? 1 : 0.5, cursor:'pointer'}}>{t.l}</div>)}</div>

      <div style={{flex:1, overflowY:'auto'}}>
        {tab==='chats' && <>
          <div style={{padding:'8px 16px', display:'flex', gap:'8px', overflowX:'auto'}}>
            <div style={{textAlign:'center', minWidth:'60px'}}><div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto'}}>+</div><div style={{fontSize:'10px', marginTop:'4px'}}>New group</div></div>
            <div style={{textAlign:'center', minWidth:'60px'}}><div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#2A3942', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto'}}>👥</div><div style={{fontSize:'10px', marginTop:'4px'}}>New contact</div></div>
          </div>
          {filtered.map(c=><div key={c.id} onClick={()=>setActiveId(c.id)} style={{display:'flex', gap:'12px', padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', cursor:'pointer', background: c.isPinned ? 'rgba(0,168,132,0.05)' : 'transparent'}}>
            <div style={{width:'48px', height:'48px', borderRadius:'50%', background: c.isGroup ? '#FF6B6B' : '#00A884', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', fontSize:'18px', position:'relative'}}>{c.avatar}{c.isPinned && <span style={{position:'absolute', bottom:'-2px', right:'-2px', fontSize:'10px'}}>📌</span>}</div>
            <div style={{flex:1, overflow:'hidden'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontWeight:c.unread?'700':'500', fontSize:'15px'}}>{c.name}</span><span style={{fontSize:'11px', opacity:0.4, color: c.unread ? '#00A884' : undefined}}>{c.time}</span></div><div style={{fontSize:'11px', opacity:0.5}}>{c.number} {c.isMuted && '🔇'}</div><div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><span style={{fontSize:'13px', opacity: c.unread?1:0.6, fontWeight:c.unread?'600':'400', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'200px'}}>{c.last}</span>{c.unread>0 && <span style={{background:'#00A884', color:'white', fontSize:'11px', padding:'2px 6px', borderRadius:'10px', minWidth:'20px', textAlign:'center'}}>{c.unread}</span>}</div></div>
          </div>)}
        </>}

        {tab==='updates' && <div>
          <div style={{padding:'16px', fontWeight:'600'}}>Status</div>
          {statuses.map(s=><div key={s.id} style={{display:'flex', gap:'12px', padding:'12px 16px', cursor:'pointer'}}><div style={{width:'48px', height:'48px', borderRadius:'50%', border: s.seen ? '2px solid #2A3942' : '2px solid #00A884', display:'flex', alignItems:'center', justifyContent:'center'}}>{s.name[0]}</div><div><div style={{fontSize:'14px', fontWeight:'500'}}>{s.name}</div><div style={{fontSize:'11px', opacity:0.5}}>{s.time}</div></div></div>)}
          <div style={{padding:'16px', fontWeight:'600', marginTop:'12px', borderTop:'1px solid rgba(255,255,255,0.05)'}}>Channels <span style={{opacity:0.5, fontWeight:'400'}}>Find channels</span></div>
          <div style={{padding:'12px 16px', display:'flex', gap:'12px'}}><div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#FFB400', display:'flex', alignItems:'center', justifyContent:'center'}}>📢</div><div><div style={{fontSize:'14px'}}>Zamiq Updates</div><div style={{fontSize:'11px', opacity:0.5}}>Official channel • +1 numbers</div></div><button style={{marginLeft:'auto', background:'#00A884', border:'none', borderRadius:'20px', padding:'6px 12px', color:'white', fontSize:'12px'}}>Follow</button></div>
        </div>}

        {tab==='communities' && <div style={{padding:'24px', textAlign:'center'}}><div style={{fontSize:'48px', marginBottom:'12px'}}>👥</div><div style={{fontWeight:'700', fontSize:'18px'}}>Introducing communities</div><div style={{opacity:0.5, fontSize:'13px', marginTop:'8px', lineHeight:'1.4'}}>Easily organize your related groups and bring them together in one place. Create community with your +1 number.</div><button style={{marginTop:'16px', background:'#00A884', border:'none', borderRadius:'20px', padding:'10px 20px', color:'white', fontWeight:'600'}}>Start your community</button></div>}

        {tab==='calls' && <div>
          <div style={{padding:'12px 16px', display:'flex', gap:'12px', alignItems:'center', cursor:'pointer'}}><div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#00A884', display:'flex', alignItems:'center', justifyContent:'center'}}>🔗</div><div><div style={{color:'#00A884', fontWeight:'600'}}>Create call link</div><div style={{fontSize:'11px', opacity:0.5}}>Share a link for your Zamiq call</div></div></div>
          {calls.map(c=><div key={c.id} style={{display:'flex', gap:'12px', padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)'}}><div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#2A3942', display:'flex', alignItems:'center', justifyContent:'center'}}>{c.type==='video' ? '📹' : '📞'}</div><div style={{flex:1}}><div style={{fontSize:'14px'}}>{c.name} {c.missed && <span style={{color:'#F15C6D'}}>• Missed</span>}</div><div style={{fontSize:'11px', opacity:0.5}}>{c.incoming ? '↙' : '↗'} {c.time} • {user.zamiq_number}</div></div><span style={{color:'#00A884', cursor:'pointer'}}>{c.type==='video' ? '📹' : '📞'}</span></div>)}
        </div>}
      </div>

      <div style={{position:'fixed', bottom:'20px', right:'20px', maxWidth:'500px'}}>
        <button onClick={()=>alert('New chat with +1 number: pick contact')} style={{width:'56px', height:'56px', borderRadius:'16px', background:'#00A884', border:'none', color:'white', fontSize:'24px', cursor:'pointer', boxShadow:'0 4px 12px rgba(0,0,0,0.4)'}}>{tab==='calls' ? '📞' : tab==='updates' ? '📷' : '💬'}</button>
      </div>
    </div>
  )
     }
