export default function Home() {
  return (
    <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:'16px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <h1 style={{color:'#D4AF37', fontSize:'32px', fontWeight:'900', margin:0}}>ZAMIQ</h1>
        <div style={{display:'flex', gap:'12px'}}>
          <span>🔍</span><span>⋮</span>
        </div>
      </div>

      <div style={{background:'#112240', padding:'12px', borderRadius:'12px', marginBottom:'16px'}}>
        <p style={{margin:0, opacity:0.6, fontSize:'12px'}}>Your ZAMIQ Number</p>
        <p style={{margin:'4px 0 0 0', color:'#D4AF37', fontWeight:'bold'}}>+1 (800) 736-8298</p>
        <div style={{marginTop:'8px', background:'white', color:'black', display:'inline-block', padding:'2px 8px', borderRadius:'6px', fontSize:'12px'}}>👻 OFF</div>
      </div>

      <div style={{display:'flex', gap:'8px', marginBottom:'20px'}}>
        <span style={{background:'#D4AF37', color:'#0A1931', padding:'6px 12px', borderRadius:'20px', fontSize:'13px', fontWeight:'bold'}}>All</span>
        <span style={{background:'#112240', padding:'6px 12px', borderRadius:'20px', fontSize:'13px'}}>Unread</span>
        <span style={{background:'#112240', padding:'6px 12px', borderRadius:'20px', fontSize:'13px'}}>Business</span>
        <span style={{background:'#112240', padding:'6px 12px', borderRadius:'20px', fontSize:'13px'}}>LUMEN</span>
      </div>

      <div style={{background:'#112240', padding:'14px', borderRadius:'12px', marginBottom:'10px', display:'flex', justifyContent:'space-between'}}>
        <div>
          <p style={{margin:0, fontWeight:'bold'}}>Lola</p>
          <p style={{margin:'4px 0 0 0', opacity:0.7, fontSize:'14px'}}>You: Soft! I felt am</p>
        </div>
        <div style={{textAlign:'right'}}>
          <p style={{margin:0, fontSize:'12px', opacity:0.6}}>11:42 AM</p>
          <p style={{margin:'4px 0 0 0', background:'#D4AF37', color:'#0A1931', borderRadius:'50%', width:'20px', height:'20px', textAlign:'center', fontSize:'12px', lineHeight:'20px', float:'right'}}>2</p>
        </div>
      </div>

      <div style={{background:'#112240', padding:'14px', borderRadius:'12px', marginBottom:'10px', borderLeft:'3px solid #D4AF37'}}>
        <div>
          <p style={{margin:0, fontWeight:'bold'}}>Emeka Business ⚓</p>
          <p style={{margin:'4px 0 0 0', opacity:0.7, fontSize:'14px'}}>⚓ VOW: I go pay 20k tomorrow</p>
        </div>
        <p style={{margin:'6px 0 0 0', fontSize:'12px', opacity:0.6}}>10:15 AM</p>
      </div>

      <div style={{background:'#112240', padding:'14px', borderRadius:'12px', marginBottom:'10px', borderLeft:'3px solid #ff4d4d'}}>
        <div>
          <p style={{margin:0, fontWeight:'bold'}}>Yaba Drop 📍</p>
          <p style={{margin:'4px 0 0 0', opacity:0.7, fontSize:'14px'}}>Someone dropped gist near you</p>
        </div>
        <p style={{margin:'6px 0 0 0', fontSize:'12px', opacity:0.6}}>9:03 AM</p>
      </div>

      <div style={{marginTop:'20px', textAlign:'center'}}>
        <p style={{color:'#D4AF37', fontSize:'13px'}}>+ LUMEN + DROP + ANCHOR</p>
      </div>
    </div>
  )
}
