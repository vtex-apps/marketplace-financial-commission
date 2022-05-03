import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import {
  Layout,
  Tab,
  Tabs,
  PageBlock,
  PageHeader,
  Tag,
  IconVisibilityOff,
  ButtonWithIcon,
  EmptyState,
} from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import { useLazyQuery, useQuery } from 'react-apollo'

import SettingsSeller from './components/SellerSettings'
import { SEARCH_ORDERS, GET_SELLERS } from './graphql'
import { TableComponent, Filter } from './components'
import PaginationComponent from './components/Dashboard/Table/Tablev2/pagination'
import { status } from './typings/constants'

const CommissionReportDetail: FC = () => {
  const { route, query } = useRuntime()
  const [startDate, setStartDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [defaultStartDate, setDefaultStartDate] = useState('')
  const [defaultFinalDate, setDefaultFinalDate] = useState('')
  const [totalItemsFilter, setTotalItemsFilter] = useState(0)
  const [page, setPage] = useState(1)
  const [sellersId, setSellersId] = useState('')
  const [pageSize, setPageSize] = useState(20)
  const [itemFrom, setItemFrom] = useState(1)
  const [itemTo, setItemTo] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [optionsSelect, setOptionsSelect] = useState<DataFilter[]>([])
  const [sellerName, setSellerName] = useState('')
  const [tabs, setTabs] = useState(1)
  const [dataTableOrders, setDataTableOrders] = useState<any>([])

  const schemaTable = [
    {
      id: 'id',
      title: 'Order ID',
      cellRenderer: (props: CellRendererProps) => {
        return <span>{props.data}</span>
      },
    },
    {
      id: 'creationDate',
      title: 'Creation Date',
    },
    {
      id: 'totalOrder',
      title: 'Total Order',
      cellRenderer: (props: CellRendererProps) => {
        return <span>${props.data}</span>
      },
    },
    {
      id: 'totalCommission',
      title: 'Total Commission',
      cellRenderer: (props: CellRendererProps) => {
        return <span>${props.data}</span>
      },
    },
    {
      id: 'rate',
      title: 'Rate',
      cellRenderer: () => {
        return (
          <span>
            <ButtonWithIcon icon={<IconVisibilityOff />} variation="tertiary" />
          </span>
        )
      },
    },
    {
      id: 'status',
      title: 'Status',
      cellRenderer: (props: any) => {
        console.info('props ', props.data)

        return (
          <Tag bgColor={props.data.bgColor} color={props.data.fontColor}>
            {props.data.status}
          </Tag>
        )
      },
    },
  ]

  const { data: dataSellers } = useQuery(GET_SELLERS, {
    ssr: false,
    pollInterval: 0,
<<<<<<< HEAD
    variables: {
      listSellersParams: {
        sellersId: '',
        page: 1,
        pageSize: 100,
      },
    },
  })

=======
  })

  console.info('sellerName ', !sellerName)

