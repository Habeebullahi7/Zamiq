"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Truck, ShieldCheck, MapPin } from "lucide-react";
import { products, formatNaira, whatsappLink } from "../../../lib/products";

export default function ProductDetail() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-luxe-black flex flex-col items-center justify-center px-5 text-center">
        <p className="text-[50px]">😢</p>
        <p className="font-bold text-[20px] mt-2">Item not found</p>
        <Link href="/shop" className="btn-gold mt-5">Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="bg-luxe-black min-h-screen px-5 max-w-7xl mx-auto py-6">
      <Link href="/shop" className="flex items-center gap-1.5 text-white/60 text-[13px] hover:text-white">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-5">
        <div className="aspect-square bg-luxe-coal border border-white/10 rounded-[20px] flex items-center justify-center relative">
          <span className="text-[90px]">🛍️</span>
          {product.tag && <span className="absolute top-4 left-4 bg-luxe-gold text-luxe-black text-[11px] font-bold px-3 py-1.5 rounded-full">{product.tag}</span>}
        </div>

        <div>
          <p className="text-luxe-gold text-[12px] font-bold tracking-widest uppercase">{product.category}</p>
          <h1 className="text-[26px] md:text-[32px] font-serif font-bold leading-tight mt-2">{product.name}</h1>
          <div className="flex items-center gap-2 mt-3">
            <span className="font-bold text-luxe-gold text-[24px]">{formatNaira(product.price)}</span>
            {product.oldPrice && <span className="text-white/40 line-through">{formatNaira(product.oldPrice)}</span>}
          </div>

          <div className="mt-5 space-y-2 text-[14px]">
            <p><span className="text-white/50">Size:</span> <span className="font-semibold">{product.size}</span></p>
            <p><span className="text-white/50">Condition:</span> <span className="font-semibold">Thrift • Washed & Steamed</span></p>
            <p><span className="text-white/50">Availability:</span> {product.inStock ? <span className="text-green-400 font-semibold">In Stock ✅</span> : <span className="text-red-400 font-semibold">Sold Out</span>}</p>
          </div>

          <p className="text-white/60 text-[14px] leading-relaxed mt-4">
            {product.description || "Handpicked, washed, steamed and quality-checked. First come, first serve — once e go, e don go."}
          </p>

          <a href={whatsappLink(`Hi Thrifty Luxe! I want to order: ${product.name} - Size ${product.size} - ${formatNaira(product.price)}`)} target="_blank" rel="noopener noreferrer" className="block text-center mt-6 bg-[#25D366] text-white font-bold py-4 rounded-full">
            Order on WhatsApp
          </a>

          <div className="grid grid-cols-3 gap-2 mt-5 text-center text-[11px] text-white/60">
            <div className="bg-luxe-coal rounded-xl p-3"><Truck size={18} className="mx-auto text-luxe-gold mb-1" />Nationwide Delivery</div>
            <div className="bg-luxe-coal rounded-xl p-3"><ShieldCheck size={18} className="mx-auto text-luxe-gold mb-1" />Quality Checked</div>
            <div className="bg-luxe-coal rounded-xl p-3"><MapPin size={18} className="mx-auto text-luxe-gold mb-1" />FUNAAB Pickup</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12 pb-10">
          <h2 className="text-[20px] font-serif font-bold">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {related.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`} className="product-card">
                <div className="aspect-square bg-luxe-charcoal flex items-center justify-center"><span className="text-[44px]">🛍️</span></div>
                <div className="p-3">
                  <p className="text-[13px] font-medium line-clamp-2 min-h-[36px]">{p.name}</p>
                  <p className="font-bold text-luxe-gold mt-1">{formatNaira(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
      }
