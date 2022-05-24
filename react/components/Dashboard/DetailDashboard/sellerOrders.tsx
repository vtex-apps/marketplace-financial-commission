import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import {
  PageBlock,
  Tag,
  IconVisibilityOff,
  ButtonWithIcon,
} from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import { useLazyQuery } from 'react-apollo'
import type { DocumentNode } from 'graphql'

import { SEARCH_ORDERS } from '../../../graphql'
import TableComponent from '../Table/Tablev2'
import ModalConfirm from '../ModalConfirm'
import PaginationComponent from '../Table/Tablev2/pagination'
import { status } from '../../../typings/constants'
import { config } from '../../../utils/config'

interface DetailProps {
  account?: string
  ordersQuery?: DocumentNode
  sellerName?: string
  startDate?: string
  finalDate?: string
  statusOrders?: string
  setDataRate: (data: any) => void
}

const SellerOrders: FC<DetailProps> = ({
  account,
  sellerName,
  ordersQuery,
  startDate,
  finalDate,
  statusOrders,
  setDataRate,
}) => {
  const { query } = useRuntime()
  const [dataTableOrders, setDataTableOrders] = useState<any>([])
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [itemFrom, setItemFrom] = useState(1)
  const [itemTo, setItemTo] = useState(20)
  const [totalItems, setTotalItems] = useState(0)

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

  useEffect(() => {
    if (sellerName === '' && !query.sellerName) {
      setDataTableOrders([])
    }
  }, [query, sellerName])

  useEffect(() => {
    getDataOrders()
    // eslint-disable-next-line vtex/prefer-early-return
    if (dataOrders) {
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

  return (
    <PageBlock>
      {statusOrders === 'invoiced' ? (
        <ModalConfirm
          buttonMessage={
            <FormattedMessage id="admin/form-settings.button-invoice" />
          }
          messages={{
            warning: <FormattedMessage id="admin/modal-setting.warning" />,
            confirmation: (
              <FormattedMessage id="admin/modal-setting.confirmation" />
            ),
          }}
          sellerData={{
            startDate: startDate ?? '',
            finalDate: finalDate ?? '',
            sellerName: sellerName ?? '',
          }}
        />
      ) : null}
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
  )
}

export default SellerOrders
