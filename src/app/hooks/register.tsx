import {
  User,
  browserSessionPersistence,
  onAuthStateChanged,
  sendPasswordResetEmail,
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
import { LoginFormData, ForgotFormData } from '../@types/forms'
import {
  DocumentData,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import {
  Dashboard,
  Student,
  StudentFrequency,
  StudentGroup,
  StudentPeriod,
} from '../@types/dashboard'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import CapitalizeWord from '../functions/auxiliar'

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
  setGroups: React.Dispatch<React.SetStateAction<StudentGroup[]>>
  frequency: StudentFrequency[]
  params: {
    maxAbsenses: number
    contactEmail: string
    contact_orl: string
    contact_mia: string
    allowed_users: string
    limit_periods_to_students: number
  }
  updateProfilePic: (
    registrationNumber: string,
    email: string,
    file: Blob,
  ) => void
  updateDashboard: (data: unknown) => void
  setPeriodDate: React.Dispatch<React.SetStateAction<string | null>>
  setInitializing: React.Dispatch<React.SetStateAction<boolean>>
  setPeriodGroups: React.Dispatch<React.SetStateAction<StudentGroup[]>>
  periodGroups: StudentGroup[]
  initializing: boolean
  getDashboardData: (
    studentRegistration: number | null,
    selectedPeriod?: string,
  ) => Promise<void>
}

const defaultStudent = {
  registrationNumber: '',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultStudent as any,
)

function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [initializing, setInitializing] = useState(true)
  const [student, setStudent] = useState<Student>(defaultStudent)
  const [dashboard, setDashboard] = useState<Dashboard>(defaultDashboard)
  const [params, setParams] = useState<{
    maxAbsenses: number
    contactEmail: string
    contact_orl: string
    contact_mia: string
    allowed_users: string
    limit_periods_to_students: number
  }>({
    maxAbsenses: 0,
    contactEmail: '',
    contact_orl: '',
    contact_mia: '',
    allowed_users: '',
    limit_periods_to_students: 0,
  })

  const [period, setPeriod] = useState<StudentPeriod | null>(null)
  const [periods, setPeriods] = useState<StudentPeriod[]>([])

  const [periodDate, setPeriodDate] = useState<string | null>(null)
  const [periodDates, setPeriodDates] = useState<string[]>([])

  const [group, setGroup] = useState<StudentGroup | null>(null)
  const [groups, setGroups] = useState<StudentGroup[]>([])
  const [periodGroups, setPeriodGroups] = useState<StudentGroup[]>([])

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

  async function getDashboardData(
    studentRegistration: number | null,
    selectedPeriod?: string,
  ) {
    if (student) {
      try {
        setInitializing(true)
        const today = new Date()
        const month = today.getMonth()
        const year = today.getFullYear()
        const thisPeriod = year + '-' + (month + 1).toString().padStart(2, '0')
        const period = selectedPeriod || thisPeriod
        const response = await fetch(
          `${process.env.API_URL}/students/dashboard/${studentRegistration}`,
        )
        const data = await response.json()

        setDashboard({ ...dashboard, ...data.data, fromDate: new Date() })
        data.data.periods.forEach((p: StudentPeriod) => {
          if (p.period === period) {
            setPeriod(p)
          }
        })

        setPeriods(data.data.periods)
        setGroups(data.data.groups)
        setFrequency(data.data.frequency)

        const myPeriods = await findUnique(data.data.periods.reverse())
        setPeriodDates(myPeriods)
        setPeriodDate(period)
        setInitializing(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function updateDashboard(data: unknown) {
    setDashboard({ ...dashboard, data, fromDate: new Date() })
  }

  async function authStateChanged(user: User | null) {
    if (user && user.email?.toLowerCase()) {
      const db = getFirestore()

      onSnapshot(query(collection(db, 'Params')), (snapshotQuery) => {
        snapshotQuery.forEach(async (doc) => {
          const data = doc.data()
          setParams({ ...params, ...data })
        })
      })

      const q = query(
        collection(db, 'Students'),
        where('email', '==', user.email.toLowerCase()),
      )

      onSnapshot(q, (snapshotQuery) => {
        snapshotQuery.forEach(async (doc) => {
          const newUser = doc.data()
          await getStudentData(newUser)

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

  async function getStudentData(user: DocumentData) {
    try {
      const response = await fetch(
        `${process.env.API_URL}/students/${user.registration}`,
      )
      const data = await response.json()

      let lastName = ''

      const lastNameArr: string[] = data.data.lastName.split(' ')

      lastNameArr.forEach((value: string, index: number) => {
        if (lastName.trim() !== '') {
          lastName += ' '
        }

        if (lastNameArr[index].length > 3) {
          lastName += CapitalizeWord(lastNameArr[index])
        } else {
          lastName += lastNameArr[index]
        }
      })

      if (
        user.nsevis !== data.data.nsevis ||
        user.level !== CapitalizeWord(data.data.currentGroup.level) ||
        user.schedule !== CapitalizeWord(data.data.currentGroup.schedule) ||
        user.name !== CapitalizeWord(data.data.name) ||
        user.lastName !== lastName
      ) {
        const db = getFirestore()

        const docRef = doc(db, 'Students', user?.registrationNumber)

        updateDoc(docRef, {
          type: 'Student',
          name: CapitalizeWord(data.data.name),
          lastName,
          level: CapitalizeWord(data.data.currentGroup.level),
          schedule: CapitalizeWord(data.data.currentGroup.schedule),
          birthDate: data.data.birthDate,
          country: data.data.country,
          nsevis: data.data.nsevis,
        })
      }
    } catch (err) {
      // console.log('Error!', err)
    }
  }

  async function updateProfilePic(
    registrationNumber: string,
    email: string,
    file: Blob,
  ) {
    const storage = getStorage()

    const storageRef = ref(storage, 'profile_' + registrationNumber)

    await uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then((downloadURL) => {
        const db = getFirestore()

        const studentRef = doc(db, 'Students', student.registrationNumber)
        setDoc(
          studentRef,
          { ...student, imageUrl: downloadURL },
          { merge: true },
        )
        setStudent({ ...student, imageUrl: downloadURL })
      })
    })
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
        updateProfilePic,
        student,
        setStudent,
        dashboard,
        period,
        periods,
        frequency,
        group,
        setGroups,
        setGroup,
        groups,
        periodDate,
        periodDates,
        params,
        setPeriodDate,
        getDashboardData,
        setInitializing,
        initializing,
        setPeriodGroups,
        periodGroups,
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
        userFormData.email.toLowerCase(),
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

const forgotPW = async (
  userFormData: ForgotFormData,
  setLoginError: Dispatch<SetStateAction<boolean>>,
  setRecoverySent: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    await sendPasswordResetEmail(auth, userFormData.email.toLowerCase())
    setRecoverySent(true)
  } catch (err) {
    setLoginError(true)
  }
}

const useRegister = () => {
  const context = useContext(RegisterContext)

  return context
}

export { RegisterProvider, useRegister, logIn, forgotPW }
