import React, { useState } from 'react'
import type { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  ButtonWithIcon,
  IconCog,
  Modal,
  Alert,
  Button,
  EXPERIMENTAL_Select as Select,
} from 'vtex.styleguide'

/**
 * @todo como vamos a manejar los valores de corte?
 */
const DATE_CUT_OPTIONS = [
  {
    value: 1,
    label: 'Daily',
  },
  {
    value: 7,
    label: 'Weekly',
  },
  {
    value: 15,
    label: 'Bi-weekly',
  },
  {
    value: 30,
    label: 'Monthly',
  },
]

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
        <Modal
          responsiveFullScreen
          centered
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title={<FormattedMessage id="admin/modal-settings.title" />}
          bottomBar={
            <div className="nowrap">
              <span className="mr4">
                <Button
                  variation="tertiary"
                  onClick={() => setOpenModal(false)}
                >
                  <FormattedMessage id="admin/modal-settings.cancel" />
                </Button>
              </span>
              <span>
                {/**
                 * @todo
                 * Cuando se desee guardar, hay que mostrar un mensaje de alerta.
                 * 'Estas seguro que deseas realizar esta accion? Esto provocara que
                 * se invoiceen todas las ordenes para el seller SELLER desde START hasta
                 * AYER, estas de acuerdo?'
                 * */}
                <Button variation="primary" onClick={() => setOpenModal(false)}>
                  <FormattedMessage id="admin/modal-settings.confirm" />
                </Button>
              </span>
            </div>
          }
        >
          <div className="mb6">
            <Alert type="warning">
              <FormattedMessage id="admin/modal-settings.alert-warning" />
            </Alert>
            <p>
              <FormattedMessage id="admin/modal-settings.billingCycle" />
            </p>
            <div className="w-50 mb5">
              <Select
                menuPosition="fixed"
                options={DATE_CUT_OPTIONS}
                multi={false}
                onChange={(values: any) => {
                  // eslint-disable-next-line no-console
                  console.log(
                    `[Select] Selected: ${JSON.stringify(values, null, 2)}`
                  )
                }}
              />
            </div>
            <div>
              <p className="t-small mw9 c-muted-1">
                <FormattedMessage id="admin/modal-settings.billingCycle-helpText" />
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default SettingsDashboard
