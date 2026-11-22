"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-40 bg-luxe-black/95 backdrop-blur border-b border-luxe-gold/20">
      <div className="max-w-7xl mx-auto px-4 h-[68px] flex items-center justify-between">
        {/* Left - Menu button mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-luxe-gold p-2"
          aria-label="Open menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo - Center on mobile, Left on desktop */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-[42px] h-[42px] md:w-[52px] md:h-[52px] rounded-full overflow-hidden border border-luxe-gold/40">
            <Image
              src="/logo.png"
              alt="Thrifty Luxe - My Crib Your Wardrobe"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="leading-none">
            <p className="font-serif text-[18px] md:text-[22px] font-bold tracking-wide">
              THRIFTY <span className="text-gold-gradient">LUXE</span>
            </p>
            <p className="text-[9px] md:text-[10px] tracking-[0.22em] text-luxe-gold/80 uppercase">
              My Crib Your Wardrobe
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium">
          <Link href="/" className="hover:text-luxe-gold">Home</Link>
          <Link href="/shop" className="hover:text-luxe-gold">Shop</Link>
          <Link href="/collections" className="hover:text-luxe-gold">Collections</Link>
          <Link href="/about" className="hover:text-luxe-gold">About</Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-1 md:gap-3">
          <button className="p-2 text-white/80 hover:text-luxe-gold" aria-label="Search">
            <Search size={20} />
          </button>
          <Link href="/cart" className="relative p-2 text-white/80 hover:text-luxe-gold" aria-label="Cart">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-luxe-gold text-luxe-black text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="md:hidden border-t border-luxe-gold/15 bg-luxe-coal px-5 py-4 flex flex-col gap-4 text-[15px]">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setOpen(false)}>Shop All</Link>
          <Link href="/collections" onClick={() => setOpen(false)}>Collections</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <p className="text-[12px] text-luxe-gold/70 pt-2 border-t border-white/10">
            📍 FUNAAB, Abeokuta • Delivery Nationwide
          </p>
        </nav>
      )}
    </header>
  );
}
