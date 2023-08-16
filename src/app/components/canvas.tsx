'use client'
import { useEffect, useRef } from 'react'

const useCanvas = (callback: any) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas: any = canvasRef.current
    canvas?.getContext('2d')
  }, [])

  return canvasRef
}

export const Canvas = () => {
  const canvasRef = useCanvas(([canvas, ctx]: any) => {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  })

  return <canvas ref={canvasRef} />
}
