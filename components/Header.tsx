"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { WHATSAPP_DISPLAY } from "../src/lib/products";

const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-luxe-black/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 h-[64px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-luxe-gold flex items-center justify-center font-serif font-bold text-luxe-black text-[18px]">T</div>
          <div className="leading-none">
            <p className="font-serif font-bold text-[17px]">Thrifty <span className="text-luxe-gold">Luxe</span></p>
            <p className="text-[9px] tracking-[0.2em] text-white/50 uppercase">My Crib • Your Wardrobe</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`text-[14px] font-medium ${pathname === l.href ? "text-luxe-gold" : "text-white/70 hover:text-white"}`}>
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/shop" className="hidden sm:flex w-10 h-10 rounded-full bg-white/5 items-center justify-center hover:bg-white/10">
            <Search size={18} />
          </Link>
          <a href={`https://wa.me/2347054802289?text=Hi%20Thrifty%20Luxe!`} target="_blank" rel="noopener noreferrer" className="hidden md:block bg-luxe-gold text-luxe-black text-[13px] font-bold px-4 py-2.5 rounded-full">
            Order Now
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 px-5 py-4 bg-luxe-black">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`block py-3 text-[15px] font-medium border-b border-white/5 last:border-0 ${pathname === l.href ? "text-luxe-gold" : "text-white/80"}`}>
              {l.name}
            </Link>
          ))}
          <div className="pt-3">
            <p className="text-[12px] text-white/50">WhatsApp: {WHATSAPP_DISPLAY}</p>
            <a href="https://wa.me/2347054802289?text=Hi%20Thrifty%20Luxe!%20I%20want%20to%20order" target="_blank" rel="noopener noreferrer" className="btn-gold block text-center mt-3">Order on WhatsApp</a>
          </div>
        </div>
      )}
    </header>
  );
}
