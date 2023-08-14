export interface Student {
  registrationNumber: string | null
  email: string | null
  registration: string | null
  name: string | null
  lastName: string | null
  level: string | null
  imageUrl: string | null
  schedule: string | null
  birthDate: string | null
  country: string | null
  currentGroup: string | null
  emailVerified: boolean
}

export interface Dashboard {
  data: any
  fromDate: Date
}

export interface StudentFrequency {
  percFrequency: number
  period: string
  totalAbsences: number
}

export interface StudentProgram {
  description: string
}

export interface StudentClass {
  classDate: string
  grades: number[]
  notes: string
  presenceStatus:
    | 'Present'
    | 'Absent'
    | 'Sick'
    | 'Transfer'
    | 'Vacation'
    | 'Halfpresent'
  program: StudentProgram[]
  shift: string
  weekDate: string
}

export interface StudentPeriod {
  classes: StudentClass[]
  groupID: number
  period: string
  totalAbsences: number
}

export interface StudentGroup {
  otherClasses: string[]
  otherAbsences: string[]
  classes: StudentClass[]
  finalAverageGrade: number
  givenClassPercentage: number
  givenContentPercentage: number
  groupEndDate: string
  groupID: number
  groupStartDate: string
  level: string
  name: string
  result: string
  schedule: string
  status: string
  studentEndDate: string
  studentStartDate: string
  teacher: string
  workload: string
  totalAbsences: number
  periodAbsences: number
}

export interface IChildrenProps {
  studentData: Student
}
