"use client";

import { useState, useEffect } from "react";
import { supabase, DbProduct } from "../../lib/supabase";
import { formatNaira } from "../../lib/products";

const ADMIN_PASSWORD = "Darasimistore";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [list, setList] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("Dresses");
  const [size, setSize] = useState("");
  const [tag, setTag] = useState("");
  const [inStock, setInStock] = useState(true);
  const [description, setDescription] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState("");

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setList(data);
  };

  useEffect(() => { if (authed) fetchProducts(); }, [authed]);

  const inputClass = "w-full bg-[#0A0A0A] border border-white/10 rounded-2xl px-5 py-3.5 text-[14px] outline-none placeholder:text-white/30 focus:border-[#C9A227]/60 focus:ring-2 focus:ring-[#C9A227]/20 transition-all";
  const labelClass = "text-[11px] font-bold tracking-[0.15em] uppercase text-[#C9A227] mb-1.5 block";

  const addProduct = async () => {
    if (!name || !price || !size) return alert("Fill Name, Price and Size");
    if (images.length === 0) return alert("Add at least 1 picture!");
    setLoading(true);
    try {
      const imageUrls: string[] = [];
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileName = `${Date.now()}-${i}-${file.name.replaceAll(" ", "-")}`;
        const { error: upErr } = await supabase.storage.from("thrifty-images").upload(fileName, file);
        if (upErr) throw upErr;
        const { data } = supabase.storage.from("thrifty-images").getPublicUrl(fileName);
        imageUrls.push(data.publicUrl);
      }
      let videoUrl = null;
      if (videoFile) {
        const vName = `${Date.now()}-video-${videoFile.name.replaceAll(" ", "-")}`;
        const { error: vErr } = await supabase.storage.from("thrifty-images").upload(vName, videoFile);
        if (vErr) throw vErr;
        const { data } = supabase.storage.from("thrifty-images").getPublicUrl(vName);
        videoUrl = data.publicUrl;
      }
      const { error } = await supabase.from("products").insert({
        name, price: Number(price),
        old_price: oldPrice ? Number(oldPrice) : null,
        category, size, tag: tag || null,
        in_stock: inStock, description: description || null,
        images: imageUrls,
        video_url: videoUrl,
      });
      if (error) throw error;
      setName(""); setPrice(""); setOldPrice(""); setTag(""); setSize(""); setDescription("");
      setImages([]); setImagePreviews([]); setVideoFile(null); setVideoPreview("");
      fetchProducts();
      alert("Product added ✅ E go show for Shop now!");
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const toggleStock = async (p: DbProduct) => {
    await supabase.from("products").update({ in_stock: !p.in_stock }).eq("id", p.id);
    fetchProducts();
  };

  // LUXURY LOGIN - RETURN EARLY IF NOT AUTHED
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-5 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-[100px]" />
        <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[28px] p-8 w-full max-w-[420px] text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="w-[70px] h-[70px] mx-auto rounded-full bg-gradient-to-br from-[#F5D67B] via-[#C9A227] to-[#8A6D1B] flex items-center justify-center text-[30px] shadow-lg shadow-[#C9A227]/30">👑</div>
          <p className="text-[#C9A227] text-[11px] tracking-[0.3em] font-bold mt-5">THRIFTY LUXE</p>
          <h1 className="font-serif font-bold text-[28px] mt-1 leading-tight">Welcome Back,<br />Boss Lady ✨</h1>
          <p className="text-white/50 text-[13px] mt-2">Manage your boutique with elegance</p>
          <input
            type="password"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && passInput === ADMIN_PASSWORD) setAuthed(true); }}
            placeholder="Enter your secret password"
            className="w-full mt-7 bg-[#0A0A0A] border border-white/10 rounded-full px-5 py-4 text-[14px] text-center outline-none focus:border-[#C9A227]/60 placeholder:text-white/30"
          />
          <button onClick={() => passInput === ADMIN_PASSWORD ? setAuthed(true) : alert("Wrong password!")} className="w-full mt-3 bg-gradient-to-r from-[#F5D67B] via-[#C9A227] to-[#A8861D] text-black font-bold py-4 rounded-full shadow-lg shadow-[#C9A227]/30 active:scale-[0.98] transition">
            Unlock Dashboard →
          </button>
          <p className="text-white/25 text-[11px] mt-4">Secured • Private • Only for you</p>
        </div>
      </div>
    );
  }

  const totalValue = list.reduce((sum, p) => sum + p.price, 0);
  const inStockCount = list.filter(p => p.in_stock).length;

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <div className="sticky top-0 z-20 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#F5D67B] to-[#8A6D1B] flex items-center justify-center text-[20px]">👑</div>
            <div>
              <p className="font-serif font-bold text-[18px] leading-none">Thrifty Luxe</p>
              <p className="text-[#C9A227] text-[10px] tracking-[0.25em] font-bold mt-1">ADMIN • PRIVATE</p>
            </div>
          </div>
          <button onClick={() => setAuthed(false)} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[12px] font-medium hover:bg-white/10">Logout</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8 pb-20">
        <h1 className="font-serif text-[32px] md:text-[38px] font-bold leading-tight">Good Evening, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5D67B] to-[#C9A227]">Boss ✨</span></h1>
        <p className="text-white/50 text-[13px] mt-1">Here is your boutique at a glance today</p>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-gradient-to-br from-[#1A1508] to-[#0A0A0A] border border-[#C9A227]/20 rounded-[22px] p-4 md:p-5">
            <p className="text-[28px] md:text-[34px] font-serif font-bold">{list.length}</p>
            <p className="text-white/50 text-[11px] md:text-[12px] mt-0.5">Total Products</p>
            <p className="text-[#C9A227] text-[11px] font-semibold mt-2">🛍️ In Boutique</p>
          </div>
          <div className="bg-gradient-to-br from-[#0F1A0F] to-[#0A0A0A] border border-green-500/20 rounded-[22px] p-4 md:p-5">
            <p className="text-[28px] md:text-[34px] font-serif font-bold text-green-400">{inStockCount}</p>
            <p className="text-white/50 text-[11px] md:text-[12px] mt-0.5">Available</p>
            <p className="text-green-400/80 text-[11px] font-semibold mt-2">● Ready to Sell</p>
          </div>
          <div className="bg-gradient-to-br from-[#1A1508] to-[#0A0A0A] border border-[#C9A227]/20 rounded-[22px] p-4 md:p-5">
            <p className="text-[20px] md:text-[26px] font-serif font-bold text-[#F5D67B] leading-tight mt-1">{formatNaira(totalValue)}</p>
            <p className="text-white/50 text-[11px] md:text-[12px] mt-1">Stock Value</p>
            <p className="text-[#C9A227] text-[11px] font-semibold mt-2">💰 Potential Sales</p>
          </div>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[26px] p-5 md:p-7 mt-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#C9A227] text-[11px] tracking-[0.25em] font-bold">NEW ARRIVAL</p>
              <h2 className="font-serif font-bold text-[22px] mt-1">Add New Piece</h2>
            </div>
            <span className="text-[30px]">✨</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div><label className={labelClass}>Product Name *</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Vintage Denim Jacket" className={inputClass} /></div>
            <div><label className={labelClass}>Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}><option>Dresses</option><option>Jackets</option><option>Tops</option><option>Bottoms</option><option>Bags</option><option>Shoes</option></select></div>
            <div><label className={labelClass}>Selling Price (₦) *</label><input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="8500" className={inputClass} /></div>
            <div><label className={labelClass}>Old Price (₦) — For Discount</label><input value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} type="number" placeholder="12000 (optional)" className={inputClass} /></div>
            <div><label className={labelClass}>Size *</label><input value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g. M, L, 40" className={inputClass} /></div>
            <div><label className={labelClass}>Tag — HOT / NEW / RARE</label><input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g. HOT" className={inputClass} /></div>
            <div className="md:col-span-2"><label className={labelClass}>Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell customers why this piece is special..." className={`${inputClass} min-h-[90px] resize-none`} /></div>

            <div className="md:col-span-2">
              <label className={labelClass}>Product Pictures * ({imagePreviews.length})</label>
              <div className="border-2 border-dashed border-[#C9A227]/40 rounded-2xl p-4 bg-[#0A0A0A] text-center">
                <p className="text-[13px]">📸 Tap to add pictures from Gallery / Camera</p>
                <label className="block mt-3 bg-[#C9A227] text-black font-bold py-3.5 rounded-full text-[13px] cursor-pointer">
                  📷 TAP TO ADD PICTURES
                  <input type="file" multiple accept="image/*" onChange={(e) => {
                    const picked = Array.from(e.target.files || []) as File[];
                    setImages(prev => [...prev, ...picked]);
                    picked.forEach(f => {
                      const r = new FileReader();
                      r.onload = (ev: any) => setImagePreviews(prev => [...prev, ev.target.result]);
                      r.readAsDataURL(f);
                    });
                  }} className="hidden" />
                </label>
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative">
                        <img src={src} className="w-full h-[80px] object-cover rounded-xl" />
                        <button type="button" onClick={() => { setImages(images.filter((_, idx) => idx !== i)); setImagePreviews(imagePreviews.filter((_, idx) => idx !== i)); }} className="absolute -top-1 -right-1 bg-red-500 text-white w-[20px] h-[20px] rounded-full text-[10px]">✕</button>
                        {i === 0 && <span className="absolute bottom-1 left-1 bg-black text-white text-[8px] px-2 py-0.5 rounded-full">MAIN</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Product Video (Optional)</label>
              <div className="border-2 border-dashed border-white/15 rounded-2xl p-4 bg-[#0A0A0A] text-center">
                <p className="text-[13px]">🎥 Tap to add 1 video</p>
                <label className="block mt-3 bg-white text-black font-bold py-3.5 rounded-full text-[13px] cursor-pointer">
                  🎬 TAP TO ADD VIDEO
                  <input type="file" accept="video/*" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) { setVideoFile(f); setVideoPreview(URL.createObjectURL(f)); }
                  }} className="hidden" />
                </label>
                {videoPreview && (
                  <div className="mt-3">
                    <video src={videoPreview} controls className="w-full rounded-xl" />
                    <button type="button" onClick={() => { setVideoFile(null); setVideoPreview(""); }} className="mt-2 bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-full text-[11px]">Remove Video ✕</button>
                  </div>
                )}
              </div>
            </div>

            <label className="md:col-span-2 flex items-center justify-between bg-[#0A0A0A] border border-white/10 rounded-2xl px-5 py-4 cursor-pointer">
              <span className="flex items-center gap-3"><span className="text-[20px]">📦</span><span><span className="block font-semibold text-[14px]">Availability</span><span className="block text-white/50 text-[12px]">Is this piece ready to sell?</span></span></span>
              <span className={`w-[52px] h-[28px] rounded-full p-1 flex transition ${inStock ? "bg-[#C9A227] justify-end" : "bg-white/10 justify-start"}`}><span className="w-[20px] h-[20px] bg-white rounded-full shadow" /></span>
              <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="hidden" />
            </label>
          </div>

          <button onClick={addProduct} disabled={loading} className="w-full mt-6 bg-gradient-to-r from-[#F5D67B] via-[#C9A227] to-[#A8861D] text-black font-bold py-4 rounded-full shadow-lg shadow-[#C9A227]/25 active:scale-[0.99] transition disabled:opacity-50">
            {loading ? "Adding to Boutique..." : "✨ Add to Live Shop"}
          </button>
        </div>

        <div className="flex items-center justify-between mt-10">
          <h2 className="font-serif font-bold text-[22px]">Your Collection</h2>
          <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[12px] text-white/60">{list.length} pieces</span>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {list.map((p) => (
            <div key={p.id} className="bg-white/[0.03] border border-white/10 rounded-[22px] p-4 flex gap-4 hover:border-[#C9A227]/30 transition group">
              <div className="w-[72px] h-[72px] shrink-0 rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-[32px]">
                {p.images?.[0] ? <img src={p.images[0]} className="w-full h-full object-cover" /> : "👗"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-[14px] leading-tight truncate">{p.name}</p>
                  {p.tag && <span className="shrink-0 bg-[#C9A227] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{p.tag}</span>}
                </div>
                <p className="text-white/50 text-[12px] mt-1">{p.category} • Size {p.size}</p>
                <p className="font-bold text-[#F5D67B] mt-1.5">{formatNaira(p.price)} {p.old_price && <span className="text-white/35 line-through text-[12px] font-normal ml-1">{formatNaira(p.old_price)}</span>}</p>
                {p.video_url && <p className="text-[11px] text-purple-300 mt-1">🎥 Video attached</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => toggleStock(p)} className={`px-3 py-1.5 rounded-full text-[11px] font-semibold ${p.in_stock ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"}`}>{p.in_stock ? "● In Stock" : "○ Sold Out"}</button>
                  <button onClick={() => deleteProduct(p.id)} className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="md:col-span-2 text-center py-12 bg-white/[0.02] border border-dashed border-white/10 rounded-[22px]">
              <p className="text-[40px]">👗</p>
              <p className="font-serif font-bold mt-2">Your boutique is empty</p>
              <p className="text-white/50 text-[13px] mt-1">Add your first luxury piece above 👆</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
                                                                                                                        }
