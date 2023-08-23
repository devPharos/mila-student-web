import { Card, CardHeader, Chip } from '@nextui-org/react'
import { CalendarCheck, CalendarX } from 'lucide-react'

interface IPeriodStatusCard {
  type: 'absence' | 'frequency'
  value: number
}

export function PeriodStatusCard({ type, value }: IPeriodStatusCard) {
  return (
    <Card
      shadow="none"
      classNames={{
        header: [
          'max-sm:text-sm text-primary',
          'p-0',
          'font-semibold',
          'justify-between',
        ],
        base: [
          'rounded-[24px]',
          'max-sm:rounded-[16px]',
          'py-4',
          'max-sm:py-2',
          'px-4',
        ],
      }}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          {type === 'absence' ? (
            <>
              <CalendarX size={20} className="text-primary max-sm:hidden" />
              <span>Period Total Absences</span>
            </>
          ) : (
            <>
              <CalendarCheck size={20} className="text-primary max-sm:hidden" />
              <span>Period Frequency</span>
            </>
          )}
        </div>
        <Chip
          classNames={{
            base: 'bg-information-light max-sm:bg-neutral-lighter',
            content:
              'text-information font-semibold max-sm:text-xs max-sm:text-neutral max-sm:font-normal',
          }}
          variant="flat"
          radius="sm"
        >
          {value}
          <span
            className={
              type === 'absence'
                ? 'hidden'
                : 'text-information font-semibold text-md max-sm:text-xs max-sm:text-neutral max-sm:font-normal'
            }
          >
            %
          </span>
        </Chip>
      </CardHeader>
    </Card>
  )
}
