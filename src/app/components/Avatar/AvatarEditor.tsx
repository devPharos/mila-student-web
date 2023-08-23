/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef } from 'react'
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import styles from './AvatarEditor.module.css'
import { Button } from '@nextui-org/react'

export function getCroppedImg(
  student: { registrationNumber: any; email: any },
  updateProfilePic: (arg0: any, arg1: any, arg2: Blob | null) => void,
  image: any,
  crop: { width: number; height: number; x: number; y: number },
  fileName: string,
) {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')

  // New lines to be added
  const pixelRatio = window.devicePixelRatio
  canvas.width = crop.width * pixelRatio
  canvas.height = crop.height * pixelRatio
  if (ctx) {
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    )
  }

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          blob.name = fileName
          resolve(blob)
          updateProfilePic(student.registrationNumber, student.email, blob)
        }
      },
      'image/jpeg',
      1,
    )
  })
}

type Props = {
  student: object
  updateProfilePic: () => void
  sourceImg: string
  onFinishUpload: () => void
}
function AvatarEditor({
  student,
  updateProfilePic,
  sourceImg,
  onFinishUpload,
}: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 100,
    height: 100
  })
  const [completedCrop, setCompletedCrop] = useState(null)

  // console.log(sourceImg)

  const onLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img
  }, [])

  const uploadImage = async () => {
    await getCroppedImg(
      student,
      updateProfilePic,
      imgRef.current,
      completedCrop,
      'avatar',
    )
    // upload to supabase
    onFinishUpload()
  }

  return (
    <div className="App">
      <ReactCrop
        src={sourceImg}
        onImageLoaded={onLoad}
        crop={crop}
        aspect={1}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        circularCrop={false}
        keepSelection={true}
        minWidth={100}
        minHeight={100}
        className={styles.crop}
      >
        <img ref={imgRef} alt="profile" src={sourceImg} />
      </ReactCrop>
      <Button color="primary" onPress={uploadImage}>
        Upload avatar
      </Button>
      {/* <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={uploadImage}
      >
       Upload avatar
      </button> */}
    </div>
  )
}

export default AvatarEditor
