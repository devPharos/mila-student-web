import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface IUserData {
  email: string
  registrationNumber: string
}

interface IThirdStepData {
  user: IUserData
}

export default function SignUpThirdStep({ user }: IThirdStepData) {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <span className="text-md font-semibold text-success-dark">
          Account created successfuly!
        </span>
        <span className="text-sm text-neutral">
          Go back to login and sign in!
        </span>

        <Link
          className={
            'flex items-center justify-center gap-2 rounded-xl text-white bg-primary p-2'
          }
          href={{
            pathname: '/login',
            query: {
              email: user?.email,
              registrationNumber: user?.registrationNumber,
            },
          }}
        >
          <ArrowLeft size={20} className="text-white" />
          Back to login
        </Link>
      </div>
    </>
  )
}
