import { Card, CardHeader } from '@nextui-org/react'
import { useRegister } from '../hooks/register'
import { format, parseISO } from 'date-fns'

export function ClassPeriodCard() {
  const { periodDate } = useRegister()

  return (
    <Card
      shadow="none"
      classNames={{
        header: [
          'text-primary max-sm:text-sm',
          'p-0',
          'font-semibold max-sm:font-normal',
          'justify-center',
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
      </CardHeader>
    </Card>
  )
}