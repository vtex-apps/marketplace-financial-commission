import type { FC } from 'react'
import React, { useMemo } from 'react'

import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useTableMeasures,
  EXPERIMENTAL_useTableSort as useTableSort
} from 'vtex.styleguide'


const TableV2: FC<TableData> = (props) => {
  const sorting = useTableSort()

  const arrayItems:any = []/*[{
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
  ]*/

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
        columns={props.schemaTable}
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
