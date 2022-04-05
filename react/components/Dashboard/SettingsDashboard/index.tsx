import type { FC } from 'react'
import React from 'react'
import { FormattedMessage  } from 'react-intl'
import {
  ButtonWithIcon,
  IconCog,
  ModalDialog,
} from 'vtex.styleguide'

const SettingsDashboard: FC<SettingsProps> = (props) => {

  return(
    <div>
      <div style={{ textAlign: 'right' }}>
        <ButtonWithIcon
          icon={<IconCog color="#3F3F40" size={20} />}
          variation="tertiary"
          onClick={() => props.setOpenModal(!props.openModal)}
        />
      </div>
      <div>
        <ModalDialog
          centered
          isOpen={props.openModal}
          confirmation={{
            onClick: () => {},
            label: `${<FormattedMessage id="admin/title-modal-send" />}`,
          }}
          cancelation={{
            onClick: () => props.setOpenModal(false),
            label: `${<FormattedMessage id="admin/title-modal-cancel" />}`,
          }}
          onClose={() => props.setOpenModal(false)}
        >
          <div className="flex w-100">Falta por diseñar y estructurar</div>
        </ModalDialog>
      </div>
    </div>
  )
}

export default SettingsDashboard
