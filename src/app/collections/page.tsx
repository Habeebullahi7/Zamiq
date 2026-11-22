import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, formatNaira } from "@/lib/products";

const collections = [
  {
    slug: "owambe",
    title: "Owambe Ready",
    desc: "Dresses, silk & statement pieces for party season",
    emoji: "✨",
    filter: "dresses",
  },
  {
    slug: "street",
    title: "Street Luxe",
    desc: "Denim, jackets & sneakers — everyday luxury",
    emoji: "🧥",
    filter: "jackets",
  },
  {
    slug: "bags",
    title: "Bag Lovers",
    desc: "Leather, retro & designer-inspired bags",
    emoji: "👜",
    filter: "bags",
  },
  {
    slug: "shoes",
    title: "Shoe Game",
    desc: "Clean sneakers & heels at thrift prices",
    emoji: "👟",
    filter: "shoes",
  },
];

export default function CollectionsPage() {
  return (
    <div className="px-5 max-w-7xl mx-auto py-6 md:py-10 bg-luxe-black min-h-screen">
      <h1 className="text-[28px] md:text-[36px] font-serif font-bold">Collections</h1>
      <p className="text-white/50 text-[13px] mt-1">Curated drops — pick your vibe</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {collections.map((c) => {
          const count = products.filter((p) => p.category === c.filter).length;
          const preview = products.filter((p) => p.category === c.filter).slice(0, 3);
          return (
            <Link key={c.slug} href={`/shop?cat=${c.filter}`} className="bg-luxe-coal border border-luxe-gold/20 rounded-[20px] p-5 hover:border-luxe-gold/50 transition group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[36px]">{c.emoji}</span>
                  <h2 className="text-[20px] font-serif font-bold mt-2">{c.title}</h2>
                  <p className="text-white/60 text-[13px] mt-1">{c.desc}</p>
                  <p className="text-luxe-gold text-[12px] mt-2 font-medium">{count} items in this collection</p>
                </div>
                <ArrowRight size={18} className="text-luxe-gold group-hover:translate-x-1 transition" />
              </div>

              <div className="flex gap-2 mt-4">
                {preview.map((p) => (
                  <div key={p.id} className="flex-1 bg-luxe-charcoal rounded-xl p-2 text-center">
                    <span className="text-[24px]">🛍️</span>
                    <p className="text-[11px] line-clamp-1 mt-1">{p.name}</p>
                    <p className="text-[11px] font-bold text-luxe-gold">{formatNaira(p.price)}</p>
                  </div>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <p className="text-white/60 text-[14px]">No see wetin you want?</p>
        <a href="https://wa.me/2347054802289?text=Hi%20Thrifty%20Luxe!%20I%20want%20a%20custom%20pick" target="_blank" rel="noopener noreferrer" className="btn-gold inline-block mt-3">
          Request Custom Pick
        </a>
      </div>
    </div>
  );
                    }
