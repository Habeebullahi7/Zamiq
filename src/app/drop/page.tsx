export default function Drop() {
  return (
    <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:'16px'}}>
      <h2 style={{color:'#D4AF37', margin:'0 0 20px 0'}}>📍 DROP - Near You</h2>
      
      <div style={{background:'#112240', height:'300px', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
        <p style={{opacity:0.5}}>Map of Yaba - 3 drops near you</p>
        <div style={{position:'absolute', top:'40%', left:'40%', background:'#D4AF37', width:'12px', height:'12px', borderRadius:'50%'}}></div>
        <div style={{position:'absolute', top:'50%', left:'60%', background:'#ff4d4d', width:'12px', height:'12px', borderRadius:'50%'}}></div>
      </div>

      <div style={{marginTop:'16px', background:'#112240', padding:'14px', borderRadius:'12px', borderLeft:'3px solid #D4AF37'}}>
        <p style={{margin:0, fontWeight:'bold'}}>Anonymous • 120m away • 2h ago</p>
        <p style={{margin:'6px 0 0 0'}}>"Jollof rice full for that buka for Yaba, 1k only"</p>
      </div>

      <div style={{marginTop:'12px', background:'#D4AF37', color:'#0A1931', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold'}}>＋ Drop Gist Here (24h)</div>

      <div style={{marginTop:'20px'}}>
        <a href="/" style={{color:'white', opacity:0.6, textDecoration:'none'}}>← Chats</a>
      </div>
    </div>
  )
}
