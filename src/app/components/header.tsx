import {
  Avatar,
  Button,
  Divider,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import logo from '../assets/no-text-logo.svg'
import logopng from '../assets/logo.png'
import { AtSign, Backpack, Building, CalendarClock, LogOut } from 'lucide-react'

import { useQRCode } from 'next-qrcode'

export function Header() {
  const { Canvas } = useQRCode()

  return (
    <div className="flex items-center justify-between gap-4 w-full py-4 px-10 border-1 border-neutral-light bg-white">
      <Image src={logo.src} alt="" width={70} className="rounded-none" />

      <Popover
        placement="bottom-end"
        classNames={{
          base: 'bg-white drop-shadow-md',
        }}
      >
        <PopoverTrigger>
          <Button className="bg-transparent p-0">
            <Avatar />
            <span className="text-sm">
              Hello, <span className="font-semibold text-primary">Daniel</span>
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="text-neutral-dark">
          <div className="px-1 py-2 flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col gap-1 items-center w-full">
              <Avatar className="w-20 h-20" />
              <span className="text-primary text-md">Daniel de Souza</span>
              <h3 className="text-neutral text-sm">Student ID: ORL000611</h3>
            </div>

            <div className="flex flex-col w-ful gap-2">
              <div className="flex gap-2 text-neutral-dark">
                <AtSign strokeWidth={1.5} size={20} />
                <span>dansouz1712@gmail.com</span>
              </div>

              <div className="flex gap-2 w-full text-neutral-dark">
                <Building strokeWidth={1.5} size={20} />
                <span>Orlando</span>
              </div>

              <div className="flex gap-2 w-full text-neutral-dark">
                <Backpack strokeWidth={1.5} size={20} />
                <span>MBE01</span>
              </div>

              <div className="flex gap-2 w-full text-neutral-dark">
                <CalendarClock strokeWidth={1.5} size={20} />
                <span>Valid thru: Dec, 2023</span>
              </div>
            </div>

            <Divider />

            <div className="flex flex-col items-center w-full gap-1">
              <span className="text-primary font-semibold text-md">
                MILA ID
              </span>
              <span className="text-neutral-dark">
                Scan this code at the locations that requires your MILA ID
              </span>
            </div>

            <Canvas
              text={
                'https://form.jotform.com/222696636785069?milaId=ORL000611-DANIEL'
              }
            />

            <Divider />

            <Button className="bg-error-light text-error" radius="sm">
              Log out
              <LogOut className="text-error" size={18} />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
