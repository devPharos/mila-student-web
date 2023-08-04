'use client'

import { Fingerprint, AtSign, Lock, LogIn } from 'lucide-react'
import { Image, Input, Button } from '@nextui-org/react'
import logo from '../assets/logo.png'
import Link from 'next/link'
import { z } from 'zod'
import { useState } from 'react'

export default function Login() {
  const [value, setValue] = useState<string | undefined>('')
  const [validateEmail, setValidateEmail] = useState<
    'invalid' | 'valid' | undefined
  >(undefined)

  const emailSchema = z.string().email()

  function handleEmailValidation() {
    try {
      emailSchema.parse(value)
      setValidateEmail('valid')
    } catch (error) {
      setValidateEmail('invalid')
    }
  }

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="bg-primary"></div>
      <div className="bg-neutral-lighter flex flex-col items-center justify-center p-6">
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
              isRequired
              classNames={{
                label: 'text-neutral',
                input: ['bg-white', 'text-neutral-dark'],
              }}
              startContent={
                <Fingerprint
                  className="text-neutral"
                  strokeWidth={1.5}
                  size={20}
                />
              }
            />

            <Input
              label="Email"
              type="email"
              isRequired
              classNames={{
                label: 'text-neutral',
                input: [
                  'bg-white',
                  validateEmail === 'invalid'
                    ? 'text-error'
                    : 'text-neutral-dark',
                ],
              }}
              startContent={
                <AtSign
                  className={
                    validateEmail === 'invalid' ? 'text-error' : 'text-neutral'
                  }
                  strokeWidth={1.5}
                  size={20}
                />
              }
              value={value}
              onValueChange={setValue}
              validationState={validateEmail}
              errorMessage={
                validateEmail === 'invalid' && 'Please enter a valid email'
              }
            />

            <Input
              label="Password"
              type="password"
              isRequired
              classNames={{
                label: 'text-neutral',
                input: ['bg-white', 'text-neutral-dark'],
              }}
              startContent={
                <Lock className="text-neutral" strokeWidth={1.5} size={20} />
              }
            />
          </div>

          <Button
            className="bg-primary text-white w-full"
            endContent={<LogIn size={20} />}
            radius="md"
            onClick={handleEmailValidation}
          >
            Log In
          </Button>

          <Link href="/signup" className="font-semibold text-primary text-sm">
            This is my first access
          </Link>
        </div>
      </div>
    </div>
  )
}
