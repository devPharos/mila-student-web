'use client'

import { Image } from '@nextui-org/react'
import logo from '../../assets/logo.png'
import { Steps } from '../../components/steps'
import { useState } from 'react'
import SignUpFirstStep from '../../components/signUpSteps/firstStep'
import Link from 'next/link'
import SignUpSecondStep from '../../components/signUpSteps/secondStep'
import { Header } from '@/app/components/header'
export default function SignUp() {
  interface IUserFirstStepData {
    email: string
    registrationNumber: string
    studentID: number
  }

  const defaultUser: IUserFirstStepData = {
    email: '',
    registrationNumber: '',
    studentID: 0,
  }

  const [step, setStep] = useState<'step-1' | 'step-2' | 'step-3'>('step-1')
  const [userExists, setUserExists] = useState<boolean>(false)
  const [user, setUser] = useState<IUserFirstStepData>(defaultUser)

  const changeStep = (step: 'step-1' | 'step-2' | 'step-3') => {
    switch (step) {
      case 'step-1':
        setStep('step-2')
        break
      case 'step-2':
        setStep('step-3')
    }
  }

  const checkIfUserExists = (exists: boolean) => {
    setUserExists(exists)
  }

  const handleUserFirstStepData = (user: IUserFirstStepData) => {
    setUser(user)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header studentData={null} />
      <div className="bg-neutral-lighter flex flex-col flex-1 items-center justify-center p-6">
        <div className="max-w-sm w-full flex flex-col items-center gap-14">
          <Steps step={step} />

          <Image
            width={130}
            src={logo.src}
            alt="Mila logo"
            title="Mila logo"
            loading="lazy"
            className="rounded-none"
          />

          <div className="w-full">
            {step === 'step-1' ? (
              <SignUpFirstStep
                checkIfUserExists={checkIfUserExists}
                changeStep={changeStep}
                handleUserFirstStepData={handleUserFirstStepData}
              />
            ) : (
              <SignUpSecondStep
                changeStep={changeStep}
                userFirstStepData={user}
                step={step}
              />
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
