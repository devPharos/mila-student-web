'use client'

import { Image } from '@nextui-org/react'
import logo from '../assets/logo.png'
import { Steps } from '../components/steps'
import { useState } from 'react'
import SignUpFirstStep from '../components/signUpSteps/firstStep'
import Link from 'next/link'
import SignUpSecondStep from '../components/signUpSteps/secondStep'
export default function SignUp() {
  const [step, setStep] = useState<'step-1' | 'step-2' | 'step-3'>('step-1')
  const [userExists, setUserExists] = useState<boolean>(false)

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
    // setUserExists(exists)
    setUserExists(false)
    setStep('step-2')
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
              <SignUpFirstStep
                checkIfUserExists={checkIfUserExists}
                changeStep={changeStep}
              />
            ) : step === 'step-2' ? (
              <SignUpSecondStep changeStep={changeStep} />
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
