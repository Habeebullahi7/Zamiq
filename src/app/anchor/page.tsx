'use client'
import React from 'react'
export default function Anchor(){
  const [bank,setBank]=React.useState('Not set'); const [acct,setAcct]=React.useState(''); const [paid,setPaid]=React.useState(false);
  React.useEffect(()=>{setBank(localStorage.getItem('zamiq_bank')||'Not set'); setAcct(localStorage.getItem('zamiq_acct')||'')},[])
  return(
    <div style={{background:'#F0F2F5', minHeight:'100vh', fontFamily:'-apple-system, sans-serif'}}>
      <div style={{background:'white', padding:'12px 16px', display:'flex', alignItems:'center', gap:'12px', borderBottom:'1px solid #E5E5EA'}}>
        <a href="/" style={{color:'#007AFF', textDecoration:'none', fontSize:'17px'}}>‹ Chats</a>
        <h2 style={{margin:'0 auto', fontSize:'17px', fontWeight:'600'}}>⚓ Anchor</h2>
        <span style={{width:'60px'}}></span>
      </div>
      <div style={{padding:'16px'}}>
        <div style={{background:'white', borderRadius:'16px', padding:'20px', boxShadow:'0 1px 2px rgba(0,0,0,0.08)'}}>
          <div style={{display:'flex', gap:'6px', marginBottom:'14px'}}>
            <span style={{background:'#E7FCE3', color:'#008069', fontSize:'11px', fontWeight:'600', padding:'4px 8px', borderRadius:'6px'}}>SEALED • CANNOT DELETE</span>
          </div>
          <p style={{margin:0, fontSize:'18px', fontWeight:'600', lineHeight:'1.4', color:'#111B21'}}>"I, Emeka, go pay 20k tomorrow by 5pm for Yaba"</p>
          <p style={{margin:'10px 0 0', fontSize:'13px', color:'#667781'}}>📍 Yaba, Lagos • 6:02 PM • +1 (800) 736-8298</p>
          <div style={{marginTop:'16px', background:'#F7F8FA', borderRadius:'12px', padding:'12px'}}>
            <p style={{margin:0, fontSize:'11px', color:'#667781', fontWeight:'500'}}>PAYOUT TO</p>
            <p style={{margin:'4px 0 0', fontWeight:'600', color:'#111B21'}}>{bank} {acct && `• ${acct}`}</p>
          </div>
          <div onClick={()=>setPaid(true)} style={{marginTop:'16px', background: paid ? '#25D366' : '#111B21', color:'white', padding:'14px', borderRadius:'12px', textAlign:'center', fontWeight:'600', cursor:'pointer'}}>
            {paid ? '✅ Paid - 20,000 NGN Sealed' : 'Pay with Paystack - 20,000 NGN'}
          </div>
        </div>
      </div>
    </div>
  )
}
