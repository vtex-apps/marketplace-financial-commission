import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import {
  Layout,
  PageBlock,
  IconShoppingCart,
  IconUser,
  IconArrowUp,
  IconInfo,
  PageHeader,
} from 'vtex.styleguide'
import { useQuery, useLazyQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'

import {
  Filter,
  SettingsDashboard,
  Totalizer,
  TableComponent,
} from './components'
import { GET_SELLERS, SEARCH_STATS, SEARCH_SELLERS } from './graphql'

export const schemaTable = [
  {
    id: 'name',
    title: 'Seller name',
    sortable: true,
  },
  {
    id: 'dateInvoiced',
    title: 'Date Invoiced',
  },
  {
    id: 'ordersCount',
    title: 'Total Orders',
  },
  {
    id: 'totalComission',
    title: 'Total commission',
  },
  {
    id: 'totalOrderValue',
    title: 'Total Amount Orders',
  },
  {
    id: 'actions',
    title: 'Actions',
    cellRenderer: () => {},
  },
]

const CommissionReport: FC = () => {
  const { culture } = useRuntime()
  const [optionsSelect, setOptionsSelect] = useState<any>([])
  const [startDate, setStartDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [openModal, setOpenModal] = useState(false)
  const [statsTotalizer, setStatsTotalizer] = useState<any[]>([
    {
      label: '',
      value: '',
      iconBackgroundColor: '',
    },
  ])

  const [sellersDashboard, setSellersDashboard] = useState<any>([])
  const [sellersDashboardFilter, setSellersDashboardFilter] = useState<any>([])

  const { data: dataSellers } = useQuery(GET_SELLERS, {
    ssr: false,
    pollInterval: 0,
  })

  const [stats, { data: dataStats, loading: loadingStats }] = useLazyQuery(
    SEARCH_STATS,
    {
      ssr: false,
      pollInterval: 0,
      variables: {
        params: {
          dateStart: startDate,
          dateEnd: finalDate,
        },
      },
    }
  )

  const [dashboard, { data: dataDashboard, loading: loadingDataDashboard }] =
    useLazyQuery(SEARCH_SELLERS, {
      ssr: false,
      pollInterval: 0,
      variables: {
        param: {
          dateStart: startDate,
          dateEnd: finalDate,
          page,
          pageSize,
        },
      },
    })

  useEffect(() => {
    const defaultDate = new Date()
    const defaultStart = new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth(),
      1
    )

    const defaultStartString =
      `${defaultStart.getFullYear()}-${defaultStart.getMonth() + 1}-` + `01`

    const valueDate = defaultDate.getDate() - 1
    const dateDefault = valueDate <= 9 ? `0${valueDate}` : valueDate
    const defaultFinal = `${defaultDate.getFullYear()}-${
      defaultDate.getMonth() + 1
    }-${dateDefault}`

    setStartDate(defaultStartString)
    setFinalDate(defaultFinal)

    stats()
    dashboard()

    // eslint-disable-next-line vtex/prefer-early-return
    if (dataSellers) {
      const builtSelectSeller: any = []

      dataSellers.getSellers.items.forEach((seller: any) => {
        builtSelectSeller.push({
          value: { id: seller.id, name: seller.name },
          label: seller.name,
        })
      })
      setOptionsSelect(builtSelectSeller)
    }

    if (dataDashboard) {
      const dataTableDashboard: any = []

      dataDashboard.searchSellersDashboard.sellers.forEach((item: any) => {
        dataTableDashboard.push({
          name: item.name,
          dateInvoiced: item.statistics.dateInvoiced,
          ordersCount: item.statistics.ordersCount.toFixed(2),
          totalComission: item.statistics.totalComission.toFixed(2),
          totalOrderValue: item.statistics.totalOrderValue.toFixed(2),
        })
      })
      console.info('TESTTTT ', dataDashboard)
      setSellersDashboard(dataTableDashboard)
    }

    if (dataStats) {
      setStatsTotalizer([
        {
          label: 'Number of Sellers',
          value: dataDashboard
            ? dataDashboard.searchSellersDashboard.sellers.length
            : 0,
          iconBackgroundColor: '#EAFCE3',
          icon: <IconUser color="#79B03A" size={18} />,
        },
        {
          label: 'Total Orders',
          value: dataStats.searchStatisticsDashboard.statistics.ordersCount,
          iconBackgroundColor: '#CCE8FF',
          icon: <IconShoppingCart color="#368DF7" size={18} />,
        },
        {
          label: 'Total Amount Orders',
          value: dataStats.searchStatisticsDashboard.statistics.totalOrderValue
            .toFixed(2)
            .toString(),
          iconBackgroundColor: '#FFDCF8',
          icon: <IconArrowUp color="#F67CC7" size={14} />,
        },
        {
          label: 'Total Commission',
          value: dataStats.searchStatisticsDashboard.statistics.totalComission
            .toFixed(2)
            .toString(),
          iconBackgroundColor: '#FFF0EC',
          icon: <IconInfo color="#F7634A" size={14} />,
        },
      ])
    }
  }, [dataSellers, dataDashboard, stats, dataStats, dashboard])

  return (
    <Layout
      pageHeader={
        <PageHeader title={<FormattedMessage id="admin/navigation.title" />} />
      }
    >
      <div>
        <SettingsDashboard openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      {startDate && finalDate && (
        <div className="mt2">
          <PageBlock>
            <div className="mt4 mb5">
              <Filter
                dataWithoutFilter={sellersDashboard}
                setDataWithoutFilter={setSellersDashboardFilter}
                startDatePicker={new Date(startDate)}
                finalDatePicker={new Date(finalDate)}
                locale={culture.locale}
                optionsSelect={optionsSelect}
                setStartDate={setStartDate}
                setFinalDate={setFinalDate}
              />
            </div>
          </PageBlock>
        </div>
      )}
      <div className="mt2">
        <PageBlock>
          <div className="mt4 mb5">
            <Totalizer item={statsTotalizer} loading={loadingStats} />
          </div>
        </PageBlock>
      </div>
      <div className="mt2">
        <PageBlock>
          <div className="mt4 mb7">
            <TableComponent
              schemaTable={schemaTable}
              items={sellersDashboard}
              loading={loadingDataDashboard}
            />
          </div>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default CommissionReport
