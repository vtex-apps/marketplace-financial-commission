/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-key */
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { PageBlock, Tag } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { useLazyQuery } from 'react-apollo'
import type { DocumentNode } from 'graphql'

import { SELLER_INVOICES } from '../../../graphql'
import TableComponent from '../Table/Tablev2'
import PaginationComponent from '../Table/Tablev2/pagination'
import { status } from '../../../typings/constants'

interface DetailProps {
  account?: string
  ordersQuery?: DocumentNode
  sellerName?: string
  startDate?: string
  finalDate?: string
}

const SellerInvoices: FC<DetailProps> = ({
  sellerName,
  ordersQuery,
  startDate,
  finalDate,
}) => {
  const { query } = useRuntime()
  const [dataTableInvoice, setDataTableInvoice] = useState<any>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [itemFrom, setItemFrom] = useState(1)
  const [itemTo, setItemTo] = useState(20)
  const [totalItems, setTotalItems] = useState(0)

  const [getDataInvoices, { data: dataInvoices }] = useLazyQuery(
    ordersQuery ?? SELLER_INVOICES,
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

  useEffect(() => {
    if (sellerName === '' && !query.sellerName) {
      setDataTableInvoice([])
      setTotalItems(0)
    }
  }, [query, sellerName])

  useEffect(() => {
    getDataInvoices()
    if (dataInvoices) {
      setDataTableInvoice(dataInvoices.invoicesBySeller.data)
      setTotalItems(dataInvoices.invoicesBySeller.pagination.total)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInvoices, sellerName])

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
      cellRenderer: (props: any) => {
        // eslint-disable-next-line array-callback-return
        const getColor = Object.keys(status).find(
          (itemStatus) => itemStatus === props.data
        )

        const bgColor = getColor ? status[getColor].bgColor : ''
        const fontcolor = getColor ? status[getColor].fontColor : ''

        return (
          <Tag bgColor={bgColor} color={fontcolor}>
            {props.data}
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

  return (
    <PageBlock>
      <div>
        <TableComponent
          schemaTable={schemaTableInvoice}
          items={dataTableInvoice}
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
  )
}

export default SellerInvoices
