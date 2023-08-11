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

export interface IChildrenProps {
  studentData: Student
}
