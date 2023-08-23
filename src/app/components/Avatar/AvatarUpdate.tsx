'use client'
import { useEffect, useState } from 'react'
import AvatarEditor from './AvatarEditor'
import AvatarUploadTrigger from './AvatarUploadTrigger'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from '@nextui-org/react'

function AvatarUpdate({ student, updateProfilePic }) {
  const [file, setFile] = useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    console.log({ isOpen })
  }, [isOpen])
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <AvatarEditor
                  student={student}
                  updateProfilePic={updateProfilePic}
                  sourceImg={file}
                  onFinishUpload={onClose}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                        Action
                    </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <AvatarUploadTrigger
        student={student}
        updateProfilePic={updateProfilePic}
        onNewSelectedFile={(file) => {
          onOpen()
          setFile(file)
        }}
      />
    </>
  )
}

export default AvatarUpdate
