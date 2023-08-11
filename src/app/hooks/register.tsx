import {
  User,
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import React, {
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from 'react'
import { auth } from '../api/firebase'
import { LoginFormData } from '../@types/forms'
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { Student } from '../@types/dashboard'

interface IRegisterContext {
  student: Student
  setStudent: React.Dispatch<React.SetStateAction<Student>>
}

export const RegisterContext = createContext<IRegisterContext>(undefined as any)

function RegisterProvider({ children }: { children: React.ReactNode }) {
  const defaultStudent = {
    registrationNumber: null,
    email: null,
    registration: null,
    name: null,
    lastName: null,
    level: null,
    imageUrl: null,
    schedule: null,
    birthDate: null,
    country: null,
    currentGroup: null,
    emailVerified: false,
  }

  const [student, setStudent] = useState<Student>(defaultStudent)

  async function authStateChanged(user: User | null) {
    if (user && user.email) {
      const db = getFirestore()

      const q = query(
        collection(db, 'Students'),
        where('email', '==', user.email),
      )

      onSnapshot(q, (snapshotQuery) => {
        snapshotQuery.forEach((doc) => {
          const newUser = doc.data()

          setStudent({
            ...student,
            email: newUser.email,
            lastName: newUser.lastName,
            level: newUser.level,
            name: newUser.name,
            schedule: newUser.schedule,
            birthDate: newUser.birthDate,
            country: newUser.country,
            registration: newUser.registration,
            registrationNumber: newUser.registrationNumber,
            imageUrl: newUser.imageUrl,
          })
        })
      })
    }
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) =>
      authStateChanged(user),
    )

    return subscriber
  }, [])

  return (
    <RegisterContext.Provider value={{ student, setStudent }}>
      {children}
    </RegisterContext.Provider>
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

const useRegister = () => {
  const context = useContext(RegisterContext)

  return context
}

export { RegisterProvider, useRegister, logIn }
