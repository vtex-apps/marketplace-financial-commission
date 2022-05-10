import React, { useState } from 'react'
import type { FC } from 'react'
import { ButtonWithIcon, IconCog, Modal } from 'vtex.styleguide'

const SettingsDashboard: FC = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <ButtonWithIcon
          icon={<IconCog color="#3F3F40" size={20} />}
          variation="tertiary"
          onClick={() => setOpenModal(!openModal)}
        />
      </div>
      <div>
        <Modal>
          <div>aqui columnas tablas</div>
        </Modal>
      </div>
    </div>
  )
}

export default SettingsDashboard
