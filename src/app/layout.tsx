import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zamiq - WhatsApp Clone',
  description: 'Gmail login → +1 number like Zangi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{margin:0, background:'#111B21'}}>{children}</body>
    </html>
  )
}
