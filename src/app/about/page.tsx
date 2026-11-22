import Link from "next/link";

export default function About() {
  return (
    <div className="bg-luxe-black min-h-screen px-5 max-w-7xl mx-auto py-8">
      <h1 className="text-[28px] md:text-[34px] font-serif font-bold">About Thrifty <span className="text-luxe-gold">Luxe</span></h1>
      <p className="text-white/60 text-[14px] leading-relaxed mt-3 max-w-[600px]">
        My Crib, Your Wardrobe. We started for FUNAAB with one simple idea — you no need break bank to look expensive.
        Every piece na handpicked from bales, washed, steamed, and checked before e reach you.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="bg-luxe-coal border border-white/10 rounded-2xl p-5">
          <p className="text-[28px]">✨</p>
          <p className="font-bold mt-2">Handpicked</p>
          <p className="text-white/50 text-[13px] mt-1">We no dey pick anyhow. Only clean, quality pieces enter our drop.</p>
        </div>
        <div className="bg-luxe-coal border border-white/10 rounded-2xl p-5">
          <p className="text-[28px]">🧼</p>
          <p className="font-bold mt-2">Washed & Steamed</p>
          <p className="text-white/50 text-[13px] mt-1">Every item dey washed and steamed, ready to wear once e reach you.</p>
        </div>
        <div className="bg-luxe-coal border border-white/10 rounded-2xl p-5">
          <p className="text-[28px]">🚚</p>
          <p className="font-bold mt-2">Fast Delivery</p>
          <p className="text-white/50 text-[13px] mt-1">FUNAAB ₦500 • Abeokuta ₦1,000 • Lagos ₦3,000 • Nationwide available.</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/shop" className="btn-gold inline-block">Shop Now</Link>
        <p className="text-white/40 text-[12px] mt-4">Location: FUNAAB, Abeokuta • WhatsApp: +234 705 480 2289</p>
      </div>
    </div>
  );
}
