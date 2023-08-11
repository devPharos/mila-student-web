import {
  Avatar,
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import logo from '../assets/header-logo.svg'
import { ProfilePopoverContent } from './profilePopoverContent'
import NextImage from 'next/image'

export function Header() {
  return (
    <div className="flex items-center justify-between gap-4 w-full py-4 px-10 border-1 border-neutral-light bg-white">
      <Image
        as={NextImage}
        src={logo.src}
        alt=""
        width={60}
        height={60}
        className="rounded-none"
      />

      <Popover
        placement="bottom-end"
        classNames={{
          base: 'bg-white drop-shadow-md',
        }}
        backdrop="opaque"
      >
        <PopoverTrigger>
          <Button className="bg-transparent pr-4">
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
