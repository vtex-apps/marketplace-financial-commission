import type { FC } from 'react'
import React, { useMemo, useState, useEffect } from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useTableMeasures,
  EXPERIMENTAL_useTableSort as useTableSort,
  Spinner,
  // EXPERIMENTAL_useCheckboxTree as useColumnsWithCheckboxes
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

  console.info('ITEMSSSSSSSSSSSSSS ', items)

  const pagination = {
    currentItemFrom: props.currentPage,
    currentItemTo: props.pageSize,
    textOf: 'of',
    rowsOptions: [5, 10, 15, 20],
    textShowRows: 'Show rows',
    totalItems: props.totalItems,
    onRowsChange: (e: any) => {
      props.setPageSize(parseInt(e.target.value))
    },
    onNextClick: () => {
      const nextPage = props.currentPage + 1
      props.setPage(nextPage)
    },
    onPrevClick: () => {
      const previousPage = props.currentPage - 1
      props.setPage(previousPage)
    },
  }

  const ColumnsExample = () => {
    return (
      <Table
        measures={measures}
        items={items}
        columns={props.schemaTable}
        highlightOnHover
        sorting={sorting}
      >
        <Table.Pagination {...pagination} />
      </Table>
    )
  }

  if (props.loading) {
    return (
      <div className="tc">
        <Spinner />
      </div>
    )
  }

  return <ColumnsExample />
}

export default TableV2
