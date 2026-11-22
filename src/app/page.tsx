"use client";

import Link from "next/link";
import { Star, Truck, ShieldCheck, ArrowRight, Sparkles, MapPin } from "lucide-react";
import { products, formatNaira, whatsappLink, WHATSAPP_DISPLAY } from "@/lib/products";

export default function Home() {
  const bestSellers = products.slice(0, 4);

  return (
    <div className="bg-luxe-black min-h-screen">
      {/* HERO */}
      <section className="px-5 max-w-7xl mx-auto pt-8 md:pt-14 pb-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-luxe-gold/15 text-luxe-gold text-[11px] font-bold px-3 py-1.5 rounded-full">
              <Sparkles size={12} /> NEW DROP EVERY FRIDAY
            </span>
            <h1 className="text-[38px] md:text-[56px] font-serif font-bold leading-[1.05] mt-4">
              My Crib,<br />
              <span className="text-gold-gradient">Your Wardrobe.</span>
            </h1>
            <p className="text-white/60 text-[15px] leading-relaxed mt-4 max-w-[420px]">
              Handpicked thrift, washed & steamed. Look expensive, pay less.
              From vintage denim to silk dresses — curated for you.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/shop" className="btn-gold">Shop Now →</Link>
              <Link href="/collections" className="btn-gold-outline">View Collections</Link>
            </div>

            <div className="flex items-center gap-4 mt-6 text-[12px] text-white/50">
              <span className="flex items-center gap-1"><Star size={13} className="fill-luxe-gold text-luxe-gold" /> 4.9 • 500+ customers</span>
              <span className="flex items-center gap-1"><MapPin size={13} /> FUNAAB, Abeokuta</span>
            </div>
          </div>

          {/* Hero Card */}
          <div className="relative">
            <div className="bg-luxe-coal border border-luxe-gold/20 rounded-[24px] p-5 rotate-1">
              <div className="aspect-square bg-luxe-charcoal rounded-[18px] flex items-center justify-center text-[80px]">🛍️</div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="font-semibold">This Week's Hottest Pick</p>
                  <p className="text-[12px] text-white/50">Vintage Denim Jacket • M / UK 10</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-luxe-gold text-[18px]">{formatNaira(15000)}</p>
                  <p className="text-[12px] text-white/40 line-through">{formatNaira(25000)}</p>
                </div>
              </div>
              <a
                href={whatsappLink("Hi Thrifty Luxe! I want the Vintage Denim Jacket - ₦15,000")}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center mt-4 bg-[#25D366] text-white font-bold py-3.5 rounded-full text-[14px]"
              >
                Order This on WhatsApp
              </a>
            </div>
            <span className="absolute -top-3 -right-2 bg-luxe-gold text-luxe-black text-[11px] font-bold px-3 py-1.5 rounded-full -rotate-3">-40% OFF</span>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-white/10 bg-luxe-coal">
        <div className="max-w-7xl mx-auto px-5 py-4 grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-1.5"><Truck size={16} className="text-luxe-gold" /><span className="text-[11px] md:text-[13px]">Nationwide Delivery</span></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-1.5"><ShieldCheck size={16} className="text-luxe-gold" /><span className="text-[11px] md:text-[13px]">Quality Checked</span></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-1.5"><span>💰</span><span className="text-[11px] md:text-[13px]">Pay on Delivery*</span></div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-5 max-w-7xl mx-auto py-10">
        <h2 className="text-[22px] md:text-[26px] font-serif font-bold">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-3 mt-5">
          {[
            { name: "Dresses", emoji: "👗", href: "/shop" },
            { name: "Jackets", emoji: "🧥", href: "/shop" },
            { name: "Bags", emoji: "👜", href: "/shop" },
            { name: "Shoes", emoji: "👟", href: "/shop" },
          ].map((c) => (
            <Link key={c.name} href={c.href} className="bg-luxe-coal border border-white/10 rounded-2xl p-4 text-center hover:border-luxe-gold/40 transition">
              <span className="text-[28px] md:text-[32px]">{c.emoji}</span>
              <p className="text-[12px] md:text-[13px] font-medium mt-2">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="px-5 max-w-7xl mx-auto pb-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-[22px] md:text-[26px] font-serif font-bold">Best Sellers</h2>
            <p className="text-white/50 text-[13px] mt-1">Most loved this week</p>
          </div>
          <Link href="/shop" className="flex items-center gap-1 text-luxe-gold text-[13px] font-semibold">View All <ArrowRight size={14} /></Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {bestSellers.map((p) => (
            <div key={p.id} className="product-card">
              <Link href={`/shop/${p.id}`}>
                <div className="relative aspect-square bg-luxe-charcoal flex items-center justify-center">
                  <span className="text-[44px]">🛍️</span>
                  {p.tag && <span className="absolute top-2 left-2 bg-luxe-gold text-luxe-black text-[10px] font-bold px-2 py-1 rounded-full">{p.tag}</span>}
                </div>
              </Link>
              <div className="p-3">
                <Link href={`/shop/${p.id}`}><p className="text-[13px] font-medium line-clamp-2 min-h-[36px] hover:text-luxe-gold">{p.name}</p></Link>
                <p className="text-[11px] text-white/50 mt-1">Size: {p.size}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="font-bold text-luxe-gold">{formatNaira(p.price)}</span>
                  {p.oldPrice && <span className="text-[12px] text-white/40 line-through">{formatNaira(p.oldPrice)}</span>}
                </div>
                <a href={whatsappLink(`Hi Thrifty Luxe! I want to order: ${p.name} - ${formatNaira(p.price)}`)} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center bg-[#25D366] text-white text-[13px] font-semibold py-2.5 rounded-full">
                  Order on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-5 max-w-7xl mx-auto pb-10">
        <div className="bg-luxe-coal border border-luxe-gold/20 rounded-[20px] p-6 md:p-8">
          <h2 className="text-[20px] font-serif font-bold text-center">How to Order in 3 Steps</h2>
          <div className="grid md:grid-cols-3 gap-5 mt-6 text-center">
            <div><div className="w-10 h-10 mx-auto bg-luxe-gold text-luxe-black font-bold rounded-full flex items-center justify-center">1</div><p className="font-semibold text-[14px] mt-3">Pick Your Item</p><p className="text-white/50 text-[12px] mt-1">Browse shop, choose size & style you love</p></div>
            <div><div className="w-10 h-10 mx-auto bg-luxe-gold text-luxe-black font-bold rounded-full flex items-center justify-center">2</div><p className="font-semibold text-[14px] mt-3">Chat on WhatsApp</p><p className="text-white/50 text-[12px] mt-1">Send us item + your location, we confirm</p></div>
            <div><div className="w-10 h-10 mx-auto bg-luxe-gold text-luxe-black font-bold rounded-full flex items-center justify-center">3</div><p className="font-semibold text-[14px] mt-3">Receive & Slay</p><p className="text-white/50 text-[12px] mt-1">Pay on delivery (FUNAAB/Abeokuta) or transfer</p></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 max-w-7xl mx-auto pb-12">
        <div className="bg-gradient-to-br from-luxe-gold/20 to-luxe-gold/5 border border-luxe-gold/30 rounded-[20px] p-6 md:p-8 text-center">
          <p className="font-serif font-bold text-[22px]">New Drop Every Friday 🔥</p>
          <p className="text-white/60 text-[13px] mt-1">DM us now — best pieces go fast. First come, first serve.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
            <a href={whatsappLink("Hi Thrifty Luxe! Show me new drops")} target="_blank" rel="noopener noreferrer" className="btn-gold">Chat on WhatsApp — {WHATSAPP_DISPLAY}</a>
            <Link href="/shop" className="btn-gold-outline">Browse Shop</Link>
          </div>
        </div>
      </section>
    </div>
  );
            }
