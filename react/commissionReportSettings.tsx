import React from 'react'
import { settings as Settings } from 'vtex.components-financial-commission'

import {
  GET_SELLERS,
  CREATE_SETTINGS,
  GET_SETTINGS,
  EDIT_TOKEN,
  CREATE_TOKEN,
  GET_TOKEN,
} from './graphql'

const CommissionReportSettings = () => {
  return (
    <Settings
      getSellersQuery={GET_SELLERS}
      createSettingsMutation={CREATE_SETTINGS}
      getSettingsQuery={GET_SETTINGS}
      editToken={EDIT_TOKEN}
      createTokenMutation={CREATE_TOKEN}
      getTokenQuery={GET_TOKEN}
    />
  )
}

export default CommissionReportSettings
