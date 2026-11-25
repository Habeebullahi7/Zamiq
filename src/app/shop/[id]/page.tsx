"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase, DbProduct } from "../../../lib/supabase";
import { formatNaira, whatsappLink } from "../../../lib/products";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const [p, setP] = useState<DbProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchOne = async () => {
      const { data } = await supabase.from("products").select("*").eq("id", id).single();
      if (data) setP(data);
      setLoading(false);
    };
    if (id) fetchOne();
  }, [id]);

  if (loading) return <div className="bg-luxe-black min-h-screen flex items-center justify-center text-white/60">Loading... ✨</div>;
  if (!p) return <div className="bg-luxe-black min-h-screen flex items-center justify-center text-center px-5"><div><p className="text-[40px]">🥺</p><p className="font-bold mt-2">Product not found</p><Link href="/shop" className="text-luxe-gold text-[13px] mt-3 block">← Back to Shop</Link></div></div>;

  const images = (p as any).images || [];
  const videoUrl = (p as any).video_url;

  return (
    <div className="bg-luxe-black min-h-screen px-5 max-w-6xl mx-auto py-6 pb-24">
      <Link href="/shop" className="text-white/50 text-[13px]">← Back to Shop</Link>

      {/* MAIN IMAGE / VIDEO */}
      <div className="relative aspect-square bg-luxe-charcoal rounded-[22px] overflow-hidden mt-4">
        {showVideo && videoUrl ? (
          <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
        ) : images[activeImg] ? (
          <img src={images[activeImg]} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center"><span className="text-[50px]">👗</span><p className="text-white/40 text-[12px] mt-2">No photo yet</p></div>
        )}
        {p.tag && <span className="absolute top-3 left-3 bg-luxe-gold text-luxe-black text-[11px] font-bold px-3 py-1.5 rounded-full">{p.tag}</span>}
        {!p.in_stock && <span className="absolute top-3 right-3 bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full">SOLD</span>}
      </div>

      {/* THUMBNAILS + VIDEO BUTTON */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {images.map((src: string, i: number) => (
          <button key={i} onClick={() => { setActiveImg(i); setShowVideo(false); }} className={`w-[70px] h-[70px] shrink-0 rounded-xl overflow-hidden border-2 ${activeImg === i && !showVideo ? "border-luxe-gold" : "border-white/10"}`}>
            <img src={src} className="w-full h-full object-cover" />
          </button>
        ))}
        {videoUrl && (
          <button onClick={() => setShowVideo(true)} className={`w-[70px] h-[70px] shrink-0 rounded-xl bg-[#1A1A1A] border-2 flex flex-col items-center justify-center ${showVideo ? "border-luxe-gold" : "border-white/10"}`}>
            <span className="text-[22px]">🎥</span><span className="text-[9px] text-white/60">Video</span>
          </button>
        )}
      </div>

      {/* DETAILS */}
      <h1 className="font-serif font-bold text-[26px] mt-5 leading-tight">{p.name}</h1>
      <p className="text-white/50 text-[13px] mt-1">{p.category} • Size {p.size}</p>
      <div className="flex items-center gap-2 mt-3">
        <span className="font-bold text-[24px] text-luxe-gold">{formatNaira(p.price)}</span>
        {p.old_price && <span className="text-white/40 line-through">{formatNaira(p.old_price)}</span>}
      </div>

      {p.description && (
        <div className="mt-5 bg-white/[0.03] border border-white/10 rounded-2xl p-4">
          <p className="text-[11px] tracking-[0.2em] font-bold text-luxe-gold">ABOUT THIS PIECE</p>
          <p className="text-[14px] text-white/80 mt-2 leading-relaxed">{p.description}</p>
        </div>
      )}

      <p className={`mt-4 text-[13px] font-semibold ${p.in_stock ? "text-green-400" : "text-red-400"}`}>{p.in_stock ? "● In Stock - Ready to Ship" : "○ Sold Out"}</p>

      <a href={whatsappLink(`Hi Thrifty Luxe! I want to order: ${p.name} - Size ${p.size} - ${formatNaira(p.price)}`)} target="_blank" className="block text-center bg-[#25D366] text-white font-bold py-4 rounded-full mt-5">
        Order on WhatsApp 💚
      </a>
    </div>
  );
}
