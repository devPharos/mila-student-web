'use client'
import { Providers } from './providers'
import Link from 'next/link'

export default function Home() {
  return (
    <Providers>
      <Link href="/login">Dashboard</Link>
    </Providers>
  )
}
