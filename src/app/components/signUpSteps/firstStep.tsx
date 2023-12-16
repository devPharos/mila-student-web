import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { ArrowLeft, ArrowRight, AtSign, Fingerprint } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface IUserFirstStepData {
  email: string
  registrationNumber: string
  studentID: number
}

interface IFirstStepProps {
  checkIfUserExists: (exists: boolean) => void
  changeStep: (step: 'step-1' | 'step-2' | 'step-3') => void
  handleUserFirstStepData: (user: IUserFirstStepData) => void
}

export default function SignUpFirstStep({
  checkIfUserExists,
  changeStep,
  handleUserFirstStepData,
}: IFirstStepProps) {
  const [userExists, setUserExists] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const signUpFormFirstStepSchema = z.object({
    registrationNumber: z
      .string()
      .toUpperCase()
      .min(1, 'Type your registration number'),
    email: z.string().email({
      message: 'Type a valid e-mail',
    }),
  })

  type TSignUpFirstStepData = z.infer<typeof signUpFormFirstStepSchema>

  interface IUserFirstStepData extends TSignUpFirstStepData {
    studentID: number
  }

  const [user, setUser] = useState<IUserFirstStepData | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFirstStepData>({
    resolver: zodResolver(signUpFormFirstStepSchema),
  })

  const handleSignUpFirstStepSubmit: SubmitHandler<TSignUpFirstStepData> = (
    data: TSignUpFirstStepData,
  ) => {
    const userSignUpFirstStepData: TSignUpFirstStepData = {
      email: data.email.toLowerCase(),
      registrationNumber: data.registrationNumber.toUpperCase(),
    }

    verifyCredentials(userSignUpFirstStepData)
  }

  const verifyCredentials = async (userData: TSignUpFirstStepData) => {
    let response

    setLoading(true)

    try {
      response = await fetch(
        `${process.env.API_URL}/students/${userData.registrationNumber.toUpperCase()}/${userData.email.toLowerCase()}/`,
      )
    } catch (error) {
      console.log(error)
    }

    if (response?.ok) {
      const studentData = await response?.json()
      const studentID = studentData.data.studentID

      const db = getFirestore()

      const docRef = doc(db, 'Students', userData.registrationNumber.toUpperCase())

      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const existentUser = {
          email: userData.email.toLowerCase(),
          registrationNumber: userData.registrationNumber.toUpperCase(),
          studentID,
        }

        setUserExists(true)
        setUser(existentUser)
        setLoading(true)
        checkIfUserExists(true)
      } else {
        changeStep('step-1')

        const partialUserData: IUserFirstStepData = {
          email: userData.email.toLowerCase(),
          registrationNumber: userData.registrationNumber.toUpperCase(),
          studentID,
        }

        handleUserFirstStepData(partialUserData)

        setUser(partialUserData)

        setLoading(false)
      }

      return studentID
    } else {
      setLoading(false)
    }
  }

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(handleSignUpFirstStepSubmit)}
        className="flex flex-col gap-6 w-full"
      >
        <Input
          label="Registration number"
          id="registrationNumber"
          classNames={{
            label: 'text-neutral',
            input: ['bg-white', 'text-neutral-dark'],
          }}
          startContent={
            <Fingerprint
              className={
                errors.registrationNumber ? 'text-error' : 'text-neutral'
              }
              strokeWidth={1.5}
              size={20}
            />
          }
          errorMessage={errors.registrationNumber?.message}
          validationState={errors.registrationNumber && 'invalid'}
          {...register('registrationNumber')}
        />

        <Input
          label="Email"
          classNames={{
            label: 'text-neutral',
            input: ['bg-white', 'text-neutral-dark'],
          }}
          startContent={
            <AtSign
              className={errors.email ? 'text-error' : 'text-neutral'}
              strokeWidth={1.5}
              size={20}
            />
          }
          errorMessage={errors.email?.message}
          validationState={errors.email && 'invalid'}
          {...register('email')}
        />

        <span className={userExists ? 'text-error' : 'hidden'}>
          You already have an account
        </span>

        <Link
          className={
            userExists
              ? 'flex items-center justify-center gap-2 rounded-xl text-white bg-primary p-2'
              : 'hidden'
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

        <Button
          className={userExists ? 'hidden' : 'bg-primary text-white w-full'}
          endContent={<ArrowRight size={20} />}
          radius="md"
          type="submit"
          isLoading={loading}
        >
          Continue
        </Button>
      </form>
    </>
  )
}
