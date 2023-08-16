import { Divider, Button, Image } from '@nextui-org/react'
import { signOut } from 'firebase/auth'
import NextImage from 'next/image'
import { AtSign, Building, Backpack, CalendarClock, LogOut } from 'lucide-react'
import logo from '../assets/header-logo.png'

import { auth } from '../api/firebase'
import { IChildrenProps } from '../@types/dashboard'
import { useRegister } from '../hooks/register'
import { useQRCode } from 'next-qrcode'
import AvatarUpdate from './Avatar/AvatarUpdate'

export function ProfilePopoverContent({ studentData }: IChildrenProps) {
  const { student, updateProfilePic } = useRegister()

  const { Canvas } = useQRCode()

  const logOut = () => {
    signOut(auth)
  }

  return (
    <div className="px-1 py-2 flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col gap-1 items-center w-full">
        <AvatarUpdate student={student} updateProfilePic={updateProfilePic} />

        <span className="text-primary max-sm:text-sm">{studentData?.name}</span>
        <h3 className="text-neutral text-sm max-sm:text-xs">
          Student ID: {studentData?.registrationNumber}
        </h3>
      </div>

      <div className="flex flex-col w-ful gap-2">
        <div className="flex gap-2 text-neutral-dark max-sm:text-sm items-center">
          <AtSign strokeWidth={1.5} size={18} />
          <span>{studentData?.email}</span>
        </div>

        <div className="flex gap-2 w-full text-neutral-dark max-sm:text-sm items-center">
          <Building strokeWidth={1.5} size={18} />
          <span>
            {' '}
            {studentData?.registrationNumber?.substring(0, 3) === 'ORL'
              ? 'Orlando'
              : studentData?.registrationNumber?.substring(0, 3) === 'MIA'
              ? 'Miami'
              : ''}
          </span>
        </div>

        <div className="flex gap-2 w-full text-neutral-dark max-sm:text-sm items-center">
          <Backpack strokeWidth={1.5} size={18} />
          <span>{studentData?.level?.toUpperCase()}</span>
        </div>

        <div className="flex gap-2 w-full text-neutral-dark max-sm:text-sm items-center">
          <CalendarClock strokeWidth={1.5} size={18} />
          <span>Valid thru: Dec, {new Date().getFullYear()}</span>
        </div>
      </div>

      <Divider />

      <div className="flex flex-col items-center w-full gap-1">
        <span className="text-primary font-semibold max-sm:text-sm">
          MILA ID
        </span>
        <span className="text-neutral-dark text-center text-sm px-4 max-sm:text-xs">
          Scan this code at the locations that requires your MILA ID
        </span>
      </div>
      <div className="flex flex-row justify-center items-center">
        <Canvas
          text={`https://form.jotform.com/222696636785069?milaId=${
            studentData.registrationNumber
          }-${studentData.name?.toUpperCase()}`}
          options={{
            width: 220,
          }}
        />

        <div className="z-20 absolute bg-white border-4 border-white py-2">
          <Image
            as={NextImage}
            src={logo.src}
            alt=""
            quality={100}
            width={30}
            height={32}
            className="rounded-none"
          />
        </div>
      </div>

      <Divider />

      <Button
        className="bg-error-light text-error"
        radius="sm"
        onPress={logOut}
      >
        Log out
        <LogOut className="text-error" size={18} />
      </Button>
    </div>
  )
}
