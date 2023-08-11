import { NextUIProvider } from '@nextui-org/react'
import { RegisterProvider } from './hooks/register'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <RegisterProvider>{children}</RegisterProvider>
    </NextUIProvider>
  )
}
