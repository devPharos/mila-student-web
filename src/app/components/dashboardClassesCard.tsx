import { Accordion, AccordionItem, Chip } from '@nextui-org/react'
import { CheckCheck } from 'lucide-react'

export function DashboardClassesCard() {
  const itemClasses = {
    base: 'w-full bg-white p-4 rounded-[24px]',
    title: 'font-md font-semibold text-primary',
    subtitle: 'text-neutral',
    trigger: 'bg-white p-0',
    content: 'pl-4 pt-4',
  }

  return (
    <Accordion itemClasses={itemClasses} className="px-0">
      <AccordionItem
        aria-label="classes"
        title="1 Classes"
        subtitle="4 day(s) per week, 4.50 hour(s) per day."
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-[92px] w-[2px] bg-primary"></div>

            <div className="flex flex-col py-6">
              <span className="text-md text-neutral-dark">Aug, 01</span>
              <span className="text-sm text-neutral">Tuesday</span>
            </div>
          </div>

          <Chip
            classNames={{
              base: 'bg-information-light',
              content: 'text-information font-semibold text-md',
            }}
            variant="flat"
            radius="sm"
            startContent={<CheckCheck size={18} className="text-information" />}
          >
            Present
          </Chip>
        </div>
      </AccordionItem>
    </Accordion>
  )
}
