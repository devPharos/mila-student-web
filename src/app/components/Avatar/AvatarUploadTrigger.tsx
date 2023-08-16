import { ChangeEvent } from 'react'
import styles from './AvatarUploadTrigger.module.css'
import { Avatar } from '@nextui-org/react'
import { Student } from '@/app/@types/dashboard'

type Props = {
  student: Student
  updateProfilePic: (
    registrationNumber: string,
    email: string,
    file: Blob,
  ) => void
  onNewSelectedFile: (imageResult: string) => void
}
function AvatarUploadTrigger({ student, onNewSelectedFile }: Props) {
  function onSelectFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      // on load the reader.result is always an image
      reader.addEventListener('load', () => {
        onNewSelectedFile(reader.result as string)
      })
      reader.readAsDataURL(e.target.files[0])
      console.log(e.target.files[0])
    }
  }
  return (
    <label className={styles.container}>
      <input
        type="file"
        accept="image/*"
        onClick={(e) => {
          e.currentTarget.value = ''
        }}
        onChange={onSelectFile}
      />
      <Avatar className="w-20 h-20" src={student.imageUrl || undefined} />
    </label>
  )
}
export default AvatarUploadTrigger
