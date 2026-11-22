"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, DbProduct } from "../../lib/supabase";
import { formatNaira, whatsappLink } from "../../lib/products";

const categories = ["All", "Dresses", "Jackets", "Tops", "Bottoms", "Bags", "Shoes"];

export default function Shop() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loading) {
    return (
      <div className="bg-luxe-black min-h-screen flex items-center justify-center">
        <p className="text-white/60">Loading products... ✨</p>
      </div>
    );
  }

  return (
    <div className="bg-luxe-black min-h-screen px-5 max-w-7xl mx-auto py-8">
      <h1 className="text-[28px] md:text-[34px] font-serif font-bold">Shop All</h1>
      <p className="text-white/50 text-[13px] mt-1">{filtered.length} items • Handpicked & steamed</p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search dresses, jackets, bags..."
        className="w-full mt-5 bg-luxe-coal border border-white/10 rounded-full px-5 py-3 text-[14px] outline-none focus:border-luxe-gold/50 placeholder:text-white/30"
      />

      <div className="flex gap-2 overflow-x-auto mt-4 pb-1 scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-medium ${active === c ? "bg-luxe-gold text-luxe-black font-bold" : "bg-luxe-coal border border-white/10 text-white/70"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {filtered.map((p) => (
          <div key={p.id} className="product-card">
            <Link href={`/shop/${p.id}`}>
              <div className="relative aspect-square bg-luxe-charcoal flex items-center justify-center">
                <span className="text-[44px]">🛍️</span>
                {p.tag && <span className="absolute top-2 left-2 bg-luxe-gold text-luxe-black text-[10px] font-bold px-2 py-1 rounded-full">{p.tag}</span>}
                {!p.in_stock && <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">SOLD</span>}
              </div>
            </Link>
            <div className="p-3">
              <Link href={`/shop/${p.id}`}>
                <p className="text-[13px] font-medium line-clamp-2 min-h-[36px] hover:text-luxe-gold">{p.name}</p>
              </Link>
              <p className="text-[11px] text-white/50 mt-1">Size: {p.size} • {p.category}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="font-bold text-luxe-gold">{formatNaira(p.price)}</span>
                {p.old_price && <span className="text-[12px] text-white/40 line-through">{formatNaira(p.old_price)}</span>}
              </div>
              <a
                href={whatsappLink(`Hi Thrifty Luxe! I want to order: ${p.name} - Size ${p.size} - ${formatNaira(p.price)}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center bg-[#25D366] text-white text-[13px] font-semibold py-2.5 rounded-full"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[40px]">😢</p>
          <p className="font-semibold mt-2">No item found</p>
          <p className="text-white/50 text-[13px] mt-1">Add products from /admin</p>
          <Link href="/admin" className="inline-block mt-4 bg-luxe-gold text-luxe-black font-bold px-5 py-2.5 rounded-full text-[13px]">Go to Admin</Link>
        </div>
      )}
    </div>
  );
}
