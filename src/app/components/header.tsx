import {
  Avatar,
  Button,
  Image,
  Modal,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import logo from '../assets/header-logo.png'
import { ProfilePopoverContent } from './profilePopoverContent'
import NextImage from 'next/image'
import { IChildrenProps } from '../@types/dashboard'

export function Header({ studentData }: IChildrenProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className="flex items-center justify-between gap-4 w-full py-2 border-b drop-shadow-sms px-10 bg-white">
      <Image
        as={NextImage}
        src={logo.src}
        alt=""
        quality={100}
        width={70}
        height={32}
        className="rounded-none"
      />
      <Button className="bg-transparent pr-4 pl-0" onPress={onOpen}>
        <Avatar src={studentData.imageUrl ? studentData.imageUrl : undefined} />
        <span className="text-sm">
          Hello,{' '}
          <span className="font-semibold text-primary">{studentData.name}</span>
        </span>
      </Button>

      <Modal
        placement="top"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: 'bg-white drop-shadow-md',
        }}
        className="absolute right-0 max-w-[350px]"
        hideCloseButton={true}
        backdrop="opaque"
      >
        <ModalContent className="text-neutral-dark">
          <ProfilePopoverContent studentData={studentData} />
        </ModalContent>
      </Modal>
    </div>
  )
}
