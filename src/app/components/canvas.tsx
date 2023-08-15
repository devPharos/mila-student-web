'use client'
import { useEffect, useRef } from 'react'

const useCanvas = (callback: any) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas: any = canvasRef.current
    const ctx: any = canvas?.getContext('2d')
    // callback([canvas, ctx])
  }, [])

  return canvasRef
}

export const Canvas = () => {
  const canvasRef = useCanvas(([canvas, ctx]: any) => {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  })

  const canvas = canvasRef.current

  // const qrcode = new QrCodeWithLogo({
  //   canvas,
  //   content: `https://form.jotform.com/222696636785069?milaId=${
  //     studentData.registrationNumber
  //   }-${studentData.name?.toUpperCase()}`,
  //   logo: {
  //     src: 'https://avatars1.githubusercontent.com/u/28730619?s=460&v=4',
  //   },
  // }).toCanvas()

  return <canvas ref={canvasRef} />
}
