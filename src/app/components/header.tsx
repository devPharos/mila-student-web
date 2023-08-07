import {
  Avatar,
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import logo from '../assets/no-text-logo.svg'
import { ProfilePopoverContent } from './profilePopoverContent'

export function Header() {
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
          <Button className="bg-transparent p-4">
            <Avatar />
            <span className="text-sm">
              Hello, <span className="font-semibold text-primary">Daniel</span>
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="text-neutral-dark">
          <ProfilePopoverContent />
        </PopoverContent>
      </Popover>
    </div>
  )
}
