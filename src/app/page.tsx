'use client'
import React from 'react'

const CHATS = [
  {id:1, name:'Lola', avatar:'L', last:'You: Soft! I felt am 💛', time:'11:42 AM', unread:2, online:true},
  {id:2, name:'Emeka Business', badge:'⚓', last:'VOW: I go pay 20k tomorrow', time:'10:15 AM', unread:0, isBusiness:true},
  {id:3, name:'Yaba Drop', badge:'📍', last:'Someone dropped gist near you', time:'9:03 AM', unread:0, isDrop:true},
  {id:4, name:'Mum', avatar:'M', last:'You don chop?', time:'8:30 AM', unread:1, online:true},
  {id:5, name:'Lagos Runs', avatar:'LR', last:'Package don land', time:'Yesterday', unread:0},
]

export default function Home() {
  const [ghost, setGhost] = React.useState(false)
  const [filter, setFilter] = React.useState('All')
  const [search, setSearch] = React.useState('')
  const [activeChat, setActiveChat] = React.useState<any>(null)
  const [msg, setMsg] = React.useState('')
  const [messages, setMessages] = React.useState<any[]>([])

  const filtered = CHATS.filter(c => {
    const f = filter==='All' ? true : filter==='Unread' ? c.unread>0 : filter==='Business' ? (c as any).isBusiness : filter==='LUMEN' ? (c as any).isDrop : true
    return f && c.name.toLowerCase().includes(search.toLowerCase())
  })

  const send = () => {
    if (!msg) return
    setMessages([...messages, {from:'me', text:msg, chat:activeChat.name}])
    setMsg('')
    setTimeout(()=> setMessages(m=>[...m, {from:'them', text:'Soft! I felt am 💛', chat:activeChat.name}]), 800)
  }

  if (activeChat) {
    return (
      <div style={{background:'#E5DDD5', minHeight:'100vh', display:'flex', flexDirection:'column', fontFamily:'-apple-system, system-ui, sans-serif'}}>
        {/* iMessage Header */}
        <div style={{background:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', padding:'10px 16px', display:'flex', alignItems:'center', gap:'12px', borderBottom:'1px solid #E5E5EA', position:'sticky', top:0, zIndex:10}}>
          <span onClick={()=>setActiveChat(null)} style={{color:'#007AFF', fontSize:'17px', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px'}}>‹ <span style={{fontSize:'17px'}}>Chats</span></span>
          <div style={{margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{width:'32px', height:'32px', borderRadius:'50%', background:'#D4AF37', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'700', fontSize:'13px'}}>{activeChat.name[0]}</div>
            <p style={{margin:'2px 0 0', fontWeight:'600', fontSize:'13px', color:'#000'}}>{activeChat.name}</p>
          </div>
          <span style={{color:'#007AFF', fontSize:'20px'}}>ⓘ</span>
        </div>

        <div style={{flex:1, padding:'16px', backgroundImage:`url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")`, backgroundSize:'400px'}}>
          <div style={{background:'white', borderRadius:'8px', padding:'6px 12px', fontSize:'11px', color:'#8E8E93', textAlign:'center', width:'fit-content', margin:'0 auto', boxShadow:'0 1px 0.5px rgba(0,0,0,0.13)'}}>⚓ Sealed • Today • Location stamped</div>
          {messages.filter(m=>m.chat===activeChat.name).map((m,i)=>(
            <div key={i} style={{marginTop:'8px', display:'flex', justifyContent: m.from==='me' ? 'flex-end' : 'flex-start'}}>
              <div style={{
                background: m.from==='me' ? '#DCF8C6' : 'white',
                padding:'8px 12px',
                borderRadius: m.from==='me' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                maxWidth:'72%',
                fontSize:'15px',
                color:'#000',
                boxShadow:'0 1px 0.5px rgba(0,0,0,0.13)',
                lineHeight:'1.3'
              }}>{m.text}</div>
            </div>
          ))}
        </div>

        {/* WhatsApp Input */}
        <div style={{background:'#F0F0F0', padding:'8px 10px', display:'flex', gap:'8px', alignItems:'flex-end'}}>
          <div style={{background:'white', borderRadius:'20px', flex:1, display:'flex', alignItems:'center', padding:'6px 12px', minHeight:'36px', boxShadow:'0 1px 1px rgba(0,0,0,0.08)'}}>
            <span style={{fontSize:'22px', opacity:0.4, marginRight:'8px'}}>☺</span>
            <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Message" style={{flex:1, border:'none', outline:'none', fontSize:'16px', background:'transparent'}} />
            <span style={{fontSize:'20px', opacity:0.4, marginLeft:'8px'}}>📎</span>
          </div>
          <div onClick={send} style={{background:'#25D366', width:'42px', height:'42px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'white', fontSize:'20px'}}>➤</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{background:'#FFFFFF', minHeight:'100vh', color:'#000', fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif'}}>
      {/* WhatsApp Top */}
      <div style={{background:'#FFFFFF', padding:'12px 16px 8px', position:'sticky', top:0, zIndex:10, borderBottom:'1px solid #F0F0F0'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h1 style={{margin:0, fontSize:'28px', fontWeight:'800', letterSpacing:'-0.5px'}}>ZAMIQ</h1>
          <div style={{display:'flex', gap:'18px', color:'#54656F', fontSize:'22px'}}>
            <span>📷</span>
            <span>⋮</span>
          </div>
        </div>

        {/* iMessage Search - Light Gray */}
        <div style={{marginTop:'12px', background:'#F0F2F5', borderRadius:'12px', padding:'9px 12px', display:'flex', gap:'8px', alignItems:'center'}}>
          <span style={{color:'#667781', fontSize:'15px'}}>⌕</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search or start new chat" style={{background:'transparent', border:'none', outline:'none', flex:1, fontSize:'15px', color:'#000'}} />
        </div>

        {/* Gold Number Card - Light Version */}
        <div style={{marginTop:'12px', background:'linear-gradient(135deg, #FFF9E6 0%, #FFFBF0 100%)', border:'1px solid #F2E6B8', borderRadius:'14px', padding:'10px 14px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <p style={{margin:0, fontSize:'10px', color:'#8A7A3D', fontWeight:'600', letterSpacing:'0.5px'}}>YOUR ZAMIQ NUMBER</p>
            <p style={{margin:'2px 0 0', fontWeight:'700', fontSize:'14px', color:'#111B21'}}>+1 (800) 736-8298</p>
          </div>
          <div onClick={()=>setGhost(!ghost)} style={{background: ghost ? '#111B21' : '#D4AF37', color:'white', padding:'6px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', cursor:'pointer'}}>
            {ghost ? '👻 Ghost' : '👁️ Visible'}
          </div>
        </div>

        {/* Filters - WhatsApp style pills */}
        <div style={{display:'flex', gap:'8px', marginTop:'12px', overflowX:'auto', paddingBottom:'2px'}}>
          {['All','Unread','Business','LUMEN'].map(f=>(
            <span key={f} onClick={()=>setFilter(f)} style={{
              background: filter===f ? '#E7FCE3' : '#F0F2F5',
              color: filter===f ? '#008069' : '#54656F',
              padding:'7px 12px',
              borderRadius:'18px',
              fontSize:'13px',
              fontWeight: filter===f ? '600' : '500',
              cursor:'pointer',
              whiteSpace:'nowrap',
              border: filter===f ? '1px solid #D1F4CC' : '1px solid transparent'
            }}>{f}</span>
          ))}
        </div>
      </div>

      {/* Chats - iMessage/WhatsApp clean */}
      <div>
        {filtered.map(c=>(
          <div key={c.id} onClick={()=>setActiveChat(c)} style={{padding:'12px 16px', display:'flex', gap:'12px', cursor:'pointer', borderBottom:'1px solid #F5F6F6', background:'white'}}>
            <div style={{position:'relative'}}>
              <div style={{width:'50px', height:'50px', borderRadius:'50%', background: (c as any).isBusiness ? '#111B21' : (c as any).isDrop ? '#FFE6E6' : '#E9EDEF', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', color: (c as any).isBusiness ? '#D4AF37' : '#54656F', fontSize:'16px'}}>{(c as any).avatar || c.name[0]}</div>
              {(c as any).online && <div style={{position:'absolute', bottom:'0', right:'0', width:'12px', height:'12px', background:'#25D366', borderRadius:'50%', border:'2px solid white'}}></div>}
            </div>
            <div style={{flex:1, minWidth:0, display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <p style={{margin:0, fontWeight:'600', fontSize:'16px', color:'#111B21', display:'flex', gap:'6px'}}>{c.name} {(c as any).badge && <span>{(c as any).badge}</span>}</p>
                <p style={{margin:0, fontSize:'12px', color: c.unread ? '#25D366' : '#667781', fontWeight: c.unread ? '600' : '400'}}>{c.time}</p>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'3px'}}>
                <p style={{margin:0, fontSize:'14px', color:'#667781', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'220px'}}>{(c as any).isBusiness ? '⚓ ' : ''}{c.last}</p>
                {c.unread>0 && <div style={{background:'#25D366', color:'white', minWidth:'20px', height:'20px', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', padding:'0 5px'}}>{c.unread}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* iOS Bottom Tab - Light */}
      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'rgba(255,255,255,0.94)', backdropFilter:'blur(20px)', borderTop:'1px solid #E5E5EA', padding:'6px 0 calc(6px + env(safe-area-inset-bottom))', display:'flex', justifyContent:'space-around'}}>
        {[
          {l:'LUMEN', i:'⭐', path:'/lumen'},
          {l:'ANCHOR', i:'⚓', path:'/anchor'},
          {l:'Chats', i:'💬', path:'/', active:true, count:3},
          {l:'AURA', i:'🎙️', path:'/aura'},
          {l:'DROP', i:'📍', path:'/drop'},
        ].map(n=>(
          <a key={n.l} href={n.path} style={{textDecoration:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:'2px'}}>
            <div style={{position:'relative', fontSize:'24px', opacity: (n as any).active ? 1 : 0.6}}>{n.i} {(n as any).count && <span style={{position:'absolute', top:'-4px', right:'-8px', background:'#FF3B30', color:'white', fontSize:'10px', fontWeight:'700', minWidth:'18px', height:'18px', borderRadius:'9px', display:'flex', alignItems:'center', justifyContent:'center', padding:'0 4px'}}>{(n as any).count}</span>}</div>
            <span style={{fontSize:'10px', fontWeight: (n as any).active ? '600' : '400', color: (n as any).active ? '#007AFF' : '#8E8E93'}}>{n.l}</span>
          </a>
        ))}
      </div>
      <div style={{height:'80px'}}></div>
    </div>
  )
              }
