"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  // Replace with her real number - format: 234 + number without 0
  const WHATSAPP_NUMBER = "2347054802289";

  const message = encodeURIComponent(
    "Hi Thrifty Luxe! 👋 I saw your website, I want to order. My location is:"
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="whatsapp-float group"
    >
      <MessageCircle size={28} className="text-white fill-white" />

      {/* Tooltip - desktop only */}
      <span className="hidden md:block absolute right-[64px] top-1/2 -translate-y-1/2 whitespace-nowrap bg-white text-black text-[13px] font-semibold px-3 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
        Order on WhatsApp
      </span>

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </a>
  );
}
