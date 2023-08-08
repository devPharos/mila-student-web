import { useState, useEffect } from 'react'
import { auth } from '../api/firebase'
import { User } from 'firebase/auth'

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    auth.onAuthStateChanged(function handleAuth(user) {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [user])

  return { user }
}
