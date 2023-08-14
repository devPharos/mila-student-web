import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  CircularProgress,
} from '@nextui-org/react'
import { Backpack } from 'lucide-react'
import { useRegister } from '../hooks/register'
import { format, parseISO } from 'date-fns'

export function DashboardClassCard() {
  const { group } = useRegister()

  return (
    <Card
      shadow="none"
      classNames={{
        header: ['text-primary', 'p-0', 'gap-2 flex-col items-start'],
        body: ['p-0 pt-4 gap-2 items-center'],
        base: ['rounded-[24px]', 'p-4'],
      }}
    >
      <CardHeader>
        <div className="flex gap-2">
          <Backpack size={20} className="text-primary" />
          <span className="font-semibold">Class {group?.level}</span>
        </div>

        <div className="flex gap-4 flex-wrap align-left">
          <span className="text-sm text-neutral">
            <span className="text-neutral-dark font-semibold">Name: </span>
            {group?.name}
          </span>

          <span className="text-sm text-neutral">
            <span className="text-neutral-dark font-semibold">Teacher: </span>
            {group?.teacher}
          </span>

          <span className="text-sm text-neutral">
            <span className="text-neutral-dark font-semibold">
              Class SD/ED:{' '}
            </span>
            {format(parseISO(group?.groupStartDate || ''), 'MMM do, yyyy')} to{' '}
            {format(parseISO(group?.groupEndDate || ''), 'MMM do, yyyy')}
          </span>

          <span className="text-sm text-neutral">
            <span className="text-neutral-dark font-semibold">
              Student SD/EN:{' '}
            </span>
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
        <div className="max-w-[600px] w-full flex items-center justify-between py-6 px-4">
          <div className="relative">
            <CircularProgress
              aria-label="Loading..."
              size="lg"
              value={group?.givenClassPercentage}
              classNames={{
                svg: 'w-[125px] h-[125px] ',
                indicator: 'stroke-primary',
                track: 'stroke-information-light',
              }}
            />

            <div className="absolute top-[13px] left-[13px]">
              <CircularProgress
                aria-label="Loading..."
                size="lg"
                value={group?.givenContentPercentage}
                classNames={{
                  svg: 'w-[100px] h-[100px] ',
                  indicator: 'stroke-error',
                  track: 'stroke-error-light',
                  value: 'text-md text-neutral-dark',
                }}
              />
            </div>

            {group?.status === 'ONGOING' ? (
              <span className="absolute text-neutral-dark text-[0.75rem] top-[53px] left-[35px]">
                In progress
              </span>
            ) : (
              <span className="absolute text-neutral-dark text-[0.75rem] top-[53px] left-[35px]">
                Completed
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <div className="w-[20px] h-[20px] bg-secondary rounded-[4px]"></div>
                <span className="text-error">
                  {group?.givenContentPercentage}% Content given
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <div className="w-[20px] h-[20px] bg-primary rounded-[4px]"></div>
                <span className="text-primary">
                  {group?.givenClassPercentage}% Class given
                </span>
              </div>
            </div>

            <div className="flex items-center w-full justify-between gap-2">
              <span className="text-neutral-dark">Final average grade</span>
              {group?.finalAverageGrade !== 0 ? (
                <span className="text-information font-semibold">
                  {group?.finalAverageGrade}
                </span>
              ) : (
                <Chip
                  classNames={{
                    base: 'bg-neutral-lighter',
                    content: 'text-neutral font-semibold text-md',
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
