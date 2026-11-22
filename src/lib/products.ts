// WhatsApp - single source of truth
export const WHATSAPP_NUMBER = "2347054802289";
export const WHATSAPP_DISPLAY = "+234 705 480 2289";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Types
export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: "dresses" | "jackets" | "bags" | "shoes" | "tops" | "trousers";
  size: string;
  condition: "Like New" | "Excellent" | "Very Good";
  tag?: "Best Seller" | "New" | "Hot" | "Limited";
  img: string;
  description: string;
};

// Products - replace img with real photos later
export const products: Product[] = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    price: 15000,
    oldPrice: 25000,
    category: "jackets",
    size: "M / UK 10",
    condition: "Excellent",
    tag: "Best Seller",
    img: "/products/jacket.jpg",
    description: "Thick quality denim, vintage wash. Perfect for layering.",
  },
  {
    id: 2,
    name: "Luxury Silk Dress",
    price: 12000,
    oldPrice: 20000,
    category: "dresses",
    size: "S / UK 8",
    condition: "Like New",
    tag: "New",
    img: "/products/dress.jpg",
    description: "Silky flow, elegant fit. For dinner, church, owambe.",
  },
  {
    id: 3,
    name: "Retro Leather Bag",
    price: 18000,
    oldPrice: 30000,
    category: "bags",
    size: "Medium",
    condition: "Excellent",
    tag: "Hot",
    img: "/products/bag.jpg",
    description: "Genuine leather, clean interior. Carries all your essentials.",
  },
  {
    id: 4,
    name: "Designer Sneakers",
    price: 22000,
    oldPrice: 35000,
    category: "shoes",
    size: "EU 40",
    condition: "Very Good",
    tag: "Limited",
    img: "/products/sneakers.jpg",
    description: "Clean sole, premium comfort. One pair left.",
  },
  {
    id: 5,
    name: "Pleated Midi Skirt",
    price: 9000,
    oldPrice: 15000,
    category: "dresses",
    size: "M / UK 10",
    condition: "Like New",
    img: "/products/skirt.jpg",
    description: "Flowy pleats, easy to style with top or blazer.",
  },
  {
    id: 6,
    name: "Oversized Blazer",
    price: 16000,
    oldPrice: 28000,
    category: "jackets",
    size: "L / UK 12",
    condition: "Excellent",
    tag: "New",
    img: "/products/blazer.jpg",
    description: "Sharp fit, office to owambe. Instant luxury look.",
  },
];

// Delivery fees - by location
export const DELIVERY_FEES: Record<string, number> = {
  "FUNAAB Campus": 500,
  Abeokuta: 1000,
  Lagos: 3000,
  Ibadan: 2500,
  Abuja: 4000,
  "Port Harcourt": 4000,
  "Other States": 3500,
};

export const CATEGORIES = [
  { name: "All", value: "all" },
  { name: "Dresses", value: "dresses" },
  { name: "Jackets", value: "jackets" },
  { name: "Bags", value: "bags" },
  { name: "Shoes", value: "shoes" },
] as const;

export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString()}`;
    }
