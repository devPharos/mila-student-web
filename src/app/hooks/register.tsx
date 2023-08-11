import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import React, {
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react'
import { auth } from '../api/firebase'
import { LoginFormData } from '../@types/forms'

export const RegisterContext = createContext([])

function RegisterProvider({ children }: { children: React.ReactNode }) {
  const defaultStudent = {
    registrationNumber: null,
    email: null,
    registration: null,
    pass: null,
    pass_confirm: null,
    name: null,
    level: null,
    imageUrl: null,
    schedule: null,
    birthDate: null,
    country: null,
    currentGroup: null,
    emailVerified: false,
  }

  return (
    <RegisterContext.Provider value={[]}>{children}</RegisterContext.Provider>
  )
}

const logIn = (
  userFormData: LoginFormData,
  setLoginError: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(
        auth,
        userFormData.email,
        userFormData.password,
      )
        .then(() => {
          setLoading(true)
        })
        .catch((error) => {
          const errorStatusCode = error.code
          const errorMessage = error.message

          console.log(errorStatusCode, errorMessage)

          setLoading(false)
          setLoginError(true)
        })
    })
    .catch((error) => {
      const errorStatusCode = error.code
      const errorMessage = error.message

      console.log(errorStatusCode, errorMessage)
    })
}

function useRegister() {
  const context = useContext(RegisterContext)

  return context
}

export { RegisterProvider, useRegister, logIn }
