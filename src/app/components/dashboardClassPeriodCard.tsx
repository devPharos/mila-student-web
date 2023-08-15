import { Card, CardHeader, Chip } from '@nextui-org/react'
import { CalendarCheck, CalendarX } from 'lucide-react'
import { useRegister } from '../hooks/register'
import { format, parseISO } from 'date-fns'

interface IPeriodStatusCard {
  type: 'absence' | 'frequency'
  value: number
}

export function ClassPeriodCard() {
  const { periodDate } = useRegister()

  return (
    <Card
      shadow="none"
      classNames={{
        header: ['text-primary', 'p-0', 'font-semibold', 'justify-center'],
        base: ['rounded-[24px]', 'p-4'],
      }}
    >
      <CardHeader>
        {format(parseISO(periodDate || ''), 'MMMM, yyyy')}
      </CardHeader>
    </Card>
  )
}
