import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { Layout, PageHeader } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'

import { GET_TOKEN } from './graphql'

const CommissionReportSettingsDetail: FC = () => {
  const [tokenSeller, setTokenSeller] = useState<any>(null)
  const { route } = useRuntime()

  const { data: error } = useQuery(GET_TOKEN, {
    ssr: false,
    pollInterval: 0,
    variables: {
      sellerId: route.params.sellerId,
    },
  })

  useEffect(() => {
    if (error) {
      setTokenSeller(null)
      // setTokenSeller(data)
    }
  }, [error])

  return (
    <Layout
      fullWidth
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/navigation.settings" />}
        />
      }
    >
      <div className="mt7">{tokenSeller}</div>
    </Layout>
  )
}

export default CommissionReportSettingsDetail
