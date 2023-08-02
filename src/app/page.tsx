import { Image } from '@nextui-org/react'

export default function Home() {
  return (
    <div className="grid grid-columns-2">
      <div className="bg-primary" />
      <div className="bg-secondary">
        <Image />
      </div>
    </div>
  )
}
