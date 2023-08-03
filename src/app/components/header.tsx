import { Avatar, Image } from '@nextui-org/react'
import logo from '../assets/no-text-logo.svg'

export function Header() {
  return (
    <div className="flex items-center justify-between gap-4 w-full py-4 px-10 border-1 border-neutral-light bg-white">
      <Image src={logo.src} alt="" width={70} className="rounded-none" />

      <div className="flex items-center gap-2 ">
        <Avatar />
        <span className="text-sm">
          Hello, <span className="font-semibold text-primary">Daniel</span>
        </span>
      </div>
    </div>
  )
}
