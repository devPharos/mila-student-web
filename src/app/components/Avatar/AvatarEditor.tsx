import { useState, useCallback, useRef } from 'react'
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import styles from './AvatarEditor.module.css'
import { Button } from '@nextui-org/react'
import { Student } from '@/app/@types/dashboard'

export function getCroppedImg(
  student: { registrationNumber: any; email: any },
  updateProfilePic: (
    registrationNumber: string,
    email: string,
    file: Blob,
  ) => void,
  image: any,
  crop: { width: number; height: number; x: number; y: number } | null,
) {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop?.width || 0
  canvas.height = crop?.height || 0
  const ctx = canvas.getContext('2d')

  // New lines to be added
  const pixelRatio = window.devicePixelRatio
  canvas.width = (crop?.width || 0) * pixelRatio
  canvas.height = (crop?.height || 0) * pixelRatio
  ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

  ctx?.drawImage(
    image,
    (crop?.x || 0) * scaleX,
    (crop?.y || 0) * scaleY,
    (crop?.width || 0) * scaleX,
    (crop?.height || 0) * scaleY,
    0,
    0,
    crop?.width || 0,
    crop?.height || 0,
  )

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
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
  sourceImg: string
  student: Student
  updateProfilePic: (
    registrationNumber: string,
    email: string,
    file: Blob,
  ) => void
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
    height: 100,
  })
  const [completedCrop, setCompletedCrop] = useState<any>(null)

  const onLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img
    console.log({ img })
  }, [])

  const uploadImage = async () => {
    console.log({ imgRef })
    const blobImg = await getCroppedImg(
      student,
      updateProfilePic,
      imgRef.current,
      completedCrop,
    )
    // upload to supabase
    onFinishUpload()
  }

  return (
    <div className="App">
      <ReactCrop
        // src={sourceImg}
        // onImageLoaded={onLoad}
        crop={crop}
        aspect={1}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        // circularCrop={false}
        keepSelection={true}
        minWidth={100}
        minHeight={100}
        className={styles.crop}
      >
        <img ref={imgRef} src={sourceImg} alt="" />
      </ReactCrop>
      <Button color="primary" onPress={uploadImage}>
        Upload avatar
      </Button>
    </div>
  )
}

export default AvatarEditor
