import Link from "next/link";
import Image from "next/image";
import { Truck, ShieldCheck, Sparkles, MapPin, ArrowRight, Star } from "lucide-react";

// Fake products for now - we go replace with real ones later
const products = [
  { id: 1, name: "Vintage Denim Jacket", price: 15000, oldPrice: 25000, img: "/products/jacket.jpg", tag: "Best Seller" },
  { id: 2, name: "Luxury Silk Dress", price: 12000, oldPrice: 20000, img: "/products/dress.jpg", tag: "New" },
  { id: 3, name: "Retro Leather Bag", price: 18000, oldPrice: 30000, img: "/products/bag.jpg", tag: "Hot" },
  { id: 4, name: "Designer Sneakers", price: 22000, oldPrice: 35000, img: "/products/sneakers.jpg", tag: "Limited" },
];

const categories = [
  { name: "Dresses", img: "/cat-dresses.jpg", count: "120+ items" },
  { name: "Jackets", img: "/cat-jackets.jpg", count: "80+ items" },
  { name: "Bags", img: "/cat-bags.jpg", count: "60+ items" },
  { name: "Shoes", img: "/cat-shoes.jpg", count: "90+ items" },
];

export default function Home() {
  return (
    <div className="bg-luxe-black">
      {/* HERO */}
      <section className="relative px-5 pt-8 pb-12 md:pt-16 md:pb-20 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-luxe-gold border border-luxe-gold/30 rounded-full px-4 py-1.5">
            <Sparkles size={14} /> Thrifted • Curated • Luxury
          </p>
          <h1 className="mt-5 text-[42px] leading-[1.05] md:text-[72px] font-serif font-bold">
            My Crib,<br />
            <span className="text-gold-gradient">Your Wardrobe.</span>
          </h1>
          <p className="mt-4 text-white/60 text-[15px] md:text-[18px] max-w-[520px] mx-auto leading-relaxed">
            Premium thrifted pieces, handpicked for you. Look expensive without spending expensive.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="btn-gold inline-flex items-center justify-center gap-2">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link href="/collections" className="btn-gold-outline inline-flex items-center justify-center">
              View Collections
            </Link>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-white/50">
            <MapPin size={13} className="text-luxe-gold" /> FUNAAB, Abeokuta • Delivery Nationwide
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-5 max-w-7xl mx-auto pb-12">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-[22px] md:text-[28px] font-serif font-bold">Shop by Category</h2>
          <Link href="/shop" className="text-luxe-gold text-[13px] font-medium">See all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((c) => (
            <Link key={c.name} href={`/shop?cat=${c.name.toLowerCase()}`} className="product-card group">
              <div className="relative aspect-[4/5] bg-luxe-charcoal overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-[40px]">👗</div>
                {/* Replace with <Image src={c.img} ... /> when images ready */}
              </div>
              <div className="p-3">
                <p className="font-semibold text-[14px]">{c.name}</p>
                <p className="text-[12px] text-luxe-gold/80">{c.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="px-5 max-w-7xl mx-auto pb-12">
        <h2 className="text-[22px] md:text-[28px] font-serif font-bold mb-1">Best Sellers</h2>
        <p className="text-white/50 text-[13px] mb-4">Most loved pieces this week</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div className="relative aspect-square bg-luxe-charcoal flex items-center justify-center">
                <span className="text-[48px]">🛍️</span>
                <span className="absolute top-2 left-2 bg-luxe-gold text-luxe-black text-[10px] font-bold px-2 py-1 rounded-full">{p.tag}</span>
              </div>
              <div className="p-3">
                <p className="text-[13px] md:text-[14px] font-medium leading-tight line-clamp-2 min-h-[36px]">{p.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} className="fill-luxe-gold text-luxe-gold" />
                  <span className="text-[11px] text-white/60">4.9 (120)</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-luxe-gold">₦{p.price.toLocaleString()}</span>
                  <span className="text-[12px] text-white/40 line-through">₦{p.oldPrice.toLocaleString()}</span>
                </div>
                <Link href={`/shop/${p.id}`} className="mt-3 block text-center bg-white/10 hover:bg-luxe-gold hover:text-luxe-black transition text-[13px] font-semibold py-2.5 rounded-full">
                  View Item
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-5 md:mx-auto max-w-7xl bg-luxe-coal border border-luxe-gold/20 rounded-[20px] p-6 md:p-8 mb-12">
        <h2 className="text-[22px] md:text-[26px] font-serif font-bold text-center">Why Thrifty Luxe?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-center">
          <div>
            <div className="w-12 h-12 mx-auto bg-luxe-gold/15 rounded-full flex items-center justify-center text-luxe-gold"><Truck size={22} /></div>
            <p className="font-semibold mt-3">Delivery Nationwide</p>
            <p className="text-[13px] text-white/60 mt-1">We deliver to Lagos, Abuja, Ibadan, PH & everywhere. Fee applies.</p>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto bg-luxe-gold/15 rounded-full flex items-center justify-center text-luxe-gold"><ShieldCheck size={22} /></div>
            <p className="font-semibold mt-3">Quality Checked</p>
            <p className="text-[13px] text-white/60 mt-1">Every piece is inspected, washed & steamed before delivery.</p>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto bg-luxe-gold/15 rounded-full flex items-center justify-center text-luxe-gold"><Sparkles size={22} /></div>
            <p className="font-semibold mt-3">Luxury for Less</p>
            <p className="text-[13px] text-white/60 mt-1">Designer looks at thrift prices. Save up to 60% off retail.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 max-w-7xl mx-auto pb-16 text-center">
        <h2 className="text-[26px] md:text-[36px] font-serif font-bold leading-tight">Ready to upgrade <br className="md:hidden" />your wardrobe?</h2>
        <p className="text-white/60 text-[14px] mt-2">DM us on WhatsApp, we go help you pick your size.</p>
        <a href="https://wa.me/2347054802289?text=Hi%20Thrifty%20Luxe!%20I%20want%20to%20shop" target="_blank" rel="noopener noreferrer" className="btn-gold inline-block mt-5">
          Chat on WhatsApp
        </a>
        <p className="text-[12px] text-white/40 mt-3">+234 705 480 2289</p>
      </section>
    </div>
  );
      }
