import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-apollo'

import { GET_SELLERS } from './graphql'
import Filter from './components/Dashboard/Filter'

const CommissionReportSettings: FC = () => {
  const { culture } = useRuntime()
  const [optionsSelect, setOptionsSelect] = useState<any>([])

  const { data: dataSellers } = useQuery(GET_SELLERS, {
    ssr: false,
    pollInterval: 0,
  })

  useEffect(() => {
    const builtSelectSeller: DataFilter[] = []

    dataSellers.getSellers.items.forEach((seller: DataSeller) => {
      builtSelectSeller.push({
        value: { id: seller.id, name: seller.name },
        label: seller.name,
      })
    })
    setOptionsSelect(builtSelectSeller)
  }, [dataSellers])

  return (
    <Layout
      fullWidth
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/navigation.settings" />}
        />
      }
    >
      <div>
        <PageBlock>
          <div className="mt4 mb7">
            <Filter
              dataWithoutFilter={[]}
              optionsSelect={optionsSelect}
              setDataWithoutFilter={[]}
              locale={culture.locale}
            />
          </div>
        </PageBlock>
      </div>
      <div className="mt2">
        <PageBlock>
          <div className="mt4 mb7">Settings</div>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default CommissionReportSettings
