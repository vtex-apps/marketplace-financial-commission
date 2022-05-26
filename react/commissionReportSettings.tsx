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
import { useQuery, useMutation } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import {
  table as TableComponent,
  pagination as PaginationComponent,
} from 'vtex.components-financial-commission'

import { GET_SELLERS, CREATE_SETTINGS, GET_SETTINGS } from './graphql'
import { Filter } from './components'

const CommissionReportSettings: FC = () => {
  const { navigate } = useRuntime()
  const [sellersId, setSellersId] = useState('')
  const [optionsSelect, setOptionsSelect] = useState<any>([])
  const [sellersResult, setSellersResult] = useState<SettingsSellers[] | []>([])
  const [selectedValue, setSelectValue] = useState<any | null>()
  const [createSettings, { data: dataSettings }] = useMutation(CREATE_SETTINGS)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [itemFrom, setItemFrom] = useState(1)
  const [itemTo, setItemTo] = useState(20)
  const [totalItems, setTotalItems] = useState(0)

  const { data: dataSellers } = useQuery(GET_SELLERS, {
    ssr: false,
    pollInterval: 0,
  })

  const { data: dataSellersTable } = useQuery(GET_SELLERS, {
    ssr: false,
    pollInterval: 0,
    variables: {
      listSellersParams: {
        page,
        pageSize,
        sellersId,
      },
    },
  })

  const { data: settings } = useQuery(GET_SETTINGS, {
    ssr: false,
    pollInterval: 0,
  })

  const DATE_CUT_OPTIONS = [
    /* {
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
    }, */
    {
      value: 30,
      label: 'Monthly',
    },
  ]

  useEffect(() => {
    if (settings) {
      setSelectValue({
        value: 30,
        label: settings.getSettings.billingCycle,
      })
    }
  }, [settings])

  useEffect(() => {
    if (dataSellersTable) {
      const dataTableDashboard: SettingsSellers[] = []

      dataSellersTable.getSellers.sellers.forEach((seller: DataSeller) => {
        dataTableDashboard.push({
          id: seller.id,
          name: seller.name,
        })
      })
      setSellersResult(dataTableDashboard)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSellersTable])

  useEffect(() => {
    if (dataSellers) {
      const builtSelectSeller: DataFilter[] = []

      dataSellers.getSellers.sellers.forEach((seller: DataSeller) => {
        builtSelectSeller.push({
          value: { id: seller.id, name: seller.name },
          label: seller.name,
        })
      })
      setOptionsSelect(builtSelectSeller)
      setTotalItems(dataSellers.getSellers.sellers.length)
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

  const handleCreateSettings = () => {
    if (selectedValue) {
      /** @TODO crear funcion en utils para fecha ya que se usa en varios lados la misma conversión */
      const nowDate = new Date()
      const month =
        nowDate.getMonth() + 1 <= 9
          ? `0${nowDate.getMonth() + 1}`
          : nowDate.getMonth() + 1

      const date = `${nowDate.getFullYear()}-${month}-${nowDate.getDate()}`

      const lastDate = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() + 1,
        0
      )

      const lastMonth =
        lastDate.getMonth() + 1
          ? `0${lastDate.getMonth() + 1}`
          : lastDate.getMonth() + 1

      const lastDateString = `${lastDate.getFullYear()}-${lastMonth}-${lastDate.getDate()}`

      createSettings({
        variables: {
          settingsData: {
            startCycle: date,
            endDate: lastDateString,
            billingCycle: selectedValue.label,
          },
        },
      })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    /** @TODO alert para mostrar que los datos se guardaron con exito */
    if (dataSettings) {
      console.info('dataSettings Resultado ', dataSettings)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSettings])

  const changeRows = (row: number) => {
    setPageSize(row)
    setItemTo(row)
    setItemFrom(1)
    setPage(1)
  }

  const onNextClick = () => {
    const nextPage = page + 1

    const currentTo = pageSize * nextPage
    const currentFrom = itemTo + 1

    setItemTo(currentTo)
    setItemFrom(currentFrom)
    setPage(nextPage)
  }

  const onPrevClick = () => {
    const previousPage = page - 1

    const currentTo = itemTo - pageSize
    const currentFrom = itemFrom - pageSize

    setItemTo(currentTo)
    setItemFrom(currentFrom)
    setPage(previousPage)
  }

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/navigation.settings" />}
        />
      }
    >
      <div className="mb2">
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
                  value={selectedValue}
                  onChange={(values: any) => {
                    setSelectValue(values)
                  }}
                />
              </div>
              <div className="w-10 pl2">
                <Button
                  variation="primary"
                  onClick={() => {
                    handleCreateSettings()
                  }}
                >
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
          <div className="mt4 mb5">
            <Filter
              optionsSelect={optionsSelect}
              setSellerId={setSellersId}
              setTotalItems={setTotalItems}
              multiValue
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
            <PaginationComponent
              setPageSize={setPageSize}
              currentPage={itemFrom}
              pageSize={itemTo}
              setPage={setPage}
              totalItems={totalItems}
              onNextClick={onNextClick}
              changeRows={changeRows}
              onPrevClick={onPrevClick}
            />
          </div>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default CommissionReportSettings
