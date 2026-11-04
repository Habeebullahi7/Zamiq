export default function Anchor() {
  return (
    <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:'16px'}}>
      <h2 style={{color:'#D4AF37', margin:'0 0 20px 0'}}>⚓ ANCHOR - Sealed Vow</h2>
      
      <div style={{background:'#112240', padding:'20px', borderRadius:'16px', border:'2px solid #D4AF37'}}>
        <p style={{margin:0, fontSize:'12px', opacity:0.6}}>SEALED • CANNOT DELETE • LOCATION STAMPED</p>
        <p style={{margin:'12px 0', fontSize:'18px', fontWeight:'bold'}}>"I, Emeka, go pay 20k tomorrow by 5pm for Yaba"</p>
        <p style={{margin:0, fontSize:'13px', opacity:0.7}}>📍 Yaba, Lagos • 6:02 PM • +1 (800) 736-8298</p>
        
        <div style={{marginTop:'16px', background:'#D4AF37', color:'#0A1931', padding:'12px', borderRadius:'10px', textAlign:'center', fontWeight:'bold'}}>
          Pay with Paystack - 20,000 NGN
        </div>
        
        <p style={{margin:'12px 0 0 0', fontSize:'11px', opacity:0.5, textAlign:'center'}}>This vow is sealed on blockchain of trust. If broken, aura goes red.</p>
      </div>

      <div style={{marginTop:'20px', background:'#112240', padding:'16px', borderRadius:'12px'}}>
        <p style={{margin:0, fontWeight:'bold'}}>Create New Anchor</p>
        <input placeholder="Wetin you dey vow?" style={{width:'100%', marginTop:'10px', padding:'12px', borderRadius:'8px', border:'none', background:'#0A1931', color:'white'}} />
        <div style={{marginTop:'10px', background:'#D4AF37', color:'#0A1931', padding:'12px', borderRadius:'8px', textAlign:'center', fontWeight:'bold'}}>⚓ Seal This Vow</div>
      </div>

      <div style={{marginTop:'20px'}}>
        <a href="/" style={{color:'white', opacity:0.6, textDecoration:'none'}}>← Chats</a>
      </div>
    </div>
  )
                     }
