import React, { useState } from 'react'
import type { FC } from 'react'
import { ModalDialog, Input } from 'vtex.styleguide'

const ModalConfirm: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  /** @todo pasar textos como props y pasar funciones para consumo servicio, crear interfaz en global */
  return (
    <ModalDialog
      centered
      confirmation={{
        onClick: () => {},
        label: 'Confirm',
      }}
      cancelation={{
        onClick: () => setIsModalOpen(!isModalOpen),
        label: 'Cancel',
      }}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(!isModalOpen)}
    >
      <div>
        <p>Mensaje por props aquí</p>
        <div>
          <Input placeholder="Seller ID" size="large" />
        </div>
      </div>
    </ModalDialog>
  )
}

export default ModalConfirm
