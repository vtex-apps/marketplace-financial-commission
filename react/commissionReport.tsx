import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import {
  Layout,
  PageBlock,
  IconShoppingCart,
  IconUser,
  IconArrowUp,
  IconInfo,
  PageHeader
} from 'vtex.styleguide'
import { useLazyQuery, useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage  } from 'react-intl'
import { TableComponent, Totalizer, Filter, SettingsDashboard } from './components'
import { GETSELLERS, STATS, DASHBOARD } from './graphql'

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
    cellRenderer: () => { },
  },
]

const CommissionReport: FC= () => {
  const { culture } = useRuntime()

  const [optionsSelect, setOptionsSelect] = useState<any>([])
  const [openModal, setOpenModal] = useState(false)
  const [sellersDashboard, setSellersDashboard] = useState<any>([])
  const [sellersDashboardFilter, setSellersDashboardFilter] = useState<any>([])
  const [statsTotalizer, setStatsTotalizer] = useState<StatsTotalizer[]>([{
    label: '',
    value: '',
    iconBackgroundColor: ''
  }])

  const [startDate, setStartDate] = useState('')
  const [finalDate, setFinalDate] = useState('')


  const [stats, { data: dataStats }] = useLazyQuery(STATS, {
    ssr: false,
    pollInterval: 0,
  })

  const { data: dataSellers } = useQuery(GETSELLERS, {
    ssr: false,
    pollInterval: 0,
  })

  const [dashboard, { data: dataDashboard }] = useLazyQuery(DASHBOARD, {
    ssr: false,
    pollInterval: 0,
  })

  useEffect(() => {

    const defaultDate = new Date();
    const defaultStart = new Date(defaultDate.getFullYear(), defaultDate.getMonth(), 1)
    const defaultStartString = defaultStart.getFullYear() + "-" + (defaultStart.getMonth() + 1) + "-" + "01"
    const valueDate = defaultDate.getDate() - 1
    const dateDefault = valueDate <= 9 ? "0" + valueDate : valueDate
    const defaultFinal = defaultDate.getFullYear() + "-" + (defaultDate.getMonth() + 1) + "-" + dateDefault
    setStartDate(defaultStartString)
    setFinalDate(defaultFinal)

    stats()
    dashboard()

    if (dataStats) {

      setStatsTotalizer([
        {
          label: 'Number of Sellers',
          value: dataDashboard ? dataDashboard.dashboard.sellers.length : 0,
          iconBackgroundColor: '#EAFCE3',
          icon: <IconUser color="#79B03A" size={18} />
        },
        {
          label: 'Total Orders',
          value: dataStats.stats.statistics.ordersCount,
          iconBackgroundColor: '#CCE8FF',
          icon: <IconShoppingCart color="#368DF7" size={18} />
        },
        {
          label: 'Total Amount Orders',
          value: (dataStats.stats.statistics.totalOrderValue.toFixed(2)).toString(),
          iconBackgroundColor: '#FFDCF8',
          icon: <IconArrowUp color="#F67CC7" size={14} />
        },
        {
          label: 'Total Commission',
          value: (dataStats.stats.statistics.totalComission.toFixed(2)).toString(),
          iconBackgroundColor: '#FFF0EC',
          icon: <IconInfo color="#F7634A" size={14} />
        },
      ])
    }

    if (dataSellers) {
      let builtSelectSeller: any = []
      dataSellers.getSellers.items.forEach((seller: any) => {
        builtSelectSeller.push({
          value: { id: seller.id, name: seller.name },
          label: seller.name
        })
      })

      setOptionsSelect(builtSelectSeller)
    }

    if (dataDashboard) {
      let dataTableDashboard: any = []
      dataDashboard.dashboard.sellers.forEach((item: any) => {
        dataTableDashboard.push({
          name: item.name,
          dateInvoiced: item.statistics.dateInvoiced,
          ordersCount: item.statistics.ordersCount.toFixed(2),
          totalComission: item.statistics.totalComission.toFixed(2),
          totalOrderValue: item.statistics.totalOrderValue.toFixed(2)
        })
      });
      setSellersDashboard(dataTableDashboard)
    }
  }, [dataStats, dataSellers, dataDashboard])

  return (
    <Layout
      fullWidth
      pageHeader={
        <PageHeader
          title={
            <FormattedMessage id="admin/navigation.title" />
          }
       />
      }>
      <div>
        <SettingsDashboard openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb7">
            {(startDate && finalDate) ?
              <Filter
              dataWithoutFilter={sellersDashboard}
              setDataWithoutFilter={setSellersDashboardFilter}
              startDatePicker={new Date(startDate)}
              finalDatePicker={new Date(finalDate)}
              locale={culture.locale}
              optionsSelect={optionsSelect}
              setStartDate={setStartDate}
              setFinalDate={setFinalDate}
              /> : <div />
            }
          </div>
        </PageBlock>
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb5">
            <Totalizer item={statsTotalizer} />
          </div>
        </PageBlock>
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb7">
            <TableComponent schemaTable={schemaTable} items={sellersDashboardFilter.length ? sellersDashboardFilter : sellersDashboard} />
          </div>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default CommissionReport
