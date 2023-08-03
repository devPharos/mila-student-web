'use client'
import { redirect } from 'next/navigation'

export default function Home() {
  const isLogged = false

  if (!isLogged) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Student Dashboard</h1>
    </div>
  )
}
