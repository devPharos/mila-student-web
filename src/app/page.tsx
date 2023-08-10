'use client'
import { useAuthState } from 'react-firebase-hooks/auth'
import Dashboard from './dashboard/page'
import Login from './login/page'
import { auth } from './api/firebase'

export default function Home() {
  const [user, loading] = useAuthState(auth)

  return <>{!loading && user ? <Dashboard /> : <Login />}</>
}
