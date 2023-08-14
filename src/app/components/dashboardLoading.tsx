'use client'
import { Spinner } from '@nextui-org/react'

export default function DashboardLoading() {
  return (
    <div className="bg-neutral-lighter flex flex-col items-center justify-center p-6 w-full  min-h-screen">
      <Spinner label="Loading..." color="primary" labelColor="primary" />
    </div>
  )
}
