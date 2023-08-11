import { auth } from '@/app/api/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { ArrowRight, Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface IUserFirstStepData {
  email: string
  registrationNumber: string
  studentID: number
}

interface IUserData extends IUserFirstStepData {
  password: string
}

interface ISecondStepProps {
  changeStep: (step: 'step-1' | 'step-2' | 'step-3') => void
  userFirstStepData: IUserFirstStepData
}

export default function SignUpSecondStep({
  changeStep,
  userFirstStepData,
}: ISecondStepProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false)
  const signUpFormSecondStepSchema = z
    .object({
      password: z.string().min(8, 'Type your password'),
      confirmPassword: z.string().min(8, 'Type your password'),
    })
    .refine(
      (userPasswords) =>
        userPasswords.password === userPasswords.confirmPassword,
      { message: 'Passwords do not match', path: ['confirmPassword'] },
    )

  type TSignUpSecondStepData = z.infer<typeof signUpFormSecondStepSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSecondStepData>({
    resolver: zodResolver(signUpFormSecondStepSchema),
  })

  const handleSignUpSecondStepSubmit: SubmitHandler<TSignUpSecondStepData> = (
    data: TSignUpSecondStepData,
  ) => {
    const userSignUpSecondStepData: IUserData = {
      email: userFirstStepData?.email,
      registrationNumber: userFirstStepData?.registrationNumber,
      studentID: userFirstStepData?.studentID,
      password: data.password,
    }

    try {
      createUserWithEmailAndPassword(
        auth,
        userSignUpSecondStepData.password,
        userSignUpSecondStepData.email,
      )
        .then(() => {
          const db = getFirestore()

          const docRef = doc(
            db,
            'Students',
            userSignUpSecondStepData.registrationNumber,
          )

          updateDoc(docRef, {
            type: 'Student',
            email: userSignUpSecondStepData.email,
            registration: userSignUpSecondStepData.studentID,
            registrationNumber: userSignUpSecondStepData.registrationNumber,
            imageUrl: null,
            name: null,
            level: null,
            birthDate: null,
            country: null,
            createdAt: new Date(),
          })

          changeStep('step-2')
        })
        .catch((error) => {
          const errorStatusCode = error.code
          const errorMessage = error.message

          console.log(errorStatusCode, errorMessage)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handlePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible)

  const handleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

  return (
    <>
      <form
        action=""
        className="flex flex-col gap-6 w-full"
        onSubmit={handleSubmit(handleSignUpSecondStepSubmit)}
      >
        <Input
          label="Password"
          id="password"
          type={isPasswordVisible ? 'text' : 'password'}
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
          endContent={
            isPasswordVisible ? (
              <Eye
                size={20}
                strokeWidth={1.5}
                className={
                  errors.password
                    ? 'text-error cursor-pointer'
                    : 'cursor-pointer text-neutral'
                }
                onClick={handlePasswordVisibility}
              />
            ) : (
              <EyeOff
                size={20}
                strokeWidth={1.5}
                className={
                  errors.password
                    ? 'text-error cursor-pointer'
                    : 'cursor-pointer text-neutral'
                }
                onClick={handlePasswordVisibility}
              />
            )
          }
          errorMessage={errors.password?.message}
          validationState={errors.password && 'invalid'}
          {...register('password')}
        />

        <Input
          label="Confirm your password"
          id="confirmPassword"
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          classNames={{
            label: 'text-neutral',
            input: ['bg-white', 'text-neutral-dark'],
          }}
          startContent={
            <Lock
              className={errors.confirmPassword ? 'text-error' : 'text-neutral'}
              strokeWidth={1.5}
              size={20}
            />
          }
          endContent={
            isConfirmPasswordVisible ? (
              <Eye
                size={20}
                strokeWidth={1.5}
                className={
                  errors.confirmPassword
                    ? 'text-error cursor-pointer'
                    : 'cursor-pointer text-neutral'
                }
                onClick={handleConfirmPasswordVisibility}
              />
            ) : (
              <EyeOff
                size={20}
                strokeWidth={1.5}
                className={
                  errors.confirmPassword
                    ? 'text-error cursor-pointer'
                    : 'cursor-pointer text-neutral'
                }
                onClick={handleConfirmPasswordVisibility}
              />
            )
          }
          errorMessage={errors.confirmPassword?.message}
          validationState={errors.confirmPassword && 'invalid'}
          {...register('confirmPassword')}
        />

        <Button
          className={'bg-primary text-white w-full'}
          endContent={<ArrowRight size={20} />}
          radius="md"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </>
  )
}
