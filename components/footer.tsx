import Link from "next/link";
import { MapPin, Truck, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxe-coal border-t border-luxe-gold/20 mt-10">
      <div className="max-w-7xl mx-auto px-5 py-10 grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div>
          <p className="font-serif text-[20px] font-bold">
            THRIFTY <span className="text-gold-gradient">LUXE</span>
          </p>
          <p className="text-[11px] tracking-[0.2em] text-luxe-gold/80 uppercase mt-1">
            My Crib Your Wardrobe
          </p>
          <p className="text-[13px] text-white/60 mt-4 leading-relaxed">
            Curated thrifted luxury. Quality pieces, affordable prices, premium style.
          </p>
        </div>

        {/* Shop */}
        <div>
          <p className="font-semibold text-luxe-gold mb-3">Shop</p>
          <div className="flex flex-col gap-2 text-[14px] text-white/70">
            <Link href="/shop">Shop All</Link>
            <Link href="/shop?cat=new">New Arrivals</Link>
            <Link href="/shop?cat=best">Best Sellers</Link>
            <Link href="/collections">Collections</Link>
          </div>
        </div>

        {/* Help */}
        <div>
          <p className="font-semibold text-luxe-gold mb-3">Help</p>
          <div className="flex flex-col gap-2 text-[14px] text-white/70">
            <Link href="/about">About Us</Link>
            <Link href="/shop">How To Order</Link>
            <Link href="/shop">Delivery Info</Link>
            <Link href="/shop">Returns</Link>
          </div>
        </div>

        {/* Location + Delivery */}
        <div>
          <p className="font-semibold text-luxe-gold mb-3">Find Us</p>
          <div className="flex gap-2 text-[13px] text-white/70">
            <MapPin size={16} className="text-luxe-gold shrink-0 mt-0.5" />
            <p>Based at FUNAAB,<br />Abeokuta, Ogun State</p>
          </div>
          <div className="flex gap-2 text-[13px] text-white/70 mt-3">
            <Truck size={16} className="text-luxe-gold shrink-0 mt-0.5" />
            <p>Delivery Nationwide<br />Delivery fee applies</p>
          </div>
          <div className="flex gap-3 mt-4">
            <a href="https://instagram.com/thriftyluxe" target="_blank" className="w-9 h-9 rounded-full border border-luxe-gold/30 flex items-center justify-center text-luxe-gold">
              <Instagram size={17} />
            </a>
            <a href="https://wa.me/234XXXXXXXXXX" target="_blank" className="w-9 h-9 rounded-full border border-luxe-gold/30 flex items-center justify-center text-luxe-gold">
              <MessageCircle size={17} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-[12px] text-white/40 px-4">
        © 2026 Thrifty Luxe • My Crib Your Wardrobe • Made with love in Abeokuta
      </div>
    </footer>
  );
      }
