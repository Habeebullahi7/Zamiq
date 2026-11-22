"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Star, SlidersHorizontal } from "lucide-react";
import { products, CATEGORIES, formatNaira, whatsappLink } from "@/lib/products";

export default function ShopPage() {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      category === "all" ? true : p.category === category
    );

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [category, query, sort]);

  return (
    <div className="px-5 max-w-7xl mx-auto py-6 md:py-10 bg-luxe-black min-h-screen">
      {/* Header */}
      <h1 className="text-[28px] md:text-[36px] font-serif font-bold">Shop All</h1>
      <p className="text-white/50 text-[13px] mt-1">
        {filtered.length} items • Delivery Nationwide • FUNAAB, Abeokuta
      </p>

      {/* Search */}
      <div className="relative mt-5">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dresses, jackets, bags..."
          className="w-full bg-luxe-charcoal border border-white/10 rounded-full pl-11 pr-4 py-3 text-[14px] outline-none focus:border-luxe-gold placeholder:text-white/40"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-medium border transition ${
              category === c.value
                ? "bg-luxe-gold text-luxe-black border-luxe-gold"
                : "bg-white/5 border-white/10 text-white/70"
            }`}
          >
            {c.name}
          </button>
        ))}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="ml-auto bg-luxe-charcoal border border-white/10 rounded-full px-3 py-2 text-[13px] outline-none shrink-0"
        >
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[40px]">😢</p>
          <p className="font-semibold mt-2">No items found</p>
          <p className="text-white/50 text-[13px] mt-1">Try another search or category</p>
          <button
            onClick={() => { setQuery(""); setCategory("all"); }}
            className="mt-4 bg-luxe-gold text-luxe-black px-5 py-2.5 rounded-full text-[13px] font-bold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
          {filtered.map((p) => (
            <div key={p.id} className="product-card">
              <Link href={`/shop/${p.id}`}>
                <div className="relative aspect-square bg-luxe-charcoal flex items-center justify-center">
                  <span className="text-[48px]">🛍️</span>
                  {p.tag && (
                    <span className="absolute top-2 left-2 bg-luxe-gold text-luxe-black text-[10px] font-bold px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-black/70 text-[10px] px-2 py-1 rounded-full">
                    {p.condition}
                  </span>
                </div>
              </Link>
              <div className="p-3">
                <Link href={`/shop/${p.id}`}>
                  <p className="text-[13px] md:text-[14px] font-medium leading-tight line-clamp-2 min-h-[36px] hover:text-luxe-gold">
                    {p.name}
                  </p>
                </Link>
                <p className="text-[11px] text-white/50 mt-1">Size: {p.size} • {p.condition}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} className="fill-luxe-gold text-luxe-gold" />
                  <span className="text-[11px] text-white/60">4.9 (120)</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-luxe-gold">{formatNaira(p.price)}</span>
                  {p.oldPrice && (
                    <span className="text-[12px] text-white/40 line-through">{formatNaira(p.oldPrice)}</span>
                  )}
                </div>
                <a
                  href={whatsappLink(`Hi Thrifty Luxe! I want to order: ${p.name} - ${formatNaira(p.price)} (Size: ${p.size}). My location is:`)}
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
      )}
    </div>
  );
                           }
