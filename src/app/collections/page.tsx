import Link from "next/link";
import { products, formatNaira } from "../../lib/products";

export default function Collections() {
  const collections = [
    { name: "Vintage Denim", emoji: "👖", desc: "Jackets, jeans & more", filter: "Jackets" },
    { name: "Elegant Dresses", emoji: "👗", desc: "Silk, gowns & casual", filter: "Dresses" },
    { name: "Luxury Bags", emoji: "👜", desc: "Handbags & totes", filter: "Bags" },
    { name: "Street Shoes", emoji: "👟", desc: "Sneakers & heels", filter: "Shoes" },
  ];

  return (
    <div className="bg-luxe-black min-h-screen px-5 max-w-7xl mx-auto py-8">
      <h1 className="text-[28px] md:text-[34px] font-serif font-bold">Collections</h1>
      <p className="text-white/50 text-[13px] mt-1">Curated drops for every mood</p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {collections.map((c) => {
          const count = products.filter((p) => p.category === c.filter).length;
          return (
            <Link key={c.name} href="/shop" className="bg-luxe-coal border border-white/10 rounded-[20px] p-6 hover:border-luxe-gold/40 transition flex items-center gap-4">
              <span className="text-[48px]">{c.emoji}</span>
              <div>
                <p className="font-serif font-bold text-[19px]">{c.name}</p>
                <p className="text-white/50 text-[13px]">{c.desc} • {count} items</p>
                <p className="text-luxe-gold text-[13px] font-semibold mt-1">Shop Collection →</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 bg-gradient-to-br from-luxe-gold/20 to-luxe-gold/5 border border-luxe-gold/30 rounded-[20px] p-6 text-center">
        <p className="font-serif font-bold text-[20px]">Can't find your size?</p>
        <p className="text-white/60 text-[13px] mt-1">DM us, we go source am for you from our next bale.</p>
        <a href="https://wa.me/2347054802289?text=Hi%20Thrifty%20Luxe!%20I%20need%20a%20specific%20size" target="_blank" rel="noopener noreferrer" className="btn-gold inline-block mt-4">Request a Piece</a>
      </div>
    </div>
  );
}
