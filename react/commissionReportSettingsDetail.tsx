import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { Layout, PageHeader, Input } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'

import { GET_TOKEN } from './graphql'

const CommissionReportSettingsDetail: FC = () => {
  const [tokenSeller, setTokenSeller] = useState<string>()
  const { route } = useRuntime()

  const { data: getToken } = useQuery(GET_TOKEN, {
    ssr: false,
    pollInterval: 0,
    variables: {
      sellerId: route.params.sellerId,
    },
  })

  useEffect(() => {
    if (getToken) {
      setTokenSeller(getToken.getToken.autheticationToken)
    }
  }, [getToken])

  return (
    <Layout
      fullWidth
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/navigation.settings" />}
        />
      }
    >
      <div className="mt7">
        <div className="mb5">
          <Input
            placeholder="Token"
            readOnly
            label="Seller Token"
            value={tokenSeller}
          />
        </div>
      </div>
    </Layout>
  )
}

export default CommissionReportSettingsDetail
