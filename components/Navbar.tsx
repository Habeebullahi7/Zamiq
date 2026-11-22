"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-[#C9A227]/25 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#F5D67B] via-[#C9A227] to-transparent bg-[length:200%_100%] animate-[shine_3s_linear_infinite]" />
      <div className="max-w-7xl mx-auto px-5 h-[76px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Thrifty Luxe" className="w-[52px] h-[52px] rounded-full object-cover border-2 border-[#C9A227]/60 shadow-[0_0_20px_rgba(201,162,39,0.4)]" />
          <span className="leading-none">
            <span className="block font-serif font-bold text-[21px] tracking-wide">
              Thrifty <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5D67B] via-[#C9A227] to-[#F5D67B] bg-[length:200%_auto] animate-[shine_3s_linear_infinite]">Luxe</span>
            </span>
            <span className="block text-[9px] tracking-[0.32em] text-[#C9A227] font-bold mt-1.5">MY CRIB • YOUR WARDROBE</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 text-[14px] text-white/70">
          <Link href="/" className="hover:text-[#F5D67B]">Home</Link>
          <Link href="/shop" className="hover:text-[#F5D67B]">Shop</Link>
          <Link href="/collections" className="hover:text-[#F5D67B]">Collections</Link>
          <Link href="/about" className="hover:text-[#F5D67B]">About</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/shop" className="hidden md:block bg-gradient-to-r from-[#F5D67B] via-[#C9A227] to-[#A8861D] text-black text-[13px] font-bold px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(201,162,39,0.4)]">Shop Now →</Link>
          <button onClick={() => setOpen(!open)} className="md:hidden w-[44px] h-[44px] bg-white/5 border border-[#C9A227]/30 rounded-full flex items-center justify-center">{open ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-5 flex flex-col text-[15px] bg-[#050505] border-t border-white/5">
          <Link href="/" onClick={()=>setOpen(false)} className="py-3.5 border-b border-white/5">Home</Link>
          <Link href="/shop" onClick={()=>setOpen(false)} className="py-3.5 border-b border-white/5">Shop</Link>
          <Link href="/collections" onClick={()=>setOpen(false)} className="py-3.5 border-b border-white/5">Collections</Link>
          <Link href="/about" onClick={()=>setOpen(false)} className="py-3.5">About</Link>
        </div>
      )}
      <style jsx>{`@keyframes shine { to { background-position: 200% center; } }`}</style>
    </header>
  );
          }
