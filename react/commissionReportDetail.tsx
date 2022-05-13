/* eslint-disable react/jsx-key */
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
  Divider,
  Modal,
  // IconCalendar,
  // IconArrowUp,
  // IconClock,
} from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import { useLazyQuery, useQuery } from 'react-apollo'
import type { DocumentNode } from 'graphql'

import { SEARCH_ORDERS, GET_SELLERS, SELLER_INVOICES } from './graphql'
import { TableComponent, Filter, EmptyTable } from './components'
import PaginationComponent from './components/Dashboard/Table/Tablev2/pagination'
import { status } from './typings/constants'
import { config } from './utils/config'

interface DetailProps {
  account?: string
  ordersQuery?: DocumentNode
}

const CommissionReportDetail: FC<DetailProps> = ({ account, ordersQuery }) => {
  const { query } = useRuntime()
  const [startDate, setStartDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [defaultStartDate, setDefaultStartDate] = useState('')
  const [defaultFinalDate, setDefaultFinalDate] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [itemFrom, setItemFrom] = useState(1)
  const [itemTo, setItemTo] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [optionsSelect, setOptionsSelect] = useState<DataFilter[]>([])
  const [sellerName, setSellerName] = useState(account ?? '')
  const [tabs, setTabs] = useState(1)
  const [dataTableOrders, setDataTableOrders] = useState<any>([])
  const [dataTableInvoice, setDataTableInvoice] = useState<any>([])
  const [openModal, setOpenModal] = useState(false)
  const [dateRate, setDataRate] = useState<any>([])
  const [optionsStatus, setOptionsStatus] = useState<any>([])
  const [statusOrders, setStatusOrders] = useState('')

  const schemaTableInvoice = [
    {
      id: 'id',
      title: 'ID invoice',
      cellRenderer: (props: CellRendererProps) => {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            href="#"
            style={{ color: '#0C389F' }}
            target="_blank"
            rel="noreferrer"
          >
            {props.data}
          </a>
        )
      },
    },
    {
      id: 'invoiceCreatedDate',
      title: 'Invoice Created Date',
    },
    {
      id: 'status',
      title: 'Status',
    },
  ]

  const schemaTable = [
    {
      id: 'id',
      title: 'Order ID',
      cellRenderer: (props: CellRendererProps) => {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            href={config.getUrl(`admin/checkout/#/orders/${props.data}`)}
            style={{ color: '#0C389F' }}
            target="_blank"
            rel="noreferrer"
          >
            {props.data}
          </a>
        )
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
      cellRenderer: (props: any) => {
        return (
          <div>
            <ButtonWithIcon
              icon={<IconVisibilityOff />}
              variation="tertiary"
              onClick={() => {
                setOpenModal(!openModal)
                setDataRate(props.data)
              }}
            />
          </div>
        )
      },
    },
    {
      id: 'status',
      title: 'Status',
      cellRenderer: (props: any) => {
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
    skip: Boolean(account),
  })

  const [getDataOrders, { data: dataOrders, loading: loadingDataOrders }] =
    useLazyQuery(ordersQuery ?? SEARCH_ORDERS, {
      ssr: false,
      pollInterval: 0,
      variables: {
        searchOrdersParams: {
          dateStart: startDate,
          dateEnd: finalDate,
          sellerName,
          page,
          perpage: pageSize,
          status: statusOrders,
        },
      },
    })

  const [getDataInvoices, { data: dataInvoices }] = useLazyQuery(
    SELLER_INVOICES,
    {
      ssr: false,
      pollInterval: 0,
      variables: {
        sellerInvoiceParams: {
          sellerName,
          dates: {
            startDate,
            endDate: finalDate,
          },
          pagination: {
            page,
            pageSize,
          },
        },
      },
    }
  )

  const formatDate = (valueDate: number) => {
    const validateDate = valueDate <= 9 ? `0${valueDate}` : valueDate

    return validateDate
  }

  useEffect(() => {
    if (sellerName === '' && !query.sellerName) {
      setDataTableOrders([])
      setDataTableInvoice([])
    }
  }, [query, sellerName])

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (!optionsStatus.length) {
      const buildSelectStatus: any[] = []

      Object.keys(status).forEach((orderStatus) => {
        buildSelectStatus.push({
          value: { id: orderStatus, name: orderStatus },
          label: orderStatus,
        })
      })
      setOptionsStatus(buildSelectStatus)
    }
  }, [optionsStatus])

  useEffect(() => {
    getDataInvoices()
    if (dataInvoices) {
      setDataTableInvoice(dataInvoices.invoicesBySeller)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInvoices, sellerName])

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (dataSellers) {
      const builtSelectSeller: DataFilter[] = []

      dataSellers.getSellers.sellers.forEach((seller: DataSellerSelect) => {
        builtSelectSeller.push({
          value: { id: seller.id, name: seller.name },
          label: seller.name,
        })
      })
      setOptionsSelect(builtSelectSeller)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSellers])

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
  }, [])

  useEffect(() => {
    getDataOrders()
    // eslint-disable-next-line vtex/prefer-early-return
    if (dataOrders) {
      console.info('datosss obtenidos ', dataOrders)
      const dataTable: any = []

      dataOrders.orders.data.forEach((item: any) => {
        // eslint-disable-next-line array-callback-return
        const keyColor = Object.keys(status).find(
          (itemStatus: any) => itemStatus === item.status
        )

        dataTable.push({
          id: account ? item.sellerOrderId : item.orderId,
          creationDate: item.creationDate.substring(
            0,
            item.creationDate.indexOf('T')
          ),
          totalOrder: item.totalOrderValue,
          totalCommission: item.totalComission,
          rate: item.rate,
          status: {
            status: item.status,
            bgColor: keyColor ? status[keyColor].bgColor : '',
            fontColor: keyColor ? status[keyColor].fontColor : '',
          },
        })
      })
      setDataTableOrders(dataTable)
      setTotalItems(dataOrders.orders.paging.total)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataOrders, sellerName])

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
        <PageHeader
          title={<FormattedMessage id="admin/navigation.detail-title" />}
        />
      }
    >
      <Modal
        centered
        isOpen={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <div className="mb3">
          {dateRate.map((elmRate: any) => (
            <div>
              <h2>Item ID: #{elmRate.itemId}</h2>
              <p>
                <b>Name Item: </b> {elmRate.nameItem}
              </p>
              <p>
                <b>Freight Commission Percentage: </b>
                {elmRate.rate.freightCommissionPercentage}%
              </p>
              <p>
                <b>Producto Commission Percentage: </b>
                {elmRate.rate.productCommissionPercentage}%
              </p>
              <Divider />
            </div>
          ))}
        </div>
      </Modal>
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
                  setSellerId={setSellerName}
                  multiValue={false}
                  optionsStatus={optionsStatus}
                  setStatusOrders={setStatusOrders}
                  disableSelect={Boolean(account)}
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
                      totalItems={totalItems}
                      onNextClick={onNextClick}
                      changeRows={changeRows}
                      onPrevClick={onPrevClick}
                    />
                  </div>
                </PageBlock>
              </div>
            ) : (
              <EmptyTable />
            )}
          </Tab>
          <Tab
            label={<FormattedMessage id="admin/table.title-tab-invoices" />}
            active={tabs === 2}
            onClick={() => setTabs(2)}
          >
            <div className="mt5">
              <PageBlock>
                {schemaTableInvoice.length > 0 ? (
                  <div>
                    <TableComponent
                      schemaTable={schemaTableInvoice}
                      items={dataTableInvoice}
                      loading={false}
                    />
                  </div>
                ) : (
                  <EmptyTable />
                )}
              </PageBlock>
            </div>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

export default CommissionReportDetail
