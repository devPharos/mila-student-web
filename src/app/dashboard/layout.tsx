'use client'
import '../globals.css'
import { Providers } from '../providers'
import { Spinner } from '@nextui-org/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../api/firebase'
import { useVerifyPathPermission } from '../hooks/permissions'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, loading] = useAuthState(auth)
  useVerifyPathPermission(user, loading)

  if (loading) {
    return (
      <div className="bg-neutral-lighter flex flex-col items-center justify-center p-6 w-full  min-h-screen">
        <Spinner label="Loading..." color="primary" labelColor="primary" />
      </div>
    )
  }

  return <Providers>{children}</Providers>
}
