import './globals.css'
import type { Metadata } from 'next'
import localFont from '@next/font/local'

const myriadPro = localFont({
  src: [
    {
      path: '../../public/fonts/Myriad-Pro-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Myriad-Pro-Semibold.ttf',
      weight: '600',
    },
  ],
  variable: '--font-myriad-pro',
})

export const metadata: Metadata = {
  title: 'Student Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${myriadPro.variable} font-sans`}>{children}</body>
    </html>
  )
}
