import Link from "next/link";
import { MapPin, Truck, ShieldCheck, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="px-5 max-w-3xl mx-auto py-8 md:py-12 bg-luxe-black min-h-screen">
      <p className="text-[11px] tracking-[0.25em] uppercase text-luxe-gold">Our Story</p>
      <h1 className="text-[32px] md:text-[42px] font-serif font-bold leading-tight mt-2">
        My Crib,<br /><span className="text-gold-gradient">Your Wardrobe.</span>
      </h1>

      <p className="text-white/70 leading-relaxed mt-5 text-[15px]">
        Thrifty Luxe started inside FUNAAB hostel — one girl, one bale of thrift, and one big idea: <b className="text-white">you no need to break bank to look expensive.</b>
      </p>
      <p className="text-white/70 leading-relaxed mt-3 text-[15px]">
        We handpick every piece, check am, wash am, steam am — so when e reach your hand, e go look brand new. From vintage denim to silk dresses, we curate only pieces we go wear ourselves.
      </p>

      <div className="grid grid-cols-3 gap-3 mt-8 text-center">
        <div className="bg-luxe-coal border border-white/10 rounded-2xl p-4">
          <p className="text-[22px] font-bold text-luxe-gold">500+</p>
          <p className="text-[11px] text-white/50 mt-1">Happy Customers</p>
        </div>
        <div className="bg-luxe-coal border border-white/10 rounded-2xl p-4">
          <p className="text-[22px] font-bold text-luxe-gold">1000+</p>
          <p className="text-[11px] text-white/50 mt-1">Pieces Sold</p>
        </div>
        <div className="bg-luxe-coal border border-white/10 rounded-2xl p-4">
          <p className="text-[22px] font-bold text-luxe-gold">4.9★</p>
          <p className="text-[11px] text-white/50 mt-1">Average Rating</p>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="flex gap-3">
          <div className="w-10 h-10 shrink-0 bg-luxe-gold/15 rounded-full flex items-center justify-center text-luxe-gold"><Truck size={18} /></div>
          <div><p className="font-semibold text-[14px]">Delivery Nationwide</p><p className="text-white/60 text-[13px] mt-0.5">FUNAAB ₦500 • Abeokuta ₦1,000 • Lagos ₦3,000 • Nationwide available</p></div>
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-10 shrink-0 bg-luxe-gold/15 rounded-full flex items-center justify-center text-luxe-gold"><ShieldCheck size={18} /></div>
          <div><p className="font-semibold text-[14px]">Quality Checked</p><p className="text-white/60 text-[13px] mt-0.5">Every piece inspected, washed & steamed before delivery.</p></div>
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-10 shrink-0 bg-luxe-gold/15 rounded-full flex items-center justify-center text-luxe-gold"><MapPin size={18} /></div>
          <div><p className="font-semibold text-[14px]">Pickup Available</p><p className="text-white/60 text-[13px] mt-0.5">FUNAAB, Abeokuta — DM for pickup point. Pay on delivery for FUNAAB & Abeokuta.</p></div>
        </div>
      </div>

      <div className="bg-luxe-coal border border-luxe-gold/20 rounded-[20px] p-6 mt-8 text-center">
        <Sparkles className="mx-auto text-luxe-gold" size={22} />
        <p className="font-serif font-bold text-[18px] mt-2">Want to see new drops first?</p>
        <p className="text-white/60 text-[13px] mt-1">Follow us, DM us — we go plug you.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <a href="https://wa.me/2347054802289?text=Hi%20Thrifty%20Luxe!%20I%20want%20to%20join%20your%20updates" target="_blank" rel="noopener noreferrer" className="btn-gold">Chat on WhatsApp</a>
          <Link href="/shop" className="btn-gold-outline">Shop Now</Link>
        </div>
        <p className="text-[12px] text-white/40 mt-3">+234 705 480 2289</p>
      </div>
    </div>
  );
}
