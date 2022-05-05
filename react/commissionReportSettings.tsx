/* eslint-disable vtex/prefer-early-return */
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import {
  Layout,
  PageBlock,
  PageHeader,
  ActionMenu,
  IconOptionsDots,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

import { GET_SELLERS } from './graphql'
import SelectComponent from './components/Dashboard/Filter/select'
import { TableComponent } from './components'

const CommissionReportSettings: FC = () => {
  const { navigate } = useRuntime()
  const [dataFilter, setDataFilter] = useState<DataFilter[] | []>([])
  const [optionsSelect, setOptionsSelect] = useState<any>([])
  const [sellersResult, setSellersRestul] = useState<SettingsSellers[] | []>([])

  const { data: dataSellers } = useQuery(GET_SELLERS, {
    ssr: false,
    pollInterval: 0,
  })

  useEffect(() => {
    if (dataSellers) {
      const builtSelectSeller: DataFilter[] = []
      const dataTableDashboard: SettingsSellers[] = []

      dataSellers.getSellers.sellers.forEach((seller: DataSeller) => {
        builtSelectSeller.push({
          value: { id: seller.id, name: seller.name },
          label: seller.name,
        })
        dataTableDashboard.push({
          id: seller.id,
          name: seller.name,
        })
      })
      setSellersRestul(dataTableDashboard)
      setOptionsSelect(builtSelectSeller)
    }
  }, [dataSellers])

  const Actions = ({ data }: any) => {
    return (
      <ActionMenu
        buttonProps={{
          variation: 'tertiary',
          icon: <IconOptionsDots />,
        }}
        options={[
          {
            label: 'Detail',
            onClick: () => {
              navigate({
                to: `/admin/app/commission-report/settings/detail/${data.id}`,
              })
            },
          },
        ]}
      />
    )
  }

  const schemaTable = [
    {
      id: 'name',
      title: 'Seller name',
      width: '90em',
      cellRenderer: (props: CellRendererProps) => {
        return <span>{props.data}</span>
      },
    },
    {
      id: 'id',
      title: 'Actions',
      width: '10em',
      cellRenderer: (props: CellRendererProps) => <Actions {...props} />,
      extended: true,
    },
  ]

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/navigation.settings" />}
        />
      }
    >
      <div>
        <PageBlock>
          <div className="mt4 mb7">
            <SelectComponent
              options={optionsSelect}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
            />
          </div>
        </PageBlock>
      </div>
      <div className="mt2">
        <PageBlock>
          <div className="mt4 mb7">
            <TableComponent
              schemaTable={schemaTable}
              items={sellersResult}
              loading={false}
            />
          </div>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default CommissionReportSettings
