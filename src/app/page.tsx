'use client'

import { Button, Image, Input } from '@nextui-org/react'
import { Providers } from './providers'
import logo from './assets/logo.png'
import { AtSign, Fingerprint, Lock, LogIn } from 'lucide-react'

export default function Home() {
  return (
    <Providers>
      <div className="grid grid-cols-2 min-h-screen">
        <div className="bg-primary"></div>
        <div className="flex flex-col items-center justify-center p-6">
          <div className="max-w-sm w-full flex flex-col items-center gap-14">
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
                  <AtSign
                    className="text-neutral"
                    strokeWidth={1.5}
                    size={20}
                  />
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
            >
              Log In
            </Button>

            <span className="font-semibold text-primary text-sm">
              This is my first access
            </span>
          </div>
        </div>
      </div>
    </Providers>
  )
}
