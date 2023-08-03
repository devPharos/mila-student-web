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
        header: ['text-primary', 'p-0', 'font-semibold', 'justify-between'],
        base: ['rounded-[32px]', 'p-6'],
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
            base: 'bg-success-light ',
            content: 'text-success-dark font-semibold text-md',
          }}
          variant="flat"
          radius="sm"
        >
          {value}
        </Chip>
      </CardHeader>
    </Card>
  )
}
