import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Zamiq - WhatsApp Clone', description: 'Full WhatsApp clone +1 number' }
export default function RootLayout({children}:{children:React.ReactNode}){
  return (<html lang="en"><body style={{margin:0, background:'#111B21', fontFamily:'system-ui'}}>{children}</body></html>)
}
