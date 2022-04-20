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
  ActionMenu,
  IconOptionsDots,
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
import PaginationComponent from './components/Dashboard/Table/Tablev2/pagination'

const CommissionReport: FC = () => {
  const { culture, navigate } = useRuntime()
  const [optionsSelect, setOptionsSelect] = useState<any>([])
  const [startDate, setStartDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [defaultStartDate, setDefaultStartDate] = useState('')
  const [defaultFinalDate, setDefaultFinalDate] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [itemFrom, setItemFrom] = useState(1)
  const [itemTo, setItemTo] = useState(5)
  const [totalItems, setTotalItems] = useState(0)
  const [totalItemsFilter, setTotalItemsFilter] = useState(0)
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
          sellerId: '',
        },
      },
    })

  const schemaTable = [
    {
      id: 'name',
      title: 'Seller name',
      cellRenderer: (props: any) => {
        return <span>{props.data}</span>
      },
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
      id: 'id',
      title: 'Actions',
      cellRenderer: (props: any) => {
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
                    to: `/admin/app/commission-report/detail/${props.data}`,
                  })
                },
              },
            ]}
          />
        )
      },
    },
  ]

  useEffect(() => {
    dashboard()
    // eslint-disable-next-line vtex/prefer-early-return
    if (dataDashboard) {
      console.info('dataDashboard:::::--- ', dataDashboard)
      const dataTableDashboard: any = []

      setPage(dataDashboard.searchSellersDashboard.pagination.currentPage)
      setSellersDashboard(dataTableDashboard)
      dataDashboard.searchSellersDashboard.sellers.forEach((item: any) => {
        dataTableDashboard.push({
          id: item.id,
          name: item.name,
          dateInvoiced: item.statistics.dateInvoiced,
          ordersCount: item.statistics.ordersCount.toFixed(2),
          totalComission: item.statistics.totalComission.toFixed(2),
          totalOrderValue: item.statistics.totalOrderValue.toFixed(2),
        })
      })
    }
  }, [dashboard, dataDashboard])

  useEffect(() => {
    stats()

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
  }, [dataDashboard, dataStats, stats])

  const formatDate = (valueDate: number) => {
    const validateDate = valueDate <= 9 ? `0${valueDate}` : valueDate

    return validateDate
  }

  useEffect(() => {
    const defaultDate = new Date()
    const defaultStart = new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth(),
      1
    )

    const defaultStartString =
      `${defaultStart.getFullYear()}-${formatDate(
        defaultStart.getMonth() + 1
      )}-` + `01`

    const valueDate = defaultDate.getDate() - 1
    const valueMonth = defaultDate.getMonth() + 1
    const defaultFinal = `${defaultDate.getFullYear()}-${formatDate(
      valueMonth
    )}-${formatDate(valueDate)}`

    setStartDate(defaultStartString)
    setFinalDate(defaultFinal)
    setDefaultStartDate(defaultStartString)
    setDefaultFinalDate(defaultFinal)

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
      setTotalItems(dataSellers.getSellers.items.length)
    }
  }, [dataSellers])

  const onNextClick = () => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const nextPage = page + 1

    const currentTo = pageSize * nextPage
    const currentFrom = itemTo + 1

    setItemTo(currentTo)
    setItemFrom(currentFrom)
    setPage(nextPage)
  }

  const changeRows = (row: number) => {
    setPageSize(row)
    setItemTo(row)
    setItemFrom(1)
    setPage(1)
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
        <PageHeader title={<FormattedMessage id="admin/navigation.title" />} />
      }
    >
      <div>
        <SettingsDashboard />
      </div>
      {startDate && finalDate && (
        <div className="mt2">
          <PageBlock>
            <div className="mt4 mb5">
              <Filter
                dataWithoutFilter={sellersDashboard}
                setDataWithoutFilter={setSellersDashboardFilter}
                startDatePicker={new Date(`${startDate}T00:00:00`)}
                finalDatePicker={new Date(`${finalDate}T00:00:00`)}
                locale={culture.locale}
                optionsSelect={optionsSelect}
                setStartDate={setStartDate}
                setFinalDate={setFinalDate}
                defaultStartDate={defaultStartDate}
                defaultFinalDate={defaultFinalDate}
                setTotalItems={setTotalItemsFilter}
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
              items={
                sellersDashboardFilter.length > 0
                  ? sellersDashboardFilter
                  : sellersDashboard
              }
              loading={loadingDataDashboard}
            />
            <PaginationComponent
              setPageSize={setPageSize}
              currentPage={itemFrom}
              pageSize={itemTo}
              setPage={setPage}
              totalItems={totalItemsFilter > 0 ? totalItemsFilter : totalItems}
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

export default CommissionReport
