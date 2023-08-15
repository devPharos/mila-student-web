import {
  Avatar,
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import logo from '../assets/header-logo.png'
import { ProfilePopoverContent } from './profilePopoverContent'
import NextImage from 'next/image'
import { IChildrenProps } from '../@types/dashboard'

export function Header({ studentData }: IChildrenProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full py-4 px-10 bg-white">
      <Image
        as={NextImage}
        src={logo.src}
        alt=""
        quality={100}
        width={70}
        height={32}
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
          <Button className="bg-transparent pr-4 pl-0">
            <Avatar
              src={studentData.imageUrl ? studentData.imageUrl : undefined}
            />
            <span className="text-sm">
              Hello,{' '}
              <span className="font-semibold text-primary">
                {studentData.name}
              </span>
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="text-neutral-dark">
          <ProfilePopoverContent studentData={studentData} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
