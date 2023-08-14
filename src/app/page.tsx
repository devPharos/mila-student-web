'use client'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './api/firebase'
import { useVerifyPathPermission } from './hooks/permissions'

export default function Home() {
  const [user, loading] = useAuthState(auth)

  useVerifyPathPermission(user, loading)
}
