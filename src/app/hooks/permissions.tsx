import { usePathname, useRouter } from 'next/navigation'
import { User } from 'firebase/auth'

export function useVerifyPathPermission(
  user: User | null | undefined,
  loading: boolean,
) {
  const pathName = usePathname()
  const APP_ROUTES = {
    public: {
      login: '/login',
      first_access: '/signup',
    },
  }
  const router = useRouter()

  const isPublic = Object.values(APP_ROUTES.public).includes(pathName)

  const isHome = pathName === '/'
  // const isSignUp = pathName === '/signup'

  if (!isPublic && !user && !loading) {
    router.push('/login')
  }

  if (isHome && user && !loading) {
    router.push('/dashboard')
  }
}
