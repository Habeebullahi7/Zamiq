import Link from "next/link";
import { MapPin, Phone, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxe-coal border-t border-white/10 mt-0">
      <div className="max-w-7xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-serif font-bold text-[18px]">Thrifty <span className="text-luxe-gold">Luxe</span></p>
          <p className="text-white/50 text-[13px] mt-2 leading-relaxed">My Crib, Your Wardrobe.<br />Handpicked thrift, washed & steamed. Look expensive, pay less.</p>
          <div className="flex gap-2 mt-4">
            <a href="https://instagram.com/thriftyluxe" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[14px]">📸</a>
            <a href="https://tiktok.com/@thriftyluxe" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[14px]">🎵</a>
            <a href="https://wa.me/2347054802289" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[14px]">💬</a>
          </div>
        </div>

        <div>
          <p className="font-semibold text-[14px]">Quick Links</p>
          <div className="flex flex-col gap-2 mt-3 text-[13px] text-white/60">
            <Link href="/shop" className="hover:text-luxe-gold">Shop All</Link>
            <Link href="/collections" className="hover:text-luxe-gold">Collections</Link>
            <Link href="/about" className="hover:text-luxe-gold">About Us</Link>
            <Link href="/shop" className="hover:text-luxe-gold">New Drops</Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-[14px]">Contact & Delivery</p>
          <div className="space-y-2.5 mt-3 text-[13px] text-white/60">
            <p className="flex items-center gap-2"><Phone size={14} className="text-luxe-gold" /> +234 705 480 2289</p>
            <p className="flex items-center gap-2"><MapPin size={14} className="text-luxe-gold" /> FUNAAB, Abeokuta</p>
            <p className="flex items-center gap-2"><Truck size={14} className="text-luxe-gold" /> FUNAAB ₦500 • Abeokuta ₦1,000 • Lagos ₦3,000</p>
            <p className="text-white/40 text-[12px]">Pay on delivery for FUNAAB & Abeokuta</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-center">
        <p className="text-[12px] text-white/40">© 2026 Thrifty Luxe • Made with love in Abeokuta</p>
      </div>
    </footer>
  );
}
