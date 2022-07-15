import React from 'react'
import { settingsDetail as SettingsDetail } from 'vtex.components-financial-commission'

import {
  CREATE_TOKEN,
  EDIT_TOKEN,
  GET_TOKEN,
  CREATE_SETTINGS,
  GET_SETTINGS,
} from './graphql'

const CommissionReportSettingsDetail = () => {
  return (
    <SettingsDetail
      createTokenMutation={CREATE_TOKEN}
      editToken={EDIT_TOKEN}
      getTokenQuery={GET_TOKEN}
      createSettingsMutation={CREATE_SETTINGS}
      getSettingsQuery={GET_SETTINGS}
    />
  )
}

export default CommissionReportSettingsDetail
