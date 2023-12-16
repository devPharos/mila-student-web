'use client'

import { AtSign, Send } from 'lucide-react'
import { Image, Input, Button } from '@nextui-org/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import logo from '../../assets/logo.svg'
import Link from 'next/link'
import * as dotenv from 'dotenv'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/app/components/header'
import { forgotPW } from '@/app/hooks/register'

export default function Login() {
  dotenv.config()
  const [credentialError, setCredentialError] = useState<boolean>(false)
  const [recoverySent, setRecoverySent] = useState<boolean>(false)
  const [loginLoading, setLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  let emailFromSignUp = ''
  const existentUserCredentials = Array.from(searchParams.values())

  if (existentUserCredentials.length !== 0) {
    emailFromSignUp = existentUserCredentials[0]
  }

  const loginFormSchema = z.object({
    email: z.string().email({
      message: 'Type a valid e-mail',
    }),
  })

  type TLoginFormData = z.infer<typeof loginFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const handleLoginSubmit: SubmitHandler<TLoginFormData> = async (
    data: TLoginFormData,
  ) => {
    setRecoverySent(false)
    setCredentialError(false)
    setLoading(true)
    const userLoginData: TLoginFormData = {
      email: data.email.toLowerCase(),
    }

    await forgotPW(userLoginData, setCredentialError, setRecoverySent)
    setLoading(false)
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

          {recoverySent ? (
            <div className="border border-gray-300 text-center p-8">
              <span className="text-sm text-primary text-lg">
                Email sent!
                <br />
                Please check your inbox.
              </span>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6 w-full">
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

                {credentialError && (
                  <span className="text-sm text-error">Email not found.</span>
                )}
              </div>
              <Button
                className="bg-gray-300 text-primary w-full"
                endContent={<Send size={20} />}
                radius="md"
                type="submit"
                isLoading={loginLoading}
              >
                Send me a recovery email
              </Button>
            </>
          )}

          <Link href="/login" className="font-semibold text-primary text-sm">
            Back to login page
          </Link>
        </div>
      </form>
    </div>
  )
}
