'use client'

import { Button, Input, Image } from '@nextui-org/react'
import { Fingerprint, AtSign, Lock, ArrowRight, ArrowLeft } from 'lucide-react'
import logo from '../assets/logo.png'
import Link from 'next/link'
import { Steps } from '../components/steps'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [step, setStep] = useState<'step-1' | 'step-2' | 'step-3'>('step-1')
  const router = useRouter()
  const [userExists, setUserExists] = useState<boolean>(false)

  const changeStep = () => {
    switch (step) {
      case 'step-1':
        setStep('step-2')
        break
      case 'step-2':
        setStep('step-3')
    }
  }

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

  const [user, setUser] = useState<TSignUpFirstStepData | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignUpFirstStepData>({
    resolver: zodResolver(signUpFormFirstStepSchema),
  })

  const handleSignUpFirstStepSubmit: SubmitHandler<TSignUpFirstStepData> = (
    data: TSignUpFirstStepData,
  ) => {
    const userSignUpFirstStepData: TSignUpFirstStepData = {
      email: data.email,
      registrationNumber: data.registrationNumber,
    }

    verifyCredentials(userSignUpFirstStepData)

    // changeStep()

    reset()
  }

  const verifyCredentials = async (userData: TSignUpFirstStepData) => {
    let response

    try {
      response = await fetch(
        `${process.env.API_URL}/students/${userData.registrationNumber}/${userData.email}/`,
      )
    } catch (error) {
      console.log(error)
    }

    if (response?.ok) {
      const studentData = await response?.json()
      const studentID = studentData.data.studentID

      const db = getFirestore()

      const docRef = doc(db, 'Students', userData.registrationNumber)

      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const existentUser = {
          email: userData.email,
          registrationNumber: userData.registrationNumber,
        }
        setUserExists(true)
        setUser(existentUser)
      } else {
        console.log('nao existe')
      }

      return studentID
    } else {
      console.log('')
    }
  }

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="bg-primary"></div>
      <div className="bg-neutral-lighter flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full flex flex-col items-center gap-14">
          <Steps step={step} />

          <Image
            width={130}
            src={logo.src}
            alt=""
            loading="lazy"
            className="rounded-none"
          />

          <div className="w-full">
            {step === 'step-1' ? (
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
                        errors.registrationNumber
                          ? 'text-error'
                          : 'text-neutral'
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
                  className={
                    userExists ? 'hidden' : 'bg-primary text-white w-full'
                  }
                  endContent={<ArrowRight size={20} />}
                  radius="md"
                  type="submit"
                  isDisabled={userExists}
                >
                  Continue
                </Button>
              </form>
            ) : step === 'step-2' ? (
              <>
                <Input
                  label="Password"
                  isRequired
                  classNames={{
                    label: 'text-neutral',
                    input: ['bg-white', 'text-neutral-dark'],
                  }}
                  startContent={
                    <Lock
                      className="text-neutral"
                      strokeWidth={1.5}
                      size={20}
                    />
                  }
                />

                <Input
                  label="Confirm your password"
                  isRequired
                  classNames={{
                    label: 'text-neutral',
                    input: ['bg-white', 'text-neutral-dark'],
                  }}
                  startContent={
                    <Lock
                      className="text-neutral"
                      strokeWidth={1.5}
                      size={20}
                    />
                  }
                />
              </>
            ) : (
              <>
                <div className="flex flex-col items-center text-center">
                  <span className="text-md font-semibold text-neutral-dark">
                    One last step!
                  </span>
                  <span className="text-sm text-neutral">
                    In a few moments you are going to receive a verification
                    email.
                  </span>
                  <span className="text-sm text-neutral">
                    Please click on the link to finish your registration process
                  </span>
                </div>
              </>
            )}
          </div>

          <Link
            href="/login"
            className={
              userExists ? 'hidden' : 'font-semibold text-primary text-sm'
            }
          >
            Back to Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
