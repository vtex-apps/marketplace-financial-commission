import type { FC } from 'react'
import React from 'react'
// import { useQuery } from 'react-apollo'
import {
  Spinner,
  Tag,
  ActionMenu,
  IconOptionsDots,
  EXPERIMENTAL_useTableMeasures as useTableMeasures,
  EXPERIMENTAL_Table as Table,
} from 'vtex.styleguide'
import { FormattedCurrency } from 'vtex.format-currency'

// import SELLER_INVOICES from '../../../graphql/getInvoicesBySeller.gql'
import { MOCK_INVOICES } from '../../../../node/mocks/invoices'

const columns = [
  {
    id: 'id',
    title: 'ID',
  },
  {
    id: 'invoiceCreateDate',
    title: 'Created Date',
  },
  {
    id: 'totalizers',
    title: 'Total',
    cellRenderer: ({ data }: any) => {
      return <FormattedCurrency value={data.total} />
    },
  },
  {
    id: 'invoiceDueDate',
    title: 'Due Date',
  },
  {
    id: 'status',
    title: 'Status',
    cellRenderer: ({ data }: any) => {
      switch (data) {
        case 'paid':
          return <Tag type="success">Paid</Tag>

          break

        case 'unpaid':
          return <Tag type="warning">Not paid</Tag>

          break

        default:
          return <Tag type="error">Error</Tag>
      }
    },
  },
  {
    id: 'actions',
    width: '3rem',
    cellRenderer: (props: any) => <Actions {...props} />,
    /** This column is extended, its data is the entire row */
    extended: true,
  },
]

function Actions() {
  return (
    <ActionMenu
      buttonProps={{
        variation: 'tertiary',
        icon: <IconOptionsDots />,
      }}
      options={[
        {
          label: `test`,
        },
        {
          label: 'detail',
          onClick: () => {
            // TODO: Show modal with invoice detail
          },
        },
      ]}
    />
  )
}

const InvoiceTable: FC = () => {
  // TODO: use real data
  // const { data, loading } = useQuery(SELLER_INVOICES)
  const data = MOCK_INVOICES
  const loading = false

  const measures = useTableMeasures({ size: data?.length ?? 0 })

  if (loading) {
    return <Spinner block />
  }

  return (
    <Table
      measures={measures}
      // items={data.invoices}
      items={data}
      columns={columns}
      highlightOnHover
    />
  )
}

export default InvoiceTable
