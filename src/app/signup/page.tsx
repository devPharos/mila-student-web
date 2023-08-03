'use client'

import { Button, Input, Image } from '@nextui-org/react'
import { Fingerprint, AtSign, LogIn, Lock, ArrowRight } from 'lucide-react'
import logo from '../assets/logo.png'
import Link from 'next/link'
import { Steps } from '../components/steps'

export default function SignUp() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="bg-primary"></div>
      <div className="bg-neutral-lighter flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full flex flex-col items-center gap-14">
          <Steps />

          <Image width={130} src={logo.src} alt="" loading="lazy" />

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
              isRequired
              classNames={{
                label: 'text-neutral',
                input: ['bg-white', 'text-neutral-dark'],
              }}
              startContent={
                <AtSign className="text-neutral" strokeWidth={1.5} size={20} />
              }
            />
          </div>

          <Button
            className="bg-primary text-white w-full"
            endContent={<ArrowRight size={20} />}
            radius="md"
          >
            Continue
          </Button>

          <Link href="/login" className="font-semibold text-primary text-sm">
            Back to Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
