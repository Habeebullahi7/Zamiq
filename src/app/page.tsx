"use client";
import { useState, useEffect } from "react";

function generateZamiqNumber() {
  const s = Math.floor(7000 + Math.random() * 2999);
  return `+1 (800) 736-${s}`;
}

const CHATS = [
  { id: 1, name: "Lola", zamiq: "+1 (800) 736-7123", time: "11:42 AM", msg: "You: Soft! I felt am", unread: 2, online: true },
  { id: 2, name: "Emeka • Business", zamiq: "+1 (800) 736-8193", time: "10:15 AM", msg: "⚓ VOW: I go pay 20k tomorrow", unread: 0, isVow: true },
  { id: 3, name: "Yaba Drop 📍", zamiq: "+1 (800) 736-9001", time: "9:03 AM", msg: "Someone dropped gist near you", unread: 1, isDrop: true },
  { id: 4, name: "Musa", zamiq: "+1 (800) 736-7345", time: "Yesterday", msg: "Voice note • 0:14 • 😊 calm", unread: 0 },
  { id: 5, name: "ZAMIQ Team", zamiq: "+1 (800) 736-0000", time: "Yesterday", msg: "Welcome! Your number is ready", unread: 0, verified: true },
];

export default function ZamiqWhatsApp() {
  const [myNum, setMyNum] = useState("");
  const [active, setActive] = useState<any>(null);
  const [text, setText] = useState("");
  const [ghost, setGhost] = useState(false);
  const [showPause, setShowPause] = useState(false);

  useEffect(() => {
    let n = localStorage.getItem("zamiq_number");
    if (!n) { n = generateZamiqNumber(); localStorage.setItem("zamiq_number", n); }
    setMyNum(n);
  }, []);

  const send = () => {
    if (!text.trim()) return;
    if (text.length > 25) { setShowPause(true); setTimeout(()=>setShowPause(false), 4000); return; }
    alert(`Sent • 60 sec regret window`);
    setText("");
  };

  if (active) {
    return (
      <div className="min-h-screen bg-[#0A1931] flex flex-col max-w-[430px] mx-auto">
        {/* WhatsApp Header - small avatar */}
        <div className="h-[56px] bg-[#0A1931] border-b border-white/10 flex items-center px-3 gap-3">
          <button onClick={()=>setActive(null)} className="text-white text-[20px]">←</button>
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold text-[13px]">{active.name[0]}</div>
          <div className="flex-1">
            <p className="text-white font-bold text-[14px] leading-[1.1]">{active.name} {active.verified && <span className="text-[#D4AF37]">✓</span>}</p>
            <p className="text-white/50 text-[11px]">{ghost ? "Ghost • hidden" : "Online • " + active.zamiq}</p>
          </div>
          <div className="text-white/60 text-[18px]">⋮</div>
        </div>

        <div className="flex-1 bg-[#0A1931] p-3 space-y-2">
          <div className="text-center"><span className="bg-white/10 text-white/40 text-[10px] px-2 py-1 rounded-full">TODAY • ANCHOR sealed • No edit</span></div>
          <div className="flex justify-start"><div className="bg-white text-black rounded-[12px] rounded-tl-[3px] px-3 py-2 text-[13px] max-w-[75%] shadow">How far, you don see my LUMEN?</div></div>
          <div className="flex justify-end"><div className="bg-[#D4AF37] text-black rounded-[12px] rounded-tr-[3px] px-3 py-2 text-[13px] max-w-[75%] shadow">Soft! I felt am ❤️</div></div>
        </div>

        {showPause && <div className="mx-3 mb-2 bg-[#D4AF37] text-black rounded-xl p-3 text-center text-[12px]"><b>Breathe 5 sec, you sure?</b> - Pause before send</div>}

        <div className="h-[56px] bg-[#0A1931] border-t border-white/10 flex items-center px-2 gap-2">
          <div className="text-white/40 text-[22px]">😊</div>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Soro something..." className="flex-1 bg-white/10 rounded-full px-4 py-2.5 text-[13px] text-white outline-none" />
          <button onClick={send} className="w-9 h-9 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">↑</button>
        </div>
        <div className="text-center text-[9px] text-white/20 py-1">Regret 60s • Respect Mode • Twin: GIST | BUSINESS</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1931] flex flex-col max-w-[430px] mx-auto text-white">
      {/* WhatsApp Top Bar */}
      <div className="h-[60px] px-4 flex items-center justify-between">
        <h1 className="text-[20px] font-black tracking-widest">ZAMIQ</h1>
        <div className="flex items-center gap-4 text-white/60">
          <span className="text-[18px]">🔍</span>
          <span className="text-[18px]">⋮</span>
        </div>
      </div>

      {/* Your Number Bar - small like WhatsApp status */}
      <div className="px-4 pb-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-[#D4AF37] flex items-center justify-center text-[12px] font-bold">ME</div>
        <div className="flex-1">
          <p className="text-[12px] text-white/50">Your ZAMIQ Number</p>
          <p className="text-[13px] font-mono font-bold text-[#D4AF37]">{myNum} <span className="text-[10px] text-white/30">• Ghost {ghost?"ON":"OFF"}</span></p>
        </div>
        <button onClick={()=>setGhost(!ghost)} className={`text-[10px] px-2 py-1 rounded-full ${ghost?"bg-[#D4AF37] text-black":"bg-white/10"}`}>👻</button>
      </div>

      <div className="flex gap-1 px-4 py-2">
        {["All","Unread","Business","Drops"].map((f,i)=>(
          <span key={f} className={`text-[11px] px-3 py-1 rounded-full border ${i===0?"bg-white text-black border-white":"border-white/20 text-white/50"}`}>{f}</span>
        ))}
      </div>

      {/* Chat List - WhatsApp style, small avatar, last message + time */}
      <div className="flex-1 bg-[#0A1931]">
        {CHATS.map(c=>(
          <div key={c.id} onClick={()=>setActive(c)} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 border-b border-white/[0.06] cursor-pointer">
            {/* Small Avatar like WhatsApp - 40px */}
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-[13px] shrink-0">
              {c.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-bold text-[14px] truncate flex items-center gap-1">
                  {c.name} {c.isVow && <span className="text-[#D4AF37] text-[12px]">⚓</span>} {c.verified && <span className="text-[#D4AF37]">✓</span>}
                </p>
                <p className="text-[11px] text-white/40 shrink-0">{c.time}</p>
              </div>
              <div className="flex justify-between items-center mt-[2px]">
                <p className="text-[12px] text-white/50 truncate pr-2">{c.msg}</p>
                {c.unread>0 && <span className="bg-[#D4AF37] text-black text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">{c.unread}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav - WhatsApp style */}
      <div className="h-[64px] bg-[#0A1931] border-t border-white/10 flex justify-around items-center px-2">
        <div className="flex flex-col items-center"><span className="text-[18px]">💬</span><span className="text-[10px] font-bold">Chats</span></div>
        <div className="flex flex-col items-center opacity-40"><span className="text-[18px]">👁️</span><span className="text-[10px]">LUMEN</span></div>
        <div className="flex flex-col items-center opacity-40"><span className="text-[18px]">🌙</span><span className="text-[10px]">AURA</span></div>
        <div className="flex flex-col items-center opacity-40"><span className="text-[18px]">🔒</span><span className="text-[10px]">VAULT</span></div>
      </div>
    </div>
  );
      }
