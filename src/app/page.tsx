'use client'
import { redirect } from 'next/navigation'
import Dashboard from './dashboard/page'

export default function Home() {
  const isLogged = false

  if (!isLogged) {
    redirect('/login')
  }

  return (
    <div>
      <Dashboard />
    </div>
  )
}
