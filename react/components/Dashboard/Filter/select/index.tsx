import type { FC } from 'react'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { EXPERIMENTAL_Select as Select } from 'vtex.styleguide'

const SelectComponent: FC<SelectProps> = (props) => {
  console.info('props select ', props)

  return (
    <div>
      <Select
        value={props.dataFilter}
        multi
        label={<FormattedMessage id="admin/table.title-seller-label" />}
        options={props.options}
        onChange={(values: DataFilter[]) => props.setDataFilter(values)}
        valuesMaxHeight={35}
      />
    </div>
  )
}

export default SelectComponent
