'use client'
import '../globals.css'
import { Providers } from '../providers'
import { Spinner } from '@nextui-org/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../api/firebase'
import { useVerifyPathPermission } from '../hooks/permissions'
import DashboardLoading from '../components/dashboardLoading'
import { Header } from '../components/header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, loading] = useAuthState(auth)
  useVerifyPathPermission(user, loading)

  if (loading || !user) {
    return <DashboardLoading />
  }

  return <Providers>{children}</Providers>
}
