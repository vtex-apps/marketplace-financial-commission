import type { FC } from 'react'
import React, { useMemo } from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useTableMeasures,
  EXPERIMENTAL_useTableSort as useTableSort,
} from 'vtex.styleguide'

const TableV2: FC<TableData> = (props) => {
  const sorting = useTableSort()

  /*eslint-disable */
  const ascOrdering =
    (prop: any): ((a: any, b: any) => 1 | -1 | 0) =>
    (a, b) =>
      a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
  const dscOrdering =
    (prop: any): ((a: any, b: any) => 1 | -1 | 0) =>
    (a, b) =>
      a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0

  const items = useMemo(() => {
    const {
      sorted: { order, by },
    } = sorting
    if (!order) {
      return props.items
    }

    const ascending = order === 'ASC'
    const comparator = ascending ? ascOrdering(by) : dscOrdering(by)
    return props.items.sort(comparator)
  }, [sorting.sorted, props.items])

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

  return <ColumnsExample />
}

export default TableV2
