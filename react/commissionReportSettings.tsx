import React from 'react'
import { settings as Settings } from 'vtex.components-financial-commission'

import { GET_SELLERS, CREATE_SETTINGS, GET_SETTINGS } from './graphql'

const CommissionReportSettings = () => {
  return (
    <Settings
      getSellersQuery={GET_SELLERS}
      createSettingsMutation={CREATE_SETTINGS}
      getSettingsQuery={GET_SETTINGS}
    />
  )
}

export default CommissionReportSettings
