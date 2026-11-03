"use client";
import { useState, useEffect } from "react";
import { genZamiqNumber } from "@/lib/supabase";

const CHATS = [
  { id: 1, name: "Lola", zamiq: "+1 (800) 736-7123", time: "11:42 AM", msg: "You: Soft! I felt am", unread: 2 },
  { id: 2, name: "Emeka Business", zamiq: "+1 (800) 736-8193", time: "10:15 AM", msg: "⚓ VOW: I go pay 20k tomorrow", unread: 0, isVow: true },
  { id: 3, name: "Yaba Drop 📍", zamiq: "+1 (800) 736-9001", time: "9:03 AM", msg: "Someone dropped gist near you", unread: 1 },
  { id: 4, name: "Musa", zamiq: "+1 (800) 736-7345", time: "Yesterday", msg: "Voice note • 0:14 • 😊 calm", unread: 0 },
];

export default function Zamiq() {
  const [myNum, setMyNum] = useState("");
  const [active, setActive] = useState<any>(null);
  const [text, setText] = useState("");
  const [ghost, setGhost] = useState(false);
  const [pause, setPause] = useState(false);
  const [tab, setTab] = useState("GIST");

  useEffect(() => {
    let n = localStorage.getItem("zamiq_number");
    if (!n) { n = genZamiqNumber(); localStorage.setItem("zamiq_number", n); }
    setMyNum(n || "");
  }, []);

  const send = () => {
    if (!text.trim()) return;
    if (text.length > 25) { setPause(true); setTimeout(()=>setPause(false),4000); return; }
    setText("");
  };

  if (active) {
    return (
      <div className="min-h-screen bg-[#0A1931] flex flex-col max-w-[430px] mx-auto">
        <div className="h-[56px] flex items-center px-3 gap-3 border-b border-white/10">
          <button onClick={()=>setActive(null)} className="text-white text-xl">←</button>
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold text-[13px]">{active.name[0]}</div>
          <div className="flex-1">
            <p className="text-white font-bold text-[14px]">{active.name} {active.isVow && <span className="text-[#D4AF37]">⚓</span>}</p>
            <p className="text-white/50 text-[11px]">{ghost ? "Ghost hidden" : active.zamiq}</p>
          </div>
          <span className="text-white/60">⋮</span>
        </div>
        <div className="flex-1 p-3 space-y-2">
          <div className="text-center"><span className="bg-white/10 text-white/40 text-[10px] px-2 py-1 rounded-full">TODAY • Sealed • No edit</span></div>
          <div className="bg-white text-black rounded-[12px] rounded-tl-[3px] px-3 py-2 text-[13px] max-w-[75%]">How far, you don see my LUMEN?</div>
          <div className="bg-[#D4AF37] text-black rounded-[12px] rounded-tr-[3px] px-3 py-2 text-[13px] max-w-[75%] ml-auto">Soft! I felt am ❤️</div>
          {tab==="BUSINESS" && <div className="bg-white/10 border border-[#D4AF37]/30 rounded-[16px] p-3 text-[13px]"><p className="text-[#D4AF37] font-bold text-[11px]">⚓ ANCHOR SEALED</p>I VOW to pay 20k tomorrow - Yaba 📍</div>}
        </div>
        {pause && <div className="mx-3 mb-2 bg-[#D4AF37] text-black rounded-xl p-3 text-center text-[12px]"><b>Breathe 5 sec, you sure?</b></div>}
        <div className="h-[56px] border-t border-white/10 flex items-center px-2 gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Soro something..." className="flex-1 bg-white/10 rounded-full px-4 py-2.5 text-[13px] text-white outline-none" />
          <button onClick={send} className="w-9 h-9 bg-[#D4AF37] rounded-full text-black font-bold">↑</button>
        </div>
        <div className="flex justify-center gap-2 p-2">
          <button onClick={()=>setTab("GIST")} className={`text-[10px] px-3 py-1 rounded-full ${tab==="GIST"?"bg-white text-black":"bg-white/10 text-white/50"}`}>GIST</button>
          <button onClick={()=>setTab("BUSINESS")} className={`text-[10px] px-3 py-1 rounded-full ${tab==="BUSINESS"?"bg-[#D4AF37] text-black":"bg-white/10 text-white/50"}`}>BUSINESS • VOW</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1931] max-w-[430px] mx-auto text-white flex flex-col">
      <div className="h-[60px] px-4 flex items-center justify-between">
        <h1 className="text-[20px] font-black tracking-widest">ZAMIQ</h1>
        <div className="flex gap-4 text-white/60"><span>🔍</span><span>⋮</span></div>
      </div>
      <div className="px-4 pb-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-[#D4AF37] flex items-center justify-center text-[11px] font-bold">ME</div>
        <div className="flex-1">
          <p className="text-[11px] text-white/50">Your ZAMIQ Number</p>
          <p className="text-[13px] font-mono font-bold text-[#D4AF37]">{myNum}</p>
        </div>
        <button onClick={()=>setGhost(!ghost)} className={`text-[10px] px-2 py-1 rounded-full ${ghost?"bg-[#D4AF37] text-black":"bg-white/10"}`}>👻 {ghost?"ON":"OFF"}</button>
      </div>
      <div className="flex gap-1 px-4 py-2">
        {["All","Unread","Business"].map((f,i)=><span key={f} className={`text-[11px] px-3 py-1 rounded-full border ${i===0?"bg-white text-black":"border-white/20 text-white/50"}`}>{f}</span>)}
      </div>
      <div className="flex-1">
        {CHATS.map(c=>(
          <div key={c.id} onClick={()=>setActive(c)} className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] hover:bg-white/5">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-[13px]">{c.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between"><p className="font-bold text-[14px] truncate">{c.name} {c.isVow && "⚓"}</p><p className="text-[11px] text-white/40">{c.time}</p></div>
              <div className="flex justify-between"><p className="text-[12px] text-white/50 truncate pr-2">{c.msg}</p>{c.unread>0 && <span className="bg-[#D4AF37] text-black text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">{c.unread}</span>}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[64px] border-t border-white/10 flex justify-around items-center">
        <div className="flex flex-col items-center"><span>💬</span><span className="text-[10px] font-bold">Chats</span></div>
        <div className="opacity-40 flex flex-col items-center"><span>👁️</span><span className="text-[10px]">LUMEN</span></div>
        <div className="opacity-40 flex flex-col items-center"><span>🌙</span><span className="text-[10px]">AURA</span></div>
        <div className="opacity-40 flex flex-col items-center"><span>🔒</span><span className="text-[10px]">VAULT</span></div>
      </div>
    </div>
  );
          }