>>>>>>> eb56222c1993b3f5b42e090abf866db35d436564
  const [getDataOrders, { data: dataOrders, loading: loadingDataOrders }] =
    useLazyQuery(SEARCH_ORDERS, {
      ssr: false,
      pollInterval: 0,
      variables: {
        searchOrdersParams: {
          dateStart: '2022-04-01',
          dateEnd: '2022-04-25',
          sellerName: !sellerName ? query.sellerName : sellerName,
          page: 1,
          perpage: 20,
        },
      },
    })

  const formatDate = (valueDate: number) => {
    const validateDate = valueDate <= 9 ? `0${valueDate}` : valueDate

    return validateDate
  }

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (sellersId) {
      const nameSellerFilter = optionsSelect.find(
        (seller: any) => seller.value.id === sellersId
      )

      const nameFilterOrders = nameSellerFilter?.value.name ?? ''

      setSellerName(nameFilterOrders)
      console.info('nameSellerFilter?.value.name ', nameFilterOrders)
    }
  }, [optionsSelect, sellersId])

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (dataSellers) {
      console.info('dataSellers:::::::::::----- ', dataSellers)
      const builtSelectSeller: DataFilter[] = []

      dataSellers.getSellers.sellers.forEach((seller: DataSellerSelect) => {
        builtSelectSeller.push({
          value: { id: seller.id, name: seller.name },
          label: seller.name,
        })
      })
      setOptionsSelect(builtSelectSeller)
    }
  }, [dataSellers])

  useEffect(() => {
    getDataOrders()
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
    if (dataOrders) {
      const dataTable: any = []

      dataOrders.orders.data.forEach((item: any) => {
        // eslint-disable-next-line array-callback-return
        const keyColor = Object.keys(status).find(
          (itemStatus: any) => itemStatus === item.status
        )

        dataTable.push({
          id: item.orderId,
          creationDate: item.creationDate.substring(
            0,
            item.creationDate.indexOf('T')
          ),
          totalOrder: item.totalOrderValue,
          totalCommission: item.totalComission,
          rate: '',
          status: {
            status: item.status,
            bgColor: keyColor ? status[keyColor].bgColor : '',
            fontColor: keyColor ? status[keyColor].fontColor : '',
          },
        })
      })
      setDataTableOrders(dataTable)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataOrders])

  return (
    <Layout
      pageHeader={
        <PageHeader title={<FormattedMessage id="admin/navigation.title" />} />
      }
    >
      <div className="flex">
        <div className="w-25">
          <p className="ml3">
            <FormattedMessage id="admin/title-billing-cycle" />
            25/03/2022
          </p>
        </div>
        <div className="w-25">
          <p className="ml3">
            <FormattedMessage id="admin/title-netx-billing" />2 weeks
          </p>
        </div>
        <div className="w-25">
          <p className="ml3">
            <FormattedMessage id="admin/title-current-commission" />
            10%
          </p>
        </div>
        <div className="w-25" style={{ textAlign: 'end' }}>
          <SettingsSeller seller={route} isDisabled={false} />
        </div>
      </div>
      <div className="mt4 mb7">
        {startDate && finalDate && (
          <div className="mt2">
            <PageBlock>
              <div className="mt4 mb5">
                <Filter
                  startDatePicker={new Date(`${startDate}T00:00:00`)}
                  finalDatePicker={new Date(`${finalDate}T00:00:00`)}
                  optionsSelect={optionsSelect}
                  setStartDate={setStartDate}
                  setFinalDate={setFinalDate}
                  defaultStartDate={defaultStartDate}
                  defaultFinalDate={defaultFinalDate}
                  setTotalItems={setTotalItemsFilter}
                  setSellerId={setSellersId}
                />
              </div>
            </PageBlock>
          </div>
        )}
      </div>
      <div className="mt7">
        <Tabs fullWidth>
          <Tab
            label={<FormattedMessage id="admin/table.title-tab-commission" />}
            active={tabs === 1}
            onClick={() => setTabs(1)}
          >
            {dataTableOrders.length > 0 ? (
              <div className="mt5">
                <PageBlock>
                  <div className="mt2">
                    <TableComponent
                      schemaTable={schemaTable}
                      items={dataTableOrders}
                      loading={loadingDataOrders}
                    />
                    <PaginationComponent
                      setPageSize={setPageSize}
                      currentPage={itemFrom}
                      pageSize={itemTo}
                      setPage={setPage}
                      totalItems={
                        totalItemsFilter > 0 ? totalItemsFilter : totalItems
                      }
                      onNextClick={() => {}}
                      changeRows={() => {}}
                      onPrevClick={() => {}}
                    />
                  </div>
                </PageBlock>
              </div>
            ) : (
              <div className="mt5">
                <PageBlock>
                  <EmptyState title="There aren't data to show">
                    <p>Use the filters to search data and show information</p>
                  </EmptyState>
                </PageBlock>
              </div>
            )}
          </Tab>
          <Tab
            label={<FormattedMessage id="admin/table.title-tab-invoices" />}
            active={tabs === 2}
            onClick={() => setTabs(2)}
          >
            <div className="mt5">
              <PageBlock>
                {/* <TableComponent schemaTable={tempColumns} itemTable={[]} actions={[]}/> */}
              </PageBlock>
            </div>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

export default CommissionReportDetail
