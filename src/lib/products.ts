export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  size: string;
  tag?: string;
  inStock: boolean;
  description?: string;
  image?: string;
};

export const WHATSAPP_NUMBER = "2347054802289";
export const WHATSAPP_DISPLAY = "+234 705 480 2289";

export function formatNaira(amount: number) {
  return "₦" + amount.toLocaleString("en-NG");
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Vintage Denim Jacket - Light Wash",
    price: 8500,
    oldPrice: 12000,
    category: "Jackets",
    size: "M",
    tag: "HOT",
    inStock: true,
    description: "Clean vintage denim jacket, light wash. Washed, steamed and ready to wear. Perfect for layering.",
  },
  {
    id: 2,
    name: "Silk Satin Slip Dress - Champagne",
    price: 9500,
    oldPrice: 14000,
    category: "Dresses",
    size: "S",
    tag: "NEW",
    inStock: true,
    description: "Elegant satin slip dress. Soft, flowy and perfect for dinner or party.",
  },
  {
    id: 3,
    name: "Oversized Graphic Tee - Black",
    price: 4500,
    oldPrice: 7000,
    category: "Tops",
    size: "L",
    tag: "BESTSELLER",
    inStock: true,
    description: "Oversized streetwear tee, soft cotton. Very clean, no fade.",
  },
  {
    id: 4,
    name: "High-Waist Wide Leg Trousers - Cream",
    price: 7000,
    oldPrice: 10000,
    category: "Bottoms",
    size: "M",
    inStock: true,
    description: "High-waist wide leg trousers. Classy fit, goes with anything.",
  },
  {
    id: 5,
    name: "Mini Leather Handbag - Brown",
    price: 11000,
    oldPrice: 16000,
    category: "Bags",
    size: "One Size",
    tag: "LUXE",
    inStock: true,
    description: "Mini leather handbag, premium feel. Clean inside and out.",
  },
  {
    id: 6,
    name: "Chunky Sneakers - White / Beige",
    price: 14500,
    oldPrice: 20000,
    category: "Shoes",
    size: "40",
    tag: "HOT",
    inStock: true,
    description: "Chunky sneakers, very clean sole. Comfortable for everyday wear.",
  },
  {
    id: 7,
    name: "Pleated Midi Skirt - Black",
    price: 6000,
    category: "Bottoms",
    size: "S",
    inStock: true,
    description: "Pleated midi skirt, flowy and elegant.",
  },
  {
    id: 8,
    name: "Cropped Cardigan - Pink",
    price: 5500,
    oldPrice: 8000,
    category: "Tops",
    size: "M",
    inStock: false,
    description: "Soft cropped cardigan. This one don sell, but we fit source similar for you.",
  },
  {
    id: 9,
    name: "Floral Summer Dress - Blue",
    price: 7500,
    category: "Dresses",
    size: "M",
    tag: "NEW",
    inStock: true,
    description: "Floral summer dress, light and breezy. Perfect for Lagos sun.",
  },
  {
    id: 10,
    name: "Leather Biker Jacket - Black",
    price: 15000,
    oldPrice: 22000,
    category: "Jackets",
    size: "L",
    tag: "RARE",
    inStock: true,
    description: "Rare leather biker jacket. Heavy quality, clean condition.",
  },
  {
    id: 11,
    name: "Tote Bag - Canvas Beige",
    price: 6500,
    category: "Bags",
    size: "One Size",
    inStock: true,
    description: "Big canvas tote, perfect for school or market runs.",
  },
  {
    id: 12,
    name: "Heeled Ankle Boots - Black",
    price: 13000,
    oldPrice: 18000,
    category: "Shoes",
    size: "39",
    inStock: true,
    description: "Heeled ankle boots, clean and sturdy. Very classy.",
  },
];
