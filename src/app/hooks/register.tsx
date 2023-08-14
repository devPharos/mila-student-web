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
import {
  Dashboard,
  Student,
  StudentFrequency,
  StudentGroup,
  StudentPeriod,
} from '../@types/dashboard'

interface IRegisterContext {
  student: Student
  setStudent: React.Dispatch<React.SetStateAction<Student>>
  dashboard: Dashboard
  period: StudentPeriod | null
  periods: StudentPeriod[]
  periodDate: string | null
  periodDates: string[]
  group: StudentGroup | null
  setGroup: React.Dispatch<React.SetStateAction<StudentGroup | null>>
  groups: StudentGroup[]
  frequency: StudentFrequency[]
  updateDashboard: (data: any) => void
}

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

const defaultDashboard = { data: {}, fromDate: new Date() }

export const RegisterContext = createContext<IRegisterContext>(
  defaultStudent as any,
)

function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student>(defaultStudent)
  const [dashboard, setDashboard] = useState<Dashboard>(defaultDashboard)

  const [period, setPeriod] = useState<StudentPeriod | null>(null)
  const [periods, setPeriods] = useState<StudentPeriod[]>([])

  const [periodDate, setPeriodDate] = useState<string | null>(null)
  const [periodDates, setPeriodDates] = useState<string[]>([])

  const [group, setGroup] = useState<StudentGroup | null>(null)
  const [groups, setGroups] = useState<StudentGroup[]>([])

  const [frequency, setFrequency] = useState<StudentFrequency[]>([])

  async function findUnique(datas: StudentPeriod[]) {
    const unique: string[] = []
    datas.forEach((data: StudentPeriod) => {
      if (!unique.includes(data.period)) {
        unique.push(data.period)
      }
    })
    return unique
  }

  async function getDashboardData(studentRegistration: number | null) {
    if (student) {
      try {
        const response = await fetch(
          `${process.env.API_URL}/students/dashboard/${studentRegistration}`,
        )
        const data = await response.json()
        const today = new Date()
        const month = today.getMonth()
        const year = today.getFullYear()
        const thisPeriod = year + '-' + (month + 1).toString().padStart(2, '0')

        setDashboard({ ...dashboard, ...data.data, fromDate: new Date() })
        data.data.periods.forEach((p: StudentPeriod) => {
          if (p.period === thisPeriod) {
            setPeriod(p)
          }
        })

        setPeriods(data.data.periods)
        setGroups(data.data.groups)
        setFrequency(data.data.frequency)

        const myPeriods = await findUnique(data.data.periods.reverse())
        setPeriodDates(myPeriods)
        setPeriodDate(thisPeriod)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function updateDashboard(data: any) {
    setDashboard({ ...dashboard, data, fromDate: new Date() })
  }

  async function authStateChanged(user: User | null) {
    if (user && user.email) {
      const db = getFirestore()

      const q = query(
        collection(db, 'Students'),
        where('email', '==', user.email),
      )

      onSnapshot(q, (snapshotQuery) => {
        snapshotQuery.forEach(async (doc) => {
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

          await getDashboardData(newUser.registration)
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
    <RegisterContext.Provider
      value={{
        updateDashboard,
        student,
        setStudent,
        dashboard,
        period,
        periods,
        frequency,
        group,
        setGroup,
        groups,
        periodDate,
        periodDates,
      }}
    >
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
