import type { FC } from 'react'
import React, { useState } from 'react'
import {
  Layout,
  PageBlock,
  IconShoppingCart
} from 'vtex.styleguide'

import { useRuntime } from 'vtex.render-runtime'
import type { InjectedIntlProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { message } from './utils/definedMessages'
import TableComponent from './components/Dashboard/Table'
import Totalizer from './components/Dashboard/Totalizer'
import Filter from './components/Dashboard/Filter'
import SettingsDashboard from './components/Dashboard/SettingsDashboard'

const CommissionReport: FC<InjectedIntlProps> = ({ intl }) => {
  const { culture } = useRuntime()
  const [openModal, setOpenModal] = useState(false)

  //Example schema
  const tempColumns = {
    properties: {
      id: {
        title: 'id',
        width: 50,
        // eslint-disable-next-line react/display-name
        cellRenderer: () => {
          return (
            <div>
            </div>
          )
        },
      },
    },
  }

  return (
    <Layout fullWidth>
      <div className="mt9">
        <h1 style={{ color: '#3F3F40', fontSize: '35px' }}>
          {formatIOMessage({
            id: message.title.id,
            intl,
          }).toString()}
        </h1>
      </div>
      <div>
        <SettingsDashboard openModal={openModal} setOpenModal={setOpenModal}/>
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb7">
            <Filter listSellers={[]} sellersDashboard={[]} startDatePicker={new Date()} finalDate={new Date()} locale={culture.locale} optionsSelect={[]}/>
          </div>
        </PageBlock>
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb7">
            <Totalizer item={[{label: 'test', value: 0, iconBackgroundColor: '#EAFCE3', icon: <IconShoppingCart color="#79B03A" size={18} />}]} />
          </div>
        </PageBlock>
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb7">
            <TableComponent schemaTable={tempColumns} itemTable={[]} actions={[]}/>
          </div>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default injectIntl(CommissionReport)
