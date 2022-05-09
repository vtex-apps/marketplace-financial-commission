/* eslint-disable vtex/prefer-early-return */
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import {
  Layout,
  PageBlock,
  PageHeader,
  ActionMenu,
  IconOptionsDots,
  Alert,
  EXPERIMENTAL_Select as Select,
  Box,
  Button,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

import { GET_SELLERS } from './graphql'
import SelectComponent from './components/Dashboard/Filter/select'
import { TableComponent } from './components'

const CommissionReportSettings: FC = () => {
  const { navigate } = useRuntime()
  const [dataFilter, setDataFilter] = useState<DataFilter[]>([])
  const [optionsSelect, setOptionsSelect] = useState<any>([])
  const [sellersResult, setSellersRestul] = useState<SettingsSellers[] | []>([])
  const [selectedValue, setSelectValue] = useState({})

  const { data: dataSellers } = useQuery(GET_SELLERS, {
    ssr: false,
    pollInterval: 0,
  })

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

  useEffect(() => {
    if (dataFilter) {
      console.info('dataFilter ', dataFilter)
      console.info('selectedValue ', selectedValue)
      // eslint-disable-next-line array-callback-return
      // const sellerFilterResult = sellersResult.filter(
      //   (item) => item.id === dataFilter.value.id
      // )

      // console.info('sellerFilterResult ', sellerFilterResult)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFilter])

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
      <div className="mb6">
        <Box>
          <h2>
            <FormattedMessage id="admin/modal-settings.billingCycle" />
          </h2>
          <div className="mb4">
            <Alert type="warning">
              <FormattedMessage id="admin/modal-settings.alert-warning" />
            </Alert>
            <div className="mb5 flex w-100 mt6">
              <div className="w-90">
                <Select
                  menuPosition="fixed"
                  options={DATE_CUT_OPTIONS}
                  multi={false}
                  onChange={(values: any) => {
                    setSelectValue(JSON.stringify(values, null, 2))
                  }}
                />
              </div>
              <div className="w-10 pl2">
                <Button variation="primary" onClick={() => {}}>
                  SAVE
                </Button>
              </div>
            </div>
            <div className="w-100">
              <p className="t-small mw9 c-muted-1">
                <FormattedMessage id="admin/modal-settings.billingCycle-helpText" />
              </p>
            </div>
          </div>
        </Box>
      </div>
      <p className="c-action-primary hover-c-action-primary fw5 ml2 mt6">
        Billing Cycle Detail
      </p>
      <div className="mt6">
        <PageBlock>
          <div className="mt2 mb2">
            <SelectComponent
              options={optionsSelect}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
              multi={false}
              customLabel={
                <FormattedMessage id="admin/table.title-seller-label" />
              }
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
