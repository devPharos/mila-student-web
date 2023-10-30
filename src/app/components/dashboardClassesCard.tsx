import { Accordion, AccordionItem, Chip } from '@nextui-org/react'
import {
  ArrowRightLeft,
  CalendarX,
  Check,
  CheckCheck,
  Palmtree,
  Stethoscope,
} from 'lucide-react'
// import { useRegister } from '../hooks/register'
import CapitalizeWord from '../functions/auxiliar'
import { StudentClass } from '../@types/dashboard'
import { format, parseISO } from 'date-fns'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DashboardClassesCard({ group }: any) {
  // const { group } = useRegister()

  const itemClasses = {
    base: 'w-full bg-white p-4 rounded-[24px]',
    title: 'font-semibold text-primary max-sm:text-sm',
    subtitle: 'text-neutral max-sm:text-xs',
    trigger: 'bg-white p-0',
    content: 'pt-4',
  }

  const classes = group?.classes.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (classStatus: { presenceStatus: any }) => classStatus.presenceStatus,
  )

  return (
    <Accordion itemClasses={itemClasses} className="px-0">
      <AccordionItem
        aria-label="classes"
        title={`${classes?.length} Classes`}
        subtitle={group?.workload}
      >
        {classes?.map((value: StudentClass, index: number) => {
          return (
            <div
              className="flex items-center justify-between gap-2 pb-2"
              key={index}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-[92px] w-[2px] bg-primary"></div>

                  <div className="flex flex-col py-6 w-[75px] max-sm:w-[55px]">
                    <span
                      className={
                        index === 0
                          ? ' font-semibold text-primary max-sm:text-sm max-sm:hidden'
                          : 'hidden'
                      }
                    >
                      Date
                    </span>
                    <span className="max-sm:text-sm text-neutral-dark">
                      {format(parseISO(value.classDate), 'MMM, dd')}
                    </span>
                    <span className="max-sm:text-xs text-sm text-neutral">
                      {CapitalizeWord(value.weekDate)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4  w-[109px]">
                  <span
                    className={
                      index === 0
                        ? 'max-sm:text-sm font-semibold text-primary max-sm:hidden'
                        : 'hidden'
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
                          ? 'max-sm:text-xs max-sm:font-normal text-error font-semibold text-md'
                          : value.presenceStatus === 'Sick'
                          ? 'max-sm:text-xs max-sm:font-normal text-success-dark font-semibold text-md'
                          : value.presenceStatus === 'Transfer'
                          ? 'max-sm:text-xs max-sm:font-normal text-neutral font-semibold text-md'
                          : value.presenceStatus === 'Vacation'
                          ? 'max-sm:text-xs max-sm:font-normal text-violet-500 font-semibold text-md'
                          : value.presenceStatus === 'Halfpresent'
                          ? 'max-sm:text-xs max-sm:font-normal text-warning font-semibold text-md'
                          : 'max-sm:text-xs max-sm:font-normal text-information font-semibold text-md',
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
                    index === 0
                      ? 'max-sm:text-sm font-semibold text-primary max-sm:hidden'
                      : 'hidden'
                  }
                >
                  Content Given
                </span>

                <div className="flex gap-2 items-center flex-wrap justify-end ">
                  {value.program.map((value, index) => {
                    return (
                      <div className="flex gap-2 items-center" key={index}>
                        <Check size={16} className="text-primary" />
                        <span className="text-neutral-dark max-sm:text-xs">
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
