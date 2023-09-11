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
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function Header({ studentData }: IChildrenProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className="border-b drop-shadow-sms bg-white w-full">
      <div className="flex items-center justify-between gap-4 py-2.5 h-[86.4px] w-full m-auto max-w-[1666px] max-[1666px]:px-16">
        <div className="flex items-center justify-center gap-8">
          <Image
            as={NextImage}
            src={logo.src}
            alt=""
            quality={100}
            width={80}
            height={38}
            className="rounded-none m-1"
          />
          <p className="border-l-1 pl-6 text-gray-600 leading-10 flex-row items-center hidden sm:flex">
            Student Dashboard
          </p>
        </div>
        <div className="flex flex-row items-center gap-8">
          <Link
            href="https://milausa.com/"
            className="transition duration-300 ease-in-out hover:scale-110"
          >
            {/* <Button
              className="bg-orange text-white hidden max-md:flex"
              isIconOnly
            >
              <ArrowLeft size={18} />
            </Button> */}

            <Button className="bg-orange text-white rounded hidden sm:flex">
              <ArrowLeft size={18} />
              <span className="font-bold tracking-wider">BACK TO WEBSITE</span>
            </Button>

            <Button className="bg-orange text-white rounded flex sm:hidden">
              <ArrowLeft size={18} />
              <span className="font-bold tracking-wider">BACK</span>
            </Button>
          </Link>
          {studentData?.name ? (
            <div className="border-l-1 pl-6">
              <Button className="bg-transparent pr-4 pl-0" onPress={onOpen}>
                <Avatar
                  src={studentData.imageUrl ? studentData.imageUrl : undefined}
                  size="md"
                />
                <span className="text-sm">
                  Hello,{' '}
                  <span className="font-semibold text-primary">
                    {studentData.name}
                  </span>
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
          ) : null}
        </div>
      </div>
    </div>
  )
}
