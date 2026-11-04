export default function Aura() {
  return (
    <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:'16px'}}>
      <h2 style={{color:'#D4AF37', margin:'0 0 20px 0'}}>🎙️ AURA - Voice Mood</h2>
      
      <div style={{background:'#112240', padding:'20px', borderRadius:'16px', textAlign:'center'}}>
        <div style={{width:'80px', height:'80px', background:'#D4AF37', borderRadius:'50%', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px'}}>🎤</div>
        <p style={{margin:'12px 0 0 0', fontWeight:'bold'}}>Your Aura is: Soft</p>
        <p style={{margin:'4px 0 0 0', opacity:0.6, fontSize:'13px'}}>Expires in 18h 42m</p>
        
        <div style={{marginTop:'16px', background:'#0A1931', padding:'12px', borderRadius:'20px', display:'flex', alignItems:'center', gap:'12px'}}>
          <span>▶️</span>
          <div style={{flex:1, height:'4px', background:'#D4AF37', borderRadius:'2px'}}></div>
          <span style={{fontSize:'12px'}}>0:08</span>
        </div>
        
        <p style={{marginTop:'12px', fontStyle:'italic', opacity:0.8}}>"I dey open, but soft soft... no stress today"</p>
      </div>

      <div style={{marginTop:'20px', display:'flex', gap:'8px'}}>
        <span style={{background:'#D4AF37', color:'#0A1931', padding:'8px 14px', borderRadius:'20px', fontSize:'13px', fontWeight:'bold'}}>Soft</span>
        <span style={{background:'#112240', padding:'8px 14px', borderRadius:'20px', fontSize:'13px'}}>Focus</span>
        <span style={{background:'#112240', padding:'8px 14px', borderRadius:'20px', fontSize:'13px'}}>Busy</span>
        <span style={{background:'#112240', padding:'8px 14px', borderRadius:'20px', fontSize:'13px'}}>Open</span>
      </div>

      <div style={{marginTop:'20px', background:'#D4AF37', color:'#0A1931', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold'}}>🎙️ Record New Aura</div>

      <div style={{marginTop:'20px'}}>
        <a href="/" style={{color:'white', opacity:0.6, textDecoration:'none'}}>← Chats</a>
      </div>
    </div>
  )
}
