'use client'

import { Button, Input, Image } from '@nextui-org/react'
import { Fingerprint, AtSign, Lock, ArrowRight } from 'lucide-react'
import logo from '../assets/logo.png'
import Link from 'next/link'
import { Steps } from '../components/steps'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function SignUp() {
  const [step, setStep] = useState<'step-1' | 'step-2' | 'step-3'>('step-1')

  const changeStep = () => {
    switch (step) {
      case 'step-1':
        setStep('step-2')
        break
      case 'step-2':
        setStep('step-3')
    }
  }

  const signUpFormSchema = z.object({
    registrationNumber: z
      .string()
      .toUpperCase()
      .min(1, 'Type your registration number'),
    email: z.string().email({
      message: 'Type a valid e-mail',
    }),
    password: z.string().min(8, 'Type a valid password'),
    confirmPassword: z.string().min(8, 'Type a valid password'),
  })

  type TSignUpData = z.infer<typeof signUpFormSchema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignUpData>({
    resolver: zodResolver(signUpFormSchema),
  })

  const handleSignUpSubmit: SubmitHandler<TSignUpData> = (
    data: TSignUpData,
  ) => {
    const userSignUpData: TSignUpData = {
      email: data.email,
      password: data.password,
      registrationNumber: data.registrationNumber,
      confirmPassword: data.confirmPassword,
    }

    reset()
  }

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="bg-primary"></div>
      <div className="bg-neutral-lighter flex flex-col items-center justify-center p-6">
        <form
          className="max-w-sm w-full flex flex-col items-center gap-14"
          onSubmit={handleSubmit(handleSignUpSubmit)}
        >
          <Steps step={step} />

          <Image
            width={130}
            src={logo.src}
            alt=""
            loading="lazy"
            className="rounded-none"
          />

          <div className="flex flex-col gap-6 w-full">
            {step === 'step-1' ? (
              <>
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
                  isRequired
                  classNames={{
                    label: 'text-neutral',
                    input: ['bg-white', 'text-neutral-dark'],
                  }}
                  startContent={
                    <AtSign
                      className="text-neutral"
                      strokeWidth={1.5}
                      size={20}
                    />
                  }
                />
              </>
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

          <Button
            className={
              step === 'step-3' ? 'hidden' : 'bg-primary text-white w-full'
            }
            endContent={<ArrowRight size={20} />}
            radius="md"
            onClick={changeStep}
            type="submit"
          >
            Continue
          </Button>

          <Link href="/login" className="font-semibold text-primary text-sm">
            Back to Log In
          </Link>
        </form>
      </div>
    </div>
  )
}
