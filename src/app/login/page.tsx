'use client'

import { Fingerprint, AtSign, Lock, LogIn } from 'lucide-react'
import { Image, Input, Button } from '@nextui-org/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import logo from '../assets/logo.png'
import Link from 'next/link'
import * as dotenv from 'dotenv'
import {
  EmailAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../api/firebase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Router } from 'next/router'

export default function Login() {
  dotenv.config()

  const [credentialError, setCredentialError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()
  const userAuth = useAuth()

  const handleRouteChangeComplete = () => {
    if (userAuth.user) {
      router.push('/dashboard')
    }
  }

  Router.events.on('routeChangeComplete', handleRouteChangeComplete)

  const loginFormSchema = z.object({
    registrationNumber: z
      .string()
      .toUpperCase()
      .min(1, 'Type your registration number'),
    email: z.string().email({
      message: 'Type a valid e-mail',
    }),
    password: z.string().min(8, 'Type a valid password'),
  })

  type TLoginFormData = z.infer<typeof loginFormSchema>

  const handleLogin = (userData: TLoginFormData, data: any) => {
    if (data.Sucesso) {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(
            auth,
            userData.email,
            userData.password,
          )
            .then(() => {
              setLoading(true)

              EmailAuthProvider.credential(userData.email, userData.password)

              router.push('/dashboard')
            })
            .catch((error) => {
              const errorStatusCode = error.code
              const errorMessage = error.message

              console.log(errorStatusCode, errorMessage)

              setLoading(false)
              setCredentialError(true)
            })
        })
        .catch((error) => {
          const errorStatusCode = error.code
          const errorMessage = error.message

          console.log(errorStatusCode, errorMessage)
        })
    }
  }

  const verifyUser = async (userData: TLoginFormData) => {
    let response

    try {
      response = await fetch(
        `${process.env.API_URL}/students/${userData.registrationNumber}/${userData.email}/`,
      )

      setLoading(true)
    } catch (error) {
      setLoading(false)

      console.log(error)
    }

    if (response?.ok) {
      const data = await response?.json()

      handleLogin(userData, data)
    } else {
      setLoading(false)
      setCredentialError(true)
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const handleLoginSubmit: SubmitHandler<TLoginFormData> = (
    data: TLoginFormData,
  ) => {
    const userLoginData: TLoginFormData = {
      email: data.email,
      password: data.password,
      registrationNumber: data.registrationNumber,
    }

    verifyUser(userLoginData)

    reset()
  }

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="bg-primary"></div>
      <form
        action=""
        className="bg-neutral-lighter flex flex-col items-center justify-center p-6 w-full"
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <div className="max-w-sm w-full flex flex-col items-center gap-14">
          <Image
            width={130}
            src={logo.src}
            alt=""
            loading="lazy"
            radius="none"
          />

          <div className="flex flex-col gap-6 w-full">
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
              type="email"
              id="email"
              classNames={{
                label: 'text-neutral',
                input: ['text-neutral-dark'],
                errorMessage: 'text-error',
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

            <Input
              label="Password"
              type="password"
              id="password"
              classNames={{
                label: 'text-neutral',
                input: ['bg-white', 'text-neutral-dark'],
              }}
              startContent={
                <Lock
                  className={errors.password ? 'text-error' : 'text-neutral'}
                  strokeWidth={1.5}
                  size={20}
                />
              }
              errorMessage={errors.password?.message}
              validationState={errors.password && 'invalid'}
              {...register('password')}
            />

            {credentialError && (
              <span className="text-sm text-error">
                Review your credentials
              </span>
            )}
          </div>

          <Button
            className="bg-primary text-white w-full"
            endContent={<LogIn size={20} />}
            radius="md"
            type="submit"
            isLoading={loading}
          >
            Log In
          </Button>

          <Link href="/signup" className="font-semibold text-primary text-sm">
            This is my first access
          </Link>
        </div>
      </form>
    </div>
  )
}
