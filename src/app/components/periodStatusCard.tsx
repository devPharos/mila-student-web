import { Card, CardHeader, Chip } from '@nextui-org/react'
import { CalendarCheck, CalendarX } from 'lucide-react'
import { useRegister } from '../hooks/register'

interface IPeriodStatusCard {
  type: 'absence' | 'frequency'
  value: number
}

export function PeriodStatusCard({ type, value }: IPeriodStatusCard) {
  return (
    <Card
      shadow="none"
      classNames={{
        header: ['text-primary', 'p-0', 'font-semibold', 'justify-between'],
        base: ['rounded-[24px]', 'p-4'],
      }}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          {type === 'absence' ? (
            <>
              <CalendarX size={20} className="text-primary" />
              <span>Period Total Absences</span>
            </>
          ) : (
            <>
              <CalendarCheck size={20} className="text-primary" />
              <span>Period Frequency</span>
            </>
          )}
        </div>
        <Chip
          classNames={{
            base: 'bg-information-light',
            content: 'text-information font-semibold text-md',
          }}
          variant="flat"
          radius="sm"
        >
          {value}
          <span
            className={
              type === 'absence'
                ? 'hidden'
                : 'text-information font-semibold text-md'
            }
          >
            %
          </span>
        </Chip>
      </CardHeader>
    </Card>
  )
}
