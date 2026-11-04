'use client'
import React from 'react'

export default function Settings() {
  const [bank, setBank] = React.useState('')
  const [acct, setAcct] = React.useState('')
  const [key, setKey] = React.useState('')
  const [saved, setSaved] = React.useState(false)

  const save = () => {
    localStorage.setItem('zamiq_bank', bank)
    localStorage.setItem('zamiq_acct', acct)
    localStorage.setItem('zamiq_key', key)
    setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  return (
    <div style={{background:'#0A1931', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:'16px'}}>
      <h2 style={{color:'#D4AF37'}}>⚙️ Business Paystack Setup</h2>
      
      <div style={{background:'#112240', padding:'16px', borderRadius:'12px', marginTop:'16px'}}>
        <p style={{fontSize:'13px', opacity:0.7}}>How Anchor money go work:</p>
        <p style={{fontSize:'13px', marginTop:'8px'}}>Customer pay 20k → Enter ZAMIQ Paystack → You settle Emeka (minus 5% fee). Simple escrow.</p>
      </div>

      <div style={{marginTop:'20px'}}>
        <p style={{fontSize:'14px'}}>Bank Name</p>
        <input value={bank} onChange={e=>setBank(e.target.value)} placeholder="e.g. GTBank" style={{width:'100%', padding:'12px', borderRadius:'8px', border:'none', background:'#112240', color:'white', marginTop:'6px'}} />
        
        <p style={{fontSize:'14px', marginTop:'16px'}}>Account Number</p>
        <input value={acct} onChange={e=>setAcct(e.target.value)} placeholder="0123456789" style={{width:'100%', padding:'12px', borderRadius:'8px', border:'none', background:'#112240', color:'white', marginTop:'6px'}} />
        
        <p style={{fontSize:'14px', marginTop:'16px'}}>Paystack Public Key (Optional - if you get your own Paystack)</p>
        <input value={key} onChange={e=>setKey(e.target.value)} placeholder="pk_live_xxx..." style={{width:'100%', padding:'12px', borderRadius:'8px', border:'none', background:'#112240', color:'white', marginTop:'6px'}} />
        <p style={{fontSize:'11px', opacity:0.5, marginTop:'6px'}}>If you no get Paystack, leave am. We go use ZAMIQ Paystack.</p>
      </div>

      <div onClick={save} style={{marginTop:'20px', background:'#D4AF37', color:'#0A1931', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'bold', cursor:'pointer'}}>
        {saved ? '✅ Saved!' : 'Save Bank Details'}
      </div>

      <div style={{marginTop:'20px', background:'#0A1931', border:'1px solid #112240', padding:'12px', borderRadius:'10px'}}>
        <p style={{fontSize:'12px', opacity:0.6}}>Current saved:</p>
        <p style={{fontSize:'13px', color:'#D4AF37'}}>{bank || 'No bank'} - {acct || 'No account'}</p>
      </div>

      <div style={{marginTop:'20px'}}>
        <a href="/anchor" style={{color:'#D4AF37', textDecoration:'none'}}>→ Go test Anchor pay</a>
        <br/><br/>
        <a href="/" style={{color:'white', opacity:0.6, textDecoration:'none'}}>← Chats</a>
      </div>
    </div>
  )
}
