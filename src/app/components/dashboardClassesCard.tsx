import { Accordion, AccordionItem, Chip } from '@nextui-org/react'
import {
  ArrowRightLeft,
  CalendarX,
  Check,
  CheckCheck,
  Palmtree,
  Stethoscope,
} from 'lucide-react'
import { useRegister } from '../hooks/register'
import CapitalizeWord from '../functions/auxiliar'
import { StudentClass } from '../@types/dashboard'
import { format, parseISO } from 'date-fns'

export function DashboardClassesCard() {
  const { group } = useRegister()

  const itemClasses = {
    base: 'w-full bg-white p-4 rounded-[24px]',
    title: 'font-md font-semibold text-primary',
    subtitle: 'text-neutral',
    trigger: 'bg-white p-0',
    content: 'pt-4',
  }

  return (
    <Accordion itemClasses={itemClasses} className="px-0">
      <AccordionItem
        aria-label="classes"
        title={`${group?.classes.length} Classes`}
        subtitle={group?.workload}
      >
        {group?.classes.map((value: StudentClass, index: number) => {
          return (
            <div
              className="flex items-center justify-between gap-2 pb-2"
              key={index}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-[92px] w-[2px] bg-primary"></div>

                  <div className="flex flex-col py-6 w-[75px]">
                    <span
                      className={
                        index === 0 ? ' font-semibold text-primary' : 'hidden'
                      }
                    >
                      Date
                    </span>
                    <span className="text-md text-neutral-dark">
                      {format(parseISO(value.classDate), 'MMM, dd')}
                    </span>
                    <span className="text-sm text-neutral">
                      {CapitalizeWord(value.weekDate)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4  w-[109px]">
                  <span
                    className={
                      index === 0 ? ' font-semibold text-primary' : 'hidden'
                    }
                  >
                    Presence Status
                  </span>

                  <Chip
                    classNames={{
                      base: [
                        value.presenceStatus === 'Absent'
                          ? 'bg-error-light'
                          : value.presenceStatus === 'Sick'
                          ? 'bg-success-light'
                          : value.presenceStatus === 'Transfer'
                          ? 'bg-neutral-lighter'
                          : value.presenceStatus === 'Vacation'
                          ? 'bg-violet-50'
                          : value.presenceStatus === 'Halfpresent'
                          ? 'bg-warning-light'
                          : 'bg-information-light',
                      ],
                      content: [
                        value.presenceStatus === 'Absent'
                          ? 'text-error font-semibold text-md'
                          : value.presenceStatus === 'Sick'
                          ? 'text-success-dark font-semibold text-md'
                          : value.presenceStatus === 'Transfer'
                          ? 'text-neutral font-semibold text-md'
                          : value.presenceStatus === 'Vacation'
                          ? 'text-violet-500 font-semibold text-md'
                          : value.presenceStatus === 'Halfpresent'
                          ? 'text-warning font-semibold text-md'
                          : 'text-information font-semibold text-md',
                      ],
                    }}
                    variant="flat"
                    radius="sm"
                    startContent={
                      value.presenceStatus === 'Absent' ? (
                        <CalendarX size={18} className="text-error" />
                      ) : value.presenceStatus === 'Sick' ? (
                        <Stethoscope size={18} className="text-success-dark" />
                      ) : value.presenceStatus === 'Transfer' ? (
                        <ArrowRightLeft size={18} className="text-neutral" />
                      ) : value.presenceStatus === 'Vacation' ? (
                        <Palmtree size={18} className="text-violet-500" />
                      ) : value.presenceStatus === 'Halfpresent' ? (
                        <Check size={18} className="text-warning" />
                      ) : (
                        <CheckCheck size={18} className="text-information" />
                      )
                    }
                  >
                    {value.presenceStatus}
                  </Chip>
                </div>
              </div>

              <div className="flex flex-col gap-4 items-end">
                <span
                  className={
                    index === 0 ? ' font-semibold text-primary' : 'hidden'
                  }
                >
                  Content Given
                </span>

                <div className="flex gap-2 items-center flex-wrap ">
                  {value.program.map((value, index) => {
                    return (
                      <div className="flex gap-2 items-center" key={index}>
                        <Check size={20} className="text-primary" />
                        <span className="text-neutral-dark">
                          {CapitalizeWord(value.description)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </AccordionItem>
    </Accordion>
  )
}
