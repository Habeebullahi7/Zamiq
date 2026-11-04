'use client'
import { useState } from 'react'
const VIDS = [
  {user:'@yaba_girl', name:'Lola', feel:'Soft', txt:'Morning for Yaba market 🌅 soft vibes', likes:'12.4K', com:'342', pov:true},
  {user:'@emeka', name:'Emeka', feel:'Focus', txt:'5am delivery run ⚓ locked in', likes:'8.1K', com:'120', pov:false},
  {user:'@mum', name:'Mum', feel:'Calm', txt:'Jollof ready 😊', likes:'23K', com:'892', pov:false},
]
export default function Lumen(){
  const [a,setA]=useState(0)
  const [liked,setLiked]=useState<any>({})
  const v=VIDS[a]
  const next=()=>setA(x=>(x+1)%VIDS.length)
  const prev=()=>setA(x=>x===0?VIDS.length-1:x-1)
  return(
    <div style={{background:'black', height:'100vh', width:'100vw', position:'relative', overflow:'hidden', color:'white', fontFamily:'system-ui'}}>
      <div style={{position:'absolute', inset:0, background:v.pov?'#0a0a0a':'#111', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{textAlign:'center'}}><div style={{fontSize:80}}>{v.pov?'📹':'🤳'}</div><p style={{opacity:0.5, fontSize:14, letterSpacing:2, marginTop:12}}>{v.pov?'POV BACK':'FRONT'} • {v.feel}</p></div>
        <div style={{position:'absolute', top:0, left:0, right:0, height:120, background:'linear-gradient(180deg, rgba(0,0,0,0.5), transparent)'}}></div>
        <div style={{position:'absolute', bottom:0, left:0, right:0, height:300, background:'linear-gradient(0deg, rgba(0,0,0,0.7), transparent)'}}></div>
      </div>
      <div style={{position:'absolute', top:0, left:0, right:0, padding:'12px 16px', display:'flex', justifyContent:'space-between', zIndex:10}}>
        <a href="/" style={{color:'white', textDecoration:'none', fontWeight:600}}>‹ Chats</a>
        <div style={{display:'flex', gap:20, fontWeight:600, fontSize:15}}><span style={{opacity:0.6}}>Following</span><span style={{borderBottom:'2px solid white', paddingBottom:4}}>For You</span></div>
        <span>🔍</span>
      </div>
      <div style={{position:'absolute', right:12, bottom:120, display:'flex', flexDirection:'column', gap:22, alignItems:'center', zIndex:10}}>
        <div style={{textAlign:'center'}}><div style={{width:48, height:48, borderRadius:'50%', background:'#222', border:'2px solid white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700}}>{v.name[0]}</div><div style={{width:20, height:20, background:'#FF2D55', borderRadius:'50%', marginTop:-10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12}}>+</div></div>
        <div onClick={()=>setLiked((l:any)=>({...l, [v.user]:!l[v.user]}))} style={{textAlign:'center'}}><div style={{width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28}}>{liked[v.user]?'❤️':'🤍'}</div><span style={{fontSize:12, fontWeight:600}}>{v.likes}</span></div>
        <div style={{textAlign:'center'}}><div style={{width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26}}>💬</div><span style={{fontSize:12, fontWeight:600}}>{v.com}</span></div>
        <div style={{textAlign:'center'}}><div style={{width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26}}>↗️</div><span style={{fontSize:12, fontWeight:600}}>Share</span></div>
      </div>
      <div style={{position:'absolute', bottom:20, left:12, right:80, zIndex:10}}><p style={{margin:0, fontWeight:700}}>{v.user}</p><p style={{margin:'6px 0 0', fontSize:14, lineHeight:1.3}}>{v.txt}</p><div style={{marginTop:8, display:'flex', gap:6}}><span style={{background:'rgba(255,255,255,0.15)', padding:'4px 8px', borderRadius:4, fontSize:12}}>#{v.feel}</span><span style={{background:'rgba(255,255,255,0.15)', padding:'4px 8px', borderRadius:4, fontSize:12}}>{v.pov?'#POV':'#Selfie'}</span></div></div>
      <div onClick={prev} style={{position:'absolute', top:80, left:0, right:70, height:'40%', zIndex:5}}></div>
      <div onClick={next} style={{position:'absolute', bottom:100, left:0, right:70, height:'40%', zIndex:5}}></div>
      <div style={{position:'absolute', bottom:0, left:0, right:0, height:2, background:'rgba(255,255,255,0.2)'}}><div style={{width:'42%', height:'100%', background:'white'}}></div></div>
      <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'rgba(0,0,0,0.6)', padding:'8px 12px', borderRadius:20, fontSize:11, opacity:0.5, pointerEvents:'none'}}>Tap to swipe • {a+1}/{VIDS.length}</div>
    </div>
  )
}
