import type { FC } from 'react'
import React from 'react'
import { PageBlock, EmptyState } from 'vtex.styleguide'

const EmptyTable: FC = () => {
  return (
    <div className="mt5">
      <PageBlock>
        <EmptyState title="There aren't data to show">
          <p>Use the filters to search data and show information</p>
        </EmptyState>
      </PageBlock>
    </div>
  )
}

export default EmptyTable
