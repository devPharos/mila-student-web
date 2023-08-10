import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { ArrowRight, Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface ISecondStepProps {
  changeStep: (step: 'step-1' | 'step-2' | 'step-3') => void
}

export default function SignUpSecondStep({ changeStep }: ISecondStepProps) {
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

  const [user, setUser] = useState<TSignUpSecondStepData | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignUpSecondStepData>({
    resolver: zodResolver(signUpFormSecondStepSchema),
  })

  const handleSignUpSecondStepSubmit: SubmitHandler<TSignUpSecondStepData> = (
    data: TSignUpSecondStepData,
  ) => {
    const userSignUpFirstStepData: TSignUpSecondStepData = {
      password: data.password,
      confirmPassword: data.confirmPassword,
    }

    setUser(userSignUpFirstStepData)

    reset()
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
