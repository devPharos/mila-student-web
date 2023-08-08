'use client'
import Dashboard from './dashboard/page'
import useAuth from './hooks/useAuth'
import Login from './login/page'

export default function Home() {
  const userAuth = useAuth()

  return <>{userAuth.user ? <Dashboard /> : <Login />}</>
}
