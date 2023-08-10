'use client'
import './globals.css'
import type { Metadata } from 'next'
import localFont from '@next/font/local'
import { Providers } from './providers'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './api/firebase'
import { Spinner } from '@nextui-org/react'

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
  const pathName = usePathname()
  const APP_ROUTES = {
    public: {
      login: '/login',
      first_access: '/signup',
    },
  }
  const router = useRouter()

  const isPublic = Object.values(APP_ROUTES.public).includes(pathName)

  const [user, loading] = useAuthState(auth)

  if (!isPublic && !user && !loading) {
    router.replace('/login')
  }

  if (isPublic && user && !loading) {
    router.replace('/dashboard')
  }

  if (loading) {
    return (
      <html lang="en">
        <body className={`${myriadPro.variable} font-sans`}>
          <div className="grid grid-cols-2 min-h-screen">
            <div className="bg-primary"></div>
            <div className="bg-neutral-lighter flex flex-col items-center justify-center p-6 w-full">
              <Spinner
                label="Loading..."
                color="primary"
                labelColor="primary"
              />
            </div>
          </div>
        </body>
      </html>
    )
  }
  return (
    <html lang="en">
      <body className={`${myriadPro.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
