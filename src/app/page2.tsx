"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, DbProduct } from "../lib/supabase";
import { formatNaira, whatsappLink } from "../lib/products";

export default function Home() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false }).limit(8);
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-hidden">

      {/* ===== HERO - LUXURY ===== */}
      <div className="relative overflow-hidden text-center py-14 md:py-20 px-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#C9A227]/15 blur-[100px] rounded-full" />
        <div className="absolute -left-20 top-40 w-[300px] h-[300px] bg-[#C9A227]/10 blur-[80px] rounded-full" />
        <div className="absolute -right-20 bottom-0 w-[300px] h-[300px] bg-[#C9A227]/10 blur-[80px] rounded-full" />

        <div className="relative">
          <div className="relative inline-block">
            <img src="/logo.png" alt="Thrifty Luxe" className="w-[170px] h-[170px] md:w-[210px] md:h-[210px] mx-auto rounded-full object-cover border-2 border-[#C9A227]/60 shadow-[0_0_70px_rgba(201,162,39,0.5)]" />
            <span className="absolute -top-1 -right-1 w-[28px] h-[28px] bg-[#C9A227] rounded-full flex items-center justify-center text-[14px] shadow-lg">✦</span>
          </div>

          <p className="text-[#C9A227] text-[11px] tracking-[0.4em] font-bold mt-7">✦ LUXURY THRIFT BOUTIQUE ✦</p>

          <h1 className="font-serif text-[42px] md:text-[66px] font-bold leading-[1.05] mt-3">
            My Crib,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5D67B] via-[#C9A227] to-[#F5D67B] bg-[length:200%_auto] animate-[shine_3s_linear_infinite]">Your Wardrobe.</span>
          </h1>

          <p className="text-white/60 text-[15px] max-w-[480px] mx-auto mt-4 leading-relaxed">
            Handpicked luxury thrift pieces. Washed, steamed, quality-checked. Look expensive, pay less. Once e go, e don go.
          </p>

          <div className="flex gap-3 justify-center mt-7 flex-wrap">
            <Link href="/shop" className="bg-gradient-to-r from-[#F5D67B] via-[#C9A227] to-[#A8861D] text-black font-bold px-8 py-4 rounded-full text-[14px] shadow-[0_15px_40px_rgba(201,162,39,0.4)] hover:scale-[1.03] transition">Shop Collection →</Link>
            <Link href="/collections" className="bg-white/5 border border-white/15 font-semibold px-8 py-4 rounded-full text-[14px] hover:bg-white/10 transition">View Lookbook</Link>
          </div>

          {/* ADMIN BUTTON REMOVED FROM HERO - E DON GO BOTTOM FOOTER ONLY */}

          {/* TRUST BADGES */}
          <div className="flex justify-center gap-6 md:gap-10 mt-10 text-center">
            <div><p className="font-serif font-bold text-[18px] text-[#F5D67B]">500+</p><p className="text-white/50 text-[11px]">Happy Customers</p></div>
            <div><p className="font-serif font-bold text-[18px] text-[#F5D67B]">100%</p><p className="text-white/50 text-[11px]">Quality Checked</p></div>
            <div><p className="font-serif font-bold text-[18px] text-[#F5D67B]">Nationwide</p><p className="text-white/50 text-[11px]">Fast Delivery</p></div>
          </div>
        </div>
        <style jsx>{`@keyframes shine { to { background-position: 200% center; } }`}</style>
      </div>

      {/* ===== MARQUEE - STREAMING GOLD ===== */}
      <div className="border-y border-[#C9A227]/20 bg-[#0A0A0A] py-3 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_20s_linear_infinite] text-[12px] tracking-[0.25em] text-[#C9A227] font-bold">
          <span>✦ NEW DROPS EVERY WEEK ✦</span><span>✦ WASHED & STEAMED ✦</span><span>✦ FUNAAB • ABEOKUTA ✦</span><span>✦ DELIVERY NATIONWIDE ✦</span><span>✦ NEW DROPS EVERY WEEK ✦</span><span>✦ WASHED & STEAMED ✦</span><span>✦ FUNAAB • ABEOKUTA ✦</span><span>✦ DELIVERY NATIONWIDE ✦</span>
        </div>
        <style jsx>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* ===== CATEGORIES ===== */}
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#C9A227] text-[11px] tracking-[0.3em] font-bold">SHOP BY CATEGORY</p>
            <h2 className="font-serif font-bold text-[28px] md:text-[34px] mt-1">Find Your Piece</h2>
          </div>
          <Link href="/shop" className="text-[13px] text-[#C9A227] font-semibold hidden md:block">View All →</Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-6">
          {[
            { name: "Dresses", emoji: "👗" },
            { name: "Jackets", emoji: "🧥" },
            { name: "Tops", emoji: "👚" },
            { name: "Bottoms", emoji: "👖" },
            { name: "Bags", emoji: "👜" },
            { name: "Shoes", emoji: "👠" },
          ].map((c) => (
            <Link key={c.name} href="/shop" className="bg-white/[0.03] border border-white/10 hover:border-[#C9A227]/40 rounded-[20px] p-4 text-center transition group">
              <span className="text-[32px] group-hover:scale-110 inline-block transition">{c.emoji}</span>
              <p className="font-semibold text-[13px] mt-2">{c.name}</p>
              <p className="text-white/40 text-[11px]">Shop Now →</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== NEW ARRIVALS - LIVE FROM SUPABASE ===== */}
      <div className="max-w-7xl mx-auto px-5 pb-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#C9A227] text-[11px] tracking-[0.3em] font-bold">FRESH FROM THE CRIB</p>
            <h2 className="font-serif font-bold text-[28px] md:text-[34px] mt-1">New Arrivals ✨</h2>
          </div>
          <Link href="/shop" className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[13px] font-medium">See All</Link>
        </div>

        {loading ? (
          <p className="text-white/50 text-center py-10">Loading luxury pieces... ✨</p>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white/[0.02] border border-dashed border-white/10 rounded-[24px] mt-6">
            <p className="text-[40px]">👗</p>
            <p className="font-serif font-bold mt-2">New drops coming soon</p>
            <p className="text-white/50 text-[13px] mt-1">Fresh pieces dey land soon. Stay tuned.</p>
            <Link href="/shop" className="inline-block mt-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[13px]">Browse Shop →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {products.map((p) => {
              const firstImage = (p as any).images?.[0];
              const hasVideo = !!(p as any).video_url;
              return (
              <div key={p.id} className="bg-white/[0.03] border border-white/10 rounded-[20px] overflow-hidden hover:border-[#C9A227]/40 transition group">
                <Link href={`/shop/${p.id}`}>
                  <div className="relative aspect-square bg-[#111] overflow-hidden">
                    {firstImage ? (
                      <img src={firstImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center"><span className="text-[32px]">👗</span><span className="text-[10px] text-white/40 mt-1">No photo yet</span></div>
                    )}
                    {p.tag && <span className="absolute top-2 left-2 bg-[#C9A227] text-black text-[10px] font-bold px-2 py-1 rounded-full">{p.tag}</span>}
                    {!p.in_stock && <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">SOLD</span>}
                    {hasVideo && <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">🎥 Video</span>}
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/shop/${p.id}`}><p className="text-[13px] font-medium line-clamp-2 min-h-[36px] hover:text-[#C9A227]">{p.name}</p></Link>
                  <p className="text-[11px] text-white/50 mt-1">Size: {p.size} • {p.category}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-bold text-[#F5D67B]">{formatNaira(p.price)}</span>
                    {p.old_price && <span className="text-[12px] text-white/40 line-through">{formatNaira(p.old_price)}</span>}
                  </div>
                  <a href={whatsappLink(`Hi Thrifty Luxe! I want to order: ${p.name} - Size ${p.size} - ${formatNaira(p.price)}`)} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center bg-[#25D366] text-white text-[13px] font-semibold py-2.5 rounded-full">Order on WhatsApp</a>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===== WHY US ===== */}
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="bg-gradient-to-br from-[#1A1508] via-[#0A0A0A] to-[#0A0A0A] border border-[#C9A227]/20 rounded-[28px] p-6 md:p-10">
          <p className="text-[#C9A227] text-[11px] tracking-[0.3em] font-bold text-center">WHY THRIFTY LUXE?</p>
          <h2 className="font-serif font-bold text-[26px] md:text-[32px] text-center mt-2">Luxury Wey No Go Break Your Pocket</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-[#050505]/60 border border-white/10 rounded-[20px] p-5 text-center">
              <p className="text-[32px]">✨</p><p className="font-bold mt-2">Handpicked</p><p className="text-white/50 text-[13px] mt-1 leading-relaxed">Every piece na handpicked. No anyhow cloth. Only clean, quality, stylish pieces.</p>
            </div>
            <div className="bg-[#050505]/60 border border-white/10 rounded-[20px] p-5 text-center">
              <p className="text-[32px]">🧼</p><p className="font-bold mt-2">Washed & Steamed</p><p className="text-white/50 text-[13px] mt-1 leading-relaxed">We wash, steam and check every item before e reach your hand. Fresh like new.</p>
            </div>
            <div className="bg-[#050505]/60 border border-white/10 rounded-[20px] p-5 text-center">
              <p className="text-[32px]">🚚</p><p className="font-bold mt-2">Fast Delivery</p><p className="text-white/50 text-[13px] mt-1 leading-relaxed">FUNAAB, Abeokuta same-day. Nationwide delivery. Order today, slay tomorrow.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href={whatsappLink("Hi Thrifty Luxe! I want to shop")} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25D366] text-white font-bold px-8 py-4 rounded-full text-[14px] shadow-lg">Chat on WhatsApp →</a>
          </div>
        </div>
      </div>

      {/* ===== FOOTER - ADMIN ONLY HERE AT VERY BOTTOM ===== */}
      <footer className="border-t border-white/5 mt-4 pt-8 pb-10 px-5 text-center">
        <p className="text-[#C9A227] font-serif font-bold text-[16px]">Thrifty Luxe</p>
        <p className="text-white/40 text-[11px] mt-1 tracking-[0.2em]">MY CRIB • YOUR WARDROBE</p>
        <p className="text-white/30 text-[11px] mt-3">© 2026 Thrifty Luxe. All rights reserved.</p>
        <Link href="/admin" className="text-[10px] text-white/20 hover:text-[#C9A227] tracking-[0.3em] transition mt-5 inline-block">ADMIN</Link>
      </footer>

    </div>
  );
          }
