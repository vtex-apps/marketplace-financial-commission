import React, { useState } from 'react'
import type { FC } from 'react'
import { ButtonWithIcon, IconCog, Modal } from 'vtex.styleguide'
/**
 *
 * @todo
 * - Esto son los DEFAULT settings, hay que cambiar los textos acorde.
 * Estos settings impactaran todos los sellers que no esten seteados previamente
 * - tipear props
 * - resolver 'isDisabled' si hay mas de 1 seller, o ninguno en los filtros,
 * no se pueden editar settings.
 * - Mensaje de alerta! (Mas abajo)
 */
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
