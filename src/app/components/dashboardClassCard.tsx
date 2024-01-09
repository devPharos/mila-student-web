import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  CircularProgress,
} from '@nextui-org/react'
import { Backpack } from 'lucide-react'
// import { useRegister } from '../hooks/register'
import { format, parseISO } from 'date-fns'
import CapitalizeWord from '../functions/auxiliar'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DashboardClassCard({ group }: any) {
  // const { group } = useRegister()

  return (
    <Card
      shadow="none"
      classNames={{
        header: [
          'max-sm:text-sm text-primary',
          'p-0',
          'gap-2 flex-col items-start',
        ],
        body: ['p-0 pt-4 gap-2 items-center'],
        base: ['rounded-[24px]', 'p-4'],
      }}
    >
      <CardHeader>
        <div className="flex gap-2">
          <Backpack size={20} className="text-primary" />
          <span className="font-semibold">
            Class {group?.level} - Teacher{' '}
            {CapitalizeWord(group?.teacher || '')}
          </span>
        </div>

        <div className="flex flex-col justify-center items-start">
          <span className="text-sm text-neutral max-sm:text-xs">
            {group?.groupID} - {group?.name}
          </span>

          <span className="text-sm text-neutral max-sm:text-xs">
            Class SD/ED:{' '}
            {format(parseISO(group?.groupStartDate || ''), 'MMM do, yyyy')} to{' '}
            {format(parseISO(group?.groupEndDate || ''), 'MMM do, yyyy')}
          </span>

          <span className="text-sm text-neutral max-sm:text-xs">
            Student SD/EN:{' '}
            {format(parseISO(group?.studentStartDate || ''), 'MMM do, yyyy')}{' '}
            <span
              className={
                group?.studentEndDate ? 'text-sm text-neutral' : 'hidden'
              }
            >
              to{' '}
            </span>
            {group?.studentEndDate
              ? format(parseISO(group?.studentEndDate || ''), 'MMM do, yyyy')
              : ''}
          </span>
        </div>
      </CardHeader>

      <CardBody>
        <div className="flex flex-col gap-6">
          <div className="w-full flex flex-col max-sm:justify-center max-sm: gap-2 items-center justify-between py-6 px-4">
            <div className="w-full flex flex-row justify-center items-center gap-4">
              <div className="relative">
                <CircularProgress
                  aria-label="Loading..."
                  size="lg"
                  value={group?.givenClassPercentage}
                  classNames={{
                    svg: 'w-[175px] h-[175px] ',
                    indicator: 'stroke-primary',
                    track: 'stroke-information-light',
                  }}
                />

                <div className="absolute top-[22px] left-[22px]">
                  <CircularProgress
                    aria-label="Loading..."
                    size="lg"
                    value={group?.givenContentPercentage}
                    classNames={{
                      svg: 'w-[130px] h-[130px] ',
                      indicator: 'stroke-error',
                      track: 'stroke-error-light',
                      value: 'text-md text-neutral-dark',
                    }}
                  />
                </div>

                {group?.status === 'FINISHED' ? (
                  <span className="absolute text-neutral-dark text-sm top-[77px] left-[62px]">
                    Finished
                  </span>
                ) : (
                  <span className="absolute text-neutral-dark text-sm top-[77px] left-[55px]">
                    In progress
                  </span>
                )}
              </div>

              <div className="w-full flex flex-col gap">
                <div className="flex gap-2 items-center">
                  <div className="w-[20px] h-[20px] bg-secondary rounded-[4px] max-sm:hidden"></div>
                  <span className="text-error max-sm:text-sm">
                    {group?.givenContentPercentage}% Content given
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="w-[20px] h-[20px] bg-primary rounded-[4px] max-sm:hidden"></div>
                  <span className="text-primary max-sm:text-sm">
                    {group?.givenClassPercentage}% Class given
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center w-full justify-between gap-2 max-sm:flex-col">
              <span className="text-neutral-dark max-sm:text-sm">
                Final average grade
              </span>
              {group?.finalAverageGrade !== 0 ? (
                <span className="text-information font-semibold">
                  {group?.finalAverageGrade}
                </span>
              ) : (
                <Chip
                  classNames={{
                    base: 'bg-neutral-lighter',
                    content:
                      'text-neutral font-semibold text-md max-sm:text-xs',
                  }}
                  variant="flat"
                  radius="sm"
                >
                  In progress...
                </Chip>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
