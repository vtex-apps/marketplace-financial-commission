import type { FC } from 'react'
import React from 'react'
import type { InjectedIntlProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import {
  ButtonWithIcon,
  IconCog,
  ModalDialog,
} from 'vtex.styleguide'

import { message } from '../../../utils/definedMessages'


const SettingsDashboard: FC<SettingsProps & InjectedIntlProps> = (props) => {

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
            label: `${formatIOMessage({id: message.ModalSend.id, intl: props.intl,}).toString()}`,
          }}
          cancelation={{
            onClick: () => props.setOpenModal(false),
            label: `${formatIOMessage({id: message.ModalCancel.id, intl: props.intl,}).toString()}`,
          }}
          onClose={() => props.setOpenModal(false)}
        >
          <div className="flex w-100">Falta por diseñar y estructurar</div>
        </ModalDialog>
      </div>
    </div>
  )
}

export default injectIntl(SettingsDashboard)
