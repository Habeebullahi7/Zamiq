'use client'
import React from 'react'

export default function Anchor() {
  const [bank, setBank] = React.useState('')
  const [acct, setAcct] = React.useState('')
  const [paid, setPaid] = React.useState(false)

  React.useEffect(()=>{
    setBank(localStorage.getItem('zamiq_bank') || 'Not set')
    setAcct(localStorage.getItem('zamiq_acct') || '')
  }, [])

  const pay = () => {
    // Mock pay - later connect real Paystack
    setPaid(true)
  }

  return (
    <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:'16px'}}>
      <h2 style={{color:'#D4AF37', margin:'0 0 20px 0'}}>⚓ ANCHOR - Sealed Vow</h2>
      
      <div style={{background:'#112240', padding:'16px', borderRadius:'12px', borderLeft:'4px solid #D4AF37'}}>
        <p style={{margin:0, fontSize:'12px', opacity:0.6}}>SEALED • CANNOT DELETE • {new Date().toLocaleDateString()}</p>
        <p style={{margin:'12px 0 0 0', fontSize:'18px', fontWeight:'bold'}}>Emeka: "I go pay 20k tomorrow"</p>
        <p style={{margin:'8px 0 0 0', fontSize:'13px', opacity:0.7}}>Witness: Lola • Yaba, Lagos</p>
        <p style={{margin:'8px 0 0 0', fontSize:'12px', color:'#D4AF37'}}>📍 Stamped: 6.5244, 3.3792</p>
      </div>

      <div style={{marginTop:'16px', background:'#0A1931', border:'1px solid #D4AF37', padding:'14px', borderRadius:'12px'}}>
        <p style={{margin:0, fontSize:'12px', opacity:0.6}}>PAYOUT ACCOUNT (User Account Details)</p>
        <p style={{margin:'6px 0 0 0', color:'#D4AF37', fontWeight:'bold', fontSize:'15px'}}>
          {bank} {acct ? `- ${acct}` : ''} 
        </p>
        <p style={{margin:'6px 0 0 0', fontSize:'11px', opacity:0.5}}>This na the account wey 20k go enter. User add am for Settings.</p>
        <a href="/settings" style={{fontSize:'12px', color:'#D4AF37', display:'block', marginTop:'8px'}}>⚙️ Change account →</a>
      </div>

      {!paid ? (
        <div onClick={pay} style={{marginTop:'20px', background:'#D4AF37', color:'#0A1931', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold', cursor:'pointer'}}>
          Pay with Paystack - 20,000 NGN
        </div>
      ) : (
        <div style={{marginTop:'20px', background:'#00c853', color:'white', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold'}}>
          ✅ Paid! 20k go settle to {bank} {acct}
        </div>
      )}

      <p style={{marginTop:'12px', fontSize:'11px', opacity:0.5, textAlign:'center'}}>For real app: Paystack go collect with ZAMIQ account, then auto-transfer to this user account (minus 5% fee)</p>

      <div style={{marginTop:'20px'}}>
        <a href="/" style={{color:'white', opacity:0.6, textDecoration:'none'}}>← Chats</a>
      </div>
    </div>
  )
}
