'use client'
import { useEffect, useState } from 'react'
import { DashboardClassCard } from '../components/dashboardClassCard'
import { DashboardClassesCard } from '../components/dashboardClassesCard'
import { Header } from '../components/header'
import { PeriodStatusCard } from '../components/periodStatusCard'

import { useRegister } from '../hooks/register'
import { isAfter, isBefore, parseISO } from 'date-fns'
import { StudentGroup } from '../@types/dashboard'
import DashboardLoading from '../components/dashboardLoading'

export default function Dashboard() {
  const [initializing, setInitializing] = useState(true)
  const { student, group, groups, periods, periodDate, setGroup, frequency } =
    useRegister()
  const [totalAbsenses, setTotalAbsenses] = useState(0)

  useEffect(() => {
    if (periodDate) {
      const retGroups: StudentGroup[] = []
      let periodAbsences = 0
      groups.forEach((g) => {
        if (typeof g.otherClasses === 'undefined') {
          g.otherClasses = []
        }
        if (typeof g.otherAbsences === 'undefined') {
          g.otherAbsences = []
        }
        if (
          parseInt(periodDate.replace('-', '')) >=
            parseInt(g.studentStartDate.substr(0, 7).replace('-', '')) &&
          parseInt(periodDate.replace('-', '')) <=
            parseInt(
              g.studentEndDate
                ? g.studentEndDate.substr(0, 7).replace('-', '')
                : g.groupEndDate.substr(0, 7).replace('-', ''),
            )
        ) {
          g.classes = []
          periods.forEach((p) => {
            if (p.groupID === g.groupID) {
              if (
                parseInt(p.period.replace('-', '')) ===
                parseInt(periodDate.replace('-', ''))
              ) {
                p.classes.forEach((pclass) => {
                  if (
                    isAfter(
                      parseISO(pclass.classDate),
                      parseISO(g.studentStartDate),
                    ) &&
                    isBefore(
                      parseISO(pclass.classDate),
                      g.studentEndDate
                        ? parseISO(g.studentEndDate)
                        : parseISO(g.groupEndDate),
                    )
                  ) {
                    g.classes.push(pclass)
                    g.totalAbsences = p.totalAbsences || 0
                  }
                })
              }
              p.classes.forEach((pclass) => {
                if (!g.otherClasses.includes(pclass.classDate)) {
                  g.otherClasses.push(pclass.classDate)
                  if (pclass.presenceStatus === 'Absent') {
                    g.otherAbsences.push(pclass.classDate)
                  }
                }
              })
            }
          })
          periodAbsences += g.totalAbsences || 0
          retGroups.push(g)
        }
      })
      retGroups.map((group) => {
        return (group.periodAbsences = periodAbsences)
      })
      setTotalAbsenses(periodAbsences)
      setGroup(retGroups[0])
      setInitializing(false)
    }
  }, [periodDate])

  return (
    <>
      {initializing ? (
        <DashboardLoading />
      ) : (
        <div className="min-h-screen bg-neutral-lighter flex items-center flex-col">
          <Header studentData={student} />

          <div className="flex flex-col gap-4 max-w-[1120px] w-full px-6 py-10">
            <div className="grid grid-cols-2 gap-4">
              <PeriodStatusCard
                type="absence"
                value={group?.totalAbsences || 0}
              />
              <PeriodStatusCard
                type="frequency"
                value={frequency[frequency.length - 1].percFrequency || 0}
              />
            </div>

            <DashboardClassCard />

            <DashboardClassesCard />
          </div>
        </div>
      )}
    </>
  )
}
