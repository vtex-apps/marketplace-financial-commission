import type { FC } from 'react'
import React from 'react'
import type { InjectedIntlProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import {
  Table
} from 'vtex.styleguide'
import { message } from '../../../utils/definedMessages'

const TableComponent: FC<TableProps & InjectedIntlProps> = (props) => {
  console.log('props.schemaTable ', props.schemaTable.properties)
  return (
    <Table
      schema={props.schemaTable}
      items={props.itemTable}
      lineActions={props.actions}
      totalizers={props.totalizers ? props.totalizers.item : []}
      pagination={{
        onNextClick: () => {},
        onPrevClick: () => {},
        currentItemFrom: 1,
        currentItemTo: 5,
        onRowsChange: () => {},
        textShowRows: `${formatIOMessage({id: message.show.id, intl: props.intl,}).toString()}`,
        textOf: `${formatIOMessage({id: message.connector.id, intl: props.intl,}).toString()}`,
        totalItems: props.itemTable.length,
        rowsOptions: [5, 10, 15, 25],
      }}
    />
  )
}

export default injectIntl(TableComponent)
