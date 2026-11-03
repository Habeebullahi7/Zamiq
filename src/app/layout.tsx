import "./globals.css";
export const metadata = { title: "ZAMIQ", description: "ZAMIQ - WhatsApp killer + LUMEN" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
