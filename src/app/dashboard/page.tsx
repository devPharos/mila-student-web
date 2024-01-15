'use client'
import { useEffect, useState } from 'react'
import { DashboardClassCard } from '../components/dashboardClassCard'
import { DashboardClassesCard } from '../components/dashboardClassesCard'
import { Header } from '../components/header'
import { PeriodStatusCard } from '../components/periodStatusCard'

import { useRegister } from '../hooks/register'
import {
  format,
  isAfter,
  isBefore,
  parseISO,
  subDays,
  subMonths,
} from 'date-fns'
import { StudentGroup } from '../@types/dashboard'
import DashboardLoading from '../components/dashboardLoading'
import Link from 'next/link'
import { ClassPeriodCard } from '../components/dashboardClassPeriodCard'
import { Card, CardHeader } from '@nextui-org/react'

export default function Dashboard() {
  const [openSelect, setOpenSelect] = useState(false)
  const [loading, setLoading] = useState(true)
  const {
    student,
    group,
    groups,
    // period,
    periods,
    periodDate,
    periodDates,
    setPeriodDate,
    setGroup,
    setPeriodGroups,
    periodGroups,
    frequency,
    params,
  } = useRegister()

  useEffect(() => {
    if (periodDate) {
      setLoading(true)
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
                      subDays(parseISO(g.studentStartDate), 1),
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
      setGroup(retGroups[0])
      setPeriodGroups(retGroups)
      setLoading(false)
    }
  }, [periodDate])

  const handleSelectPeriod = (selectedPeriod: string) => {
    setLoading(true)

    setTimeout(() => {
      setOpenSelect(false)
      setPeriodDate(selectedPeriod)
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      {loading ? (
        <DashboardLoading />
      ) : frequency[frequency.length - 1].percFrequency < params.maxAbsenses ? (
        <>
          <div className="min-h-screen bg-neutral-lighter flex items-center flex-col">
            <Header studentData={student} />

            <div className="flex justify-center items-center flex-col p-12 text-sm text-left bg-white rounded-2xl mt-6 font-normal text-gray-600 ">
              <p>Dear student,</p>
              <p className="mt-4">
                Please send an e-mail to{' '}
                {student.registrationNumber.substring(0, 3) === 'ORL' ? (
                  <Link
                    className="font-semibold text-neutral-dark"
                    href={`mailto:${params.contact_orl}?subject=Student Dashboard`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {params.contact_orl}
                  </Link>
                ) : student.registrationNumber.substring(0, 3) === 'MIA' ? (
                  <Link
                    className="font-semibold text-neutral-dark"
                    href={`mailto:${params.contact_mia}?subject=Student Dashboard`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {params.contact_mia}
                  </Link>
                ) : (
                  <Link
                    className="font-semibold text-neutral-dark"
                    href={`mailto:${params.contact_orl}?subject=Student Dashboard`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {params.contact_orl}
                  </Link>
                )}{' '}
                to receive information about your attendance.
              </p>
              <p className="mt-4">MILA's Intelligence Team</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen bg-neutral-lighter flex items-center flex-col">
            <Header studentData={student} />
            <div className="relative flex flex-col gap-4 max-w-[960px] w-full px-6 py-10">
              <div className="grid sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-2 items-center">
                <div className="lg:hidden md:hidden"></div>

                <div className="col-span-2">
                  <PeriodStatusCard
                    type="absence"
                    value={group?.totalAbsences || 0}
                  />
                </div>

                <div className="col-span-2">
                  <PeriodStatusCard
                    type="frequency"
                    value={frequency[frequency.length - 1].percFrequency || 0}
                  />
                </div>

                <div
                  className="col-span-1 cursor-pointer"
                  onClick={() => setOpenSelect(!openSelect)}
                >
                  <ClassPeriodCard isOpen={openSelect} />
                </div>
              </div>
              {openSelect && periodDate && (
                <div className="w-full flex justify-end absolute right-6 top-28 z-50">
                  <Card
                    shadow="none"
                    classNames={{
                      header: [
                        'text-primary max-sm:text-sm',
                        'p-0',
                        'max-sm:font-normal',
                        'flex-col justify-center gap-2',
                      ],
                      base: [
                        'rounded-b-[24px] rounded-l-[24px]  rounded-se-none cursor-pointer max-w-fit shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]',
                        'max-sm:rounded-[16px]',
                        'py-4',
                        'max-sm:py-2',
                        'px-4',
                      ],
                    }}
                  >
                    <CardHeader>
                      {periodDates.map((period, index) => {
                        if (
                          period <= format(new Date(), 'Y-MM') &&
                          period >=
                            format(
                              subMonths(
                                new Date(),
                                params.limit_periods_to_students,
                              ),
                              'Y-MM',
                            )
                        ) {
                          return (
                            <>
                              <span onClick={() => handleSelectPeriod(period)}>
                                {format(parseISO(period || ''), 'MMMM, yyyy')}
                              </span>
                              {index !== params.limit_periods_to_students && (
                                <div className="h-px w-full bg-gray-200"></div>
                              )}
                            </>
                          )
                        }
                        return null
                      })}
                    </CardHeader>
                  </Card>
                </div>
              )}
              {periodGroups.map((g) => {
                return (
                  <>
                    <DashboardClassCard group={g} />

                    <DashboardClassesCard group={g} />
                  </>
                )
              })}
            </div>
          </div>
        </>
      )}
    </>
  )
}
