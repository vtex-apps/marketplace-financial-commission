import type { FC } from 'react'
import React, { useMemo } from 'react'

import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useTableMeasures,
  EXPERIMENTAL_useTableSort as useTableSort
} from 'vtex.styleguide'


const TableV2: FC = () => {
  const sorting = useTableSort()
  const columns = [
    {
      /** Prop that this column represents */
      id: 'id',
      /** Title that will appear on Header */
      title: 'ID',
      /** Fixed width */
      width: '3rem',
    },
    {
      id: 'name',
      title: 'Name',
      sortable: true,
    },
    {
      id: 'qty',
      title: 'Qty',
    },
    {
      id: 'costPrice',
      title: 'Cost',
      /** Cellrenderer using the default data, which is costPrice in this case */
    },
    {
      id: 'retailPrice',
      title: 'Retail',
    },
    {
      id: 'profit',
      /** This is a custom title */
      title: 'Profit',
      /** Profit is a condensed column generated using retailPrice and costPrice props */
    },
    {
      id: 'actions',
      width: '3rem',
      /** This column is extended, its data is the entire row */
    },
  ]

  const arrayItems = [{
    id: 'id',
    name: 'test',
    qty: 'qty',
    costPrice: 'costPrice',
    retailPrice: 'retailPrice',
    profit: 'profit',
    actions: 'actions'
  },
  {
    id: 'id2',
    name: 'name',
    qty: 'qty',
    costPrice: 'costPrice',
    retailPrice: 'retailPrice',
    profit: 'profit',
    actions: 'actions'
  }
  ]

  /*eslint-disable */
  const ascOrdering = (prop:any): (a: any, b: any) => 1 | -1 | 0 => (a, b) => a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
  const dscOrdering = (prop:any): (a: any, b: any) => 1 | -1 | 0 => (a, b) => a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0

  const items = useMemo(() => {
    const {
      sorted: { order, by },
    } = sorting
    if (!order) {
      return arrayItems
    }

    const ascending = order === 'ASC'
    const comparator = ascending ? ascOrdering(by) : dscOrdering(by)
    return arrayItems.sort(comparator)
  }
    , [sorting.sorted, arrayItems])

  const measures = useTableMeasures({ size: items.length })

  const ColumnsExample = () => {
    return (
      <Table
        measures={measures}
        items={items}
        columns={columns}
        highlightOnHover
        sorting={sorting}
      />
    )
  }

  return (
    <ColumnsExample />
  )
}

export default TableV2
