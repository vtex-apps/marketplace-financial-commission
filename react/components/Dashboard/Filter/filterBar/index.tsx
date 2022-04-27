import type { FC } from 'react'
import React from 'react'
import { FilterBar } from 'vtex.styleguide'

const FilterBarComponent: FC = () => {
  const getSimpleVerbs = () => {
    return [
      {
        label: 'is',
        value: '=',
        object: () => {},
      },
      {
        label: 'is not',
        value: '!=',
        object: () => {},
      },
      {
        label: 'contains',
        value: 'contains',
        object: () => {},
      },
    ]
  }

  return (
    <div>
      <FilterBar
        alwaysVisibleFilters={['totalOrders']}
        statements={[]}
        onChangeStatements={() => {}}
        clearAllFiltersButtonLabel="Clear Filters"
        options={{
          totalOrders: {
            label: 'Total Orders',
            renderFilterLabel: () => 'All',
            verbs: getSimpleVerbs(),
          },
        }}
      />
    </div>
  )
}

export default FilterBarComponent
