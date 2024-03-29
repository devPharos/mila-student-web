'use client'

import { Fingerprint, AtSign, Lock, LogIn } from 'lucide-react'
import { Image, Input, Button } from '@nextui-org/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import logo from '../../assets/logo.svg'
import Link from 'next/link'
import * as dotenv from 'dotenv'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { logIn } from '@/app/hooks/register'
import { Header } from '@/app/components/header'

export default function Login() {
  dotenv.config()

  const [credentialError, setCredentialError] = useState<boolean>(false)
  const [loginLoading, setLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  let emailFromSignUp = ''
  let registrationNumberFromSignUp = ''
  const existentUserCredentials = Array.from(searchParams.values())

  if (existentUserCredentials.length !== 0) {
    emailFromSignUp = existentUserCredentials[0]
    registrationNumberFromSignUp = existentUserCredentials[1]
  }

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

  const verifyUser = async (userData: TLoginFormData) => {
    let response

    setLoading(true)

    try {
      response = await fetch(
        `${
          process.env.API_URL
        }/students/${userData.registrationNumber.toUpperCase()}/${userData.email.toLowerCase()}/`,
      )
    } catch (error) {
      setLoading(false)

      console.log(error)
    }

    if (response?.ok) {
      const data = await response?.json()

      if (data.Sucesso) {
        logIn(userData, setCredentialError, setLoading)
      }
    } else {
      setLoading(false)
      setCredentialError(true)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const handleLoginSubmit: SubmitHandler<TLoginFormData> = (
    data: TLoginFormData,
  ) => {
    const userLoginData: TLoginFormData = {
      email: data.email.toLowerCase(),
      password: data.password,
      registrationNumber: data.registrationNumber.toUpperCase(),
    }

    verifyUser(userLoginData)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header studentData={null} />
      <form
        action=""
        className="bg-neutral-lighter flex flex-col flex-1 items-center justify-center p-6 w-full"
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <div className="max-w-sm w-full flex flex-col items-center gap-8">
          <Image
            width={130}
            src={logo.src}
            alt="Mila logo"
            title="Mila logo"
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
              defaultValue={registrationNumberFromSignUp}
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
              defaultValue={emailFromSignUp}
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
            isLoading={loginLoading}
          >
            Log In
          </Button>

          <Link href="/forgot" className="w-full">
            <Button
              className="border border-gray-300 bg-inherit text-primary w-full hover:bg-gray-300"
              radius="md"
              type="button"
            >
              I Forgot my password
            </Button>
          </Link>

          <Link href="/signup" className="font-semibold text-primary text-sm">
            This is my first access
          </Link>
        </div>
      </form>
    </div>
  )
}
