/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          black: "#0A0A0A",
          coal: "#121212",
          charcoal: "#1A1A1A",
          gold: "#D4AF37",
          goldLight: "#F5D67B",
          goldDark: "#A67C00",
          cream: "#FFF8E7",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 0 1px #D4AF37, 0 10px 30px rgba(212, 175, 55, 0.15)",
        card: "0 8px 24px rgba(0, 0, 0, 0.45)",
      },
      borderRadius: {
        luxe: "12px",
      },
    },
  },
  plugins: [],
};
