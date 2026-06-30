import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'SNDT University - Empowering Women Through Education',
  description: "India's first women's university, pioneering excellence in education since 1916. Explore programs, research, and student success stories.",
  generator: 'v0.app',
  openGraph: {
    title: 'SNDT University',
    description: 'Empowering women through education since 1916',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
