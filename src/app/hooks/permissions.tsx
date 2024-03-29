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
      forgot: '/forgot',
    },
  }
  const router = useRouter()

  const isPublic = Object.values(APP_ROUTES.public).includes(pathName)

  const isSignUp = pathName === '/signup'

  const isHome = pathName === '/'

  if (!isPublic && !user && !loading) {
    router.push('/login')
  }

  if ((isPublic || isHome) && !isSignUp && user && !loading) {
    router.push('/dashboard')
  }
}
