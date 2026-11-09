import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
