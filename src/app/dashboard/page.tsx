'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { DashboardClassCard } from '../components/dashboardClassCard'
import { DashboardClassesCard } from '../components/dashboardClassesCard'
import { Header } from '../components/header'
import { PeriodStatusCard } from '../components/periodStatusCard'
import { auth } from '../api/firebase'
import { getAdditionalUserInfo } from 'firebase/auth'

export default function Dashboard() {
  const user = auth.currentUser

  const getStudentData = () => {
    console.log(user)
  }

  return (
    <div className="min-h-screen bg-neutral-lighter flex items-center flex-col">
      <Header />

      <div className="flex flex-col gap-4 max-w-[1120px] w-full px-6 py-10">
        <div className="grid grid-cols-2 gap-4">
          <PeriodStatusCard type="absence" value={0} />
          <PeriodStatusCard type="frequency" value={100} />
        </div>

        <DashboardClassCard />

        <DashboardClassesCard />
      </div>
    </div>
  )
}
