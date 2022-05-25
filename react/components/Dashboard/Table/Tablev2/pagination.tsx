import type { FC } from 'react'
import React from 'react'
import { Pagination } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

const PaginationComponent: FC<PaginationProps> = (props) => {
  return (
    <div>
      {props.totalItems > 0 ? (
        <Pagination
          rowsOptions={[20, 30, 40, 50]}
          currentItemFrom={props.currentPage}
          currentItemTo={props.pageSize}
          textOf={<FormattedMessage id="admin/table.pagination-textOf" />}
          textShowRows={<FormattedMessage id="admin/table.pagination-show" />}
          totalItems={props.totalItems}
          onRowsChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.changeRows(parseInt(e.target.value, 10))
          }
          onNextClick={() => props.onNextClick()}
          onPrevClick={() => props.onPrevClick()}
        />
      ) : (
        <div />
      )}
    </div>
  )
}

export default PaginationComponent
