import React, { useState } from 'react'
import type { FC } from 'react'
import { ButtonWithIcon, ModalDialog, Input, IconPlus } from 'vtex.styleguide'

const ModalConfirm: FC<ModalConfirmData> = (props) => {
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  /** @todo pasar textos como props y pasar funciones para consumo servicio, crear interfaz en global */
  return (
    <>
      <ModalDialog
        centered
        confirmation={{
          onClick: () => {
            props.createInvoice(
              props.sellerData.startDate,
              props.sellerData.finalDate,
              props.sellerData.sellerName,
              email
            )
            setIsModalOpen(!isModalOpen)
          },
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
          <p>{props.messages.warning}</p>
          <p>{props.messages.confirmation}</p>
          <div>
            <Input
              placeholder="e-mail"
              size="large"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value)
              }}
              type="email"
              required
            />
          </div>
        </div>
      </ModalDialog>
      <div className="mb5 flex justify-end">
        <ButtonWithIcon
          icon={<IconPlus />}
          onClick={() => {
            setIsModalOpen(!isModalOpen)
          }}
        >
          {props.buttonMessage}
        </ButtonWithIcon>
      </div>
    </>
  )
}

export default ModalConfirm
