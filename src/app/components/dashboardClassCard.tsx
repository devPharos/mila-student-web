import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  CircularProgress,
} from '@nextui-org/react'
import { Backpack } from 'lucide-react'

export function DashboardClassCard() {
  return (
    <Card
      shadow="none"
      classNames={{
        header: ['text-primary', 'p-0', 'gap-2 flex-col items-start'],
        body: ['p-0 pt-4 gap-2 items-center'],
        base: ['rounded-[32px]', 'p-6'],
      }}
    >
      <CardHeader>
        <div className="flex gap-2">
          <Backpack size={20} className="text-primary" />
          <span className="font-semibold">Class Mbe01</span>
        </div>

        <div className="flex gap-4 flex-wrap align-left">
          <span className="text-sm text-neutral-dark ">
            <span className="text-primary font-semibold">Teacher: </span>
            Jeaneth Chirinos
          </span>

          <span className="text-sm text-neutral-dark ">
            <span className="text-primary font-semibold">
              Class start date:{' '}
            </span>
            Feb 21st 2022
          </span>

          <span className="text-sm text-neutral-dark ">
            <span className="text-primary font-semibold">Class end date: </span>
            Jun 21st 2022
          </span>

          <span className="text-sm text-neutral-dark ">
            <span className="text-primary font-semibold">
              Student start date:{' '}
            </span>
            Mar 7th 2022
          </span>

          <span className="text-sm text-neutral-dark ">
            <span className="text-primary font-semibold">
              Student end date:{' '}
            </span>
            Jun 21st 2022
          </span>
        </div>
      </CardHeader>

      <CardBody>
        <div className="max-w-[600px] w-full flex items-center justify-between py-6 px-4">
          <div className="relative">
            <CircularProgress
              aria-label="Loading..."
              size="lg"
              value={75}
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
                value={72}
                classNames={{
                  svg: 'w-[100px] h-[100px] ',
                  indicator: 'stroke-error',
                  track: 'stroke-error-light',
                  value: 'text-md text-neutral-dark',
                }}
              />
            </div>

            <span className="absolute text-neutral-dark text-[0.75rem] top-[53px] left-[35px]">
              In progress
            </span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center w-full justify-between gap-2">
              <span className="text-neutral-dark">Final average grade</span>
              <Chip
                classNames={{
                  base: 'bg-warning-light',
                  content: 'text-warning font-semibold text-md',
                }}
                variant="flat"
                radius="sm"
              >
                In progress
              </Chip>
            </div>

            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <div className="w-[20px] h-[20px] bg-secondary rounded-[4px]"></div>
                <span className="text-neutral-dark">72% Content given</span>
              </div>

              <div className="flex gap-2 items-center">
                <div className="w-[20px] h-[20px] bg-primary rounded-[4px]"></div>
                <span className="text-neutral-dark">72% Content given</span>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
