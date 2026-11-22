"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, Truck, MapPin, Check } from "lucide-react";
import { products, DELIVERY_FEES, formatNaira, whatsappLink } from "@/lib/products";

export default function ProductPage() {
  const params = useParams();
  const id = Number(params.id);
  const product = products.find((p) => p.id === id);

  const [location, setLocation] = useState<string>("FUNAAB Campus");
  const [quantity, setQuantity] = useState(1);

  const deliveryFee = useMemo(() => DELIVERY_FEES[location] ?? 3500, [location]);
  const total = product ? product.price * quantity + deliveryFee : 0;

  if (!product) {
    return (
      <div className="px-5 max-w-7xl mx-auto py-20 text-center">
        <p className="text-[40px]">😢</p>
        <p className="font-bold text-[20px] mt-2">Product not found</p>
        <Link href="/shop" className="inline-block mt-4 bg-luxe-gold text-luxe-black px-6 py-3 rounded-full text-[13px] font-bold">
          Back to Shop
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const orderMessage = `Hi Thrifty Luxe! I want to order:\n\n• ${product.name}\n• Size: ${product.size}\n• Qty: ${quantity}\n• Price: ${formatNaira(product.price)} x ${quantity}\n• Delivery to: ${location} (${formatNaira(deliveryFee)})\n• Total: ${formatNaira(total)}\n\nMy name is:\nMy phone is:`;

  return (
    <div className="px-5 max-w-7xl mx-auto py-4 md:py-8 bg-luxe-black min-h-screen">
      <Link href="/shop" className="inline-flex items-center gap-2 text-[13px] text-white/60 hover:text-luxe-gold">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10 mt-4">
        {/* Image */}
        <div className="relative aspect-square bg-luxe-charcoal rounded-[20px] flex items-center justify-center overflow-hidden">
          <span className="text-[80px]">🛍️</span>
          {product.tag && (
            <span className="absolute top-4 left-4 bg-luxe-gold text-luxe-black text-[11px] font-bold px-3 py-1.5 rounded-full">{product.tag}</span>
          )}
          <span className="absolute bottom-4 left-4 bg-black/70 text-[11px] px-3 py-1.5 rounded-full">{product.condition} • Washed & Steamed</span>
        </div>

        {/* Details */}
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-luxe-gold">{product.category}</p>
          <h1 className="text-[26px] md:text-[34px] font-serif font-bold leading-tight mt-2">{product.name}</h1>
          <div className="flex items-center gap-1.5 mt-2">
            <Star size={14} className="fill-luxe-gold text-luxe-gold" />
            <span className="text-[13px]">4.9</span>
            <span className="text-[13px] text-white/50">• 120 reviews • 300+ sold</span>
          </div>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-[28px] font-bold text-luxe-gold">{formatNaira(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-white/40 line-through">{formatNaira(product.oldPrice)}</span>
                <span className="bg-red-500/15 text-red-400 text-[11px] font-bold px-2 py-1 rounded-full">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-white/60 text-[14px] leading-relaxed mt-4">{product.description}</p>

          {/* Info boxes */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="bg-luxe-charcoal border border-white/10 rounded-2xl p-3">
              <p className="text-[11px] text-white/50">Size</p>
              <p className="font-semibold text-[14px] mt-0.5">{product.size}</p>
            </div>
            <div className="bg-luxe-charcoal border border-white/10 rounded-2xl p-3">
              <p className="text-[11px] text-white/50">Condition</p>
              <p className="font-semibold text-[14px] mt-0.5 flex items-center gap-1"><Check size={14} className="text-luxe-gold" /> {product.condition}</p>
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-5">
            <p className="text-[13px] font-semibold mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full bg-white/10 text-[18px]">−</button>
              <span className="font-bold w-6 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full bg-white/10 text-[18px]">+</button>
            </div>
          </div>

          {/* Delivery */}
          <div className="mt-5 bg-luxe-coal border border-luxe-gold/20 rounded-2xl p-4">
            <p className="flex items-center gap-2 font-semibold text-[14px]"><Truck size={16} className="text-luxe-gold" /> Delivery Calculator</p>
            <div className="mt-3">
              <label className="text-[12px] text-white/50 flex items-center gap-1"><MapPin size={13} /> Your Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-1.5 bg-luxe-charcoal border border-white/10 rounded-full px-4 py-3 text-[14px] outline-none"
              >
                {Object.keys(DELIVERY_FEES).map((loc) => (
                  <option key={loc} value={loc}>{loc} — {formatNaira(DELIVERY_FEES[loc])}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5 text-[13px] mt-4">
              <div className="flex justify-between text-white/60"><span>Item ({quantity} x {formatNaira(product.price)})</span><span>{formatNaira(product.price * quantity)}</span></div>
              <div className="flex justify-between text-white/60"><span>Delivery to {location}</span><span>{formatNaira(deliveryFee)}</span></div>
              <div className="flex justify-between font-bold text-[15px] pt-2 border-t border-white/10"><span>Total</span><span className="text-luxe-gold">{formatNaira(total)}</span></div>
            </div>
          </div>

          {/* Order Button */}
          <a
            href={whatsappLink(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-5 bg-[#25D366] text-white font-bold py-4 rounded-full text-[15px]"
          >
            Order on WhatsApp — {formatNaira(total)}
          </a>
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-white/40 mt-2"><ShieldCheck size={13} /> Pay on delivery available for FUNAAB & Abeokuta</p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-[20px] font-serif font-bold">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {related.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`} className="product-card">
                <div className="aspect-square bg-luxe-charcoal flex items-center justify-center text-[40px]">🛍️</div>
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
