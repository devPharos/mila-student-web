import { Card, CardHeader } from '@nextui-org/react'
import { useRegister } from '../hooks/register'
import { format, parseISO } from 'date-fns'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ClassPeriodCardProps {
  isOpen: boolean
}

export function ClassPeriodCard({ isOpen }: ClassPeriodCardProps) {
  const { periodDate } = useRegister()

  return (
    <Card
      shadow="none"
      classNames={{
        header: [
          'text-primary max-sm:text-sm',
          'p-0',
          'max-sm:font-normal',
          'justify-center gap-2',
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
        {format(parseISO(periodDate || ''), 'MMMM, yyyy')}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </CardHeader>
    </Card>
  )
}
