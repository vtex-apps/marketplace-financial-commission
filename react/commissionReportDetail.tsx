import type { FC } from 'react'
import React, { useState } from 'react'
import {
  Layout,
  Tab,
  Tabs,
  PageBlock
} from 'vtex.styleguide'

import { useRuntime } from 'vtex.render-runtime'
import type { InjectedIntlProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { message } from './utils/definedMessages'
import TableComponent from './components/Dashboard/Table'
import Filter from './components/Dashboard/Filter'
import SettingsDashboard from './components/Dashboard/SettingsDashboard'

const CommissionReportDetail: FC<InjectedIntlProps> = ({ intl }) => {
  const { culture } = useRuntime()
  const [openModal, setOpenModal] = useState(false)

  const startDate = new Date()

  startDate.setDate(1)
  startDate.setMonth(startDate.getMonth() - 1)

  const finalDate = new Date()

  finalDate.setDate(finalDate.getDate() - 1)

  const [tabs, setTabs] = useState(1)

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
      <div className="mt9 mb9">
        <h1 style={{ color: '#3F3F40', fontSize: '35px' }}>
          {formatIOMessage({id: message.title.id, intl,}).toString()}
        </h1>
      </div>
      <div className='flex'>
        <div className='w-25'>
          <p className='ml3'>{formatIOMessage({id: message.billing.id, intl,}).toString()} 25/03/2022</p>
        </div>
        <div className='w-25'>
          <p className='ml3'>{formatIOMessage({id: message.nextBilling.id, intl,}).toString()} 2 weeks</p>
        </div>
        <div className='w-25'>
          <p className='ml3'>{formatIOMessage({id: message.currentCommission.id, intl,}).toString()} 10%</p>
        </div>
        <div className='w-25' style={{textAlign: 'end'}}>
          <SettingsDashboard openModal={openModal} setOpenModal={setOpenModal}/>
        </div>
      </div>
      <div>
        <PageBlock>
          <div className="mt4 mb7">
            <Filter listSellers={[]} sellersDashboard={[]} startDatePicker={startDate} finalDate={finalDate} locale={culture.locale} optionsSelect={[]}/>
          </div>
        </PageBlock>
      </div>
      <div className="mt7">
        <Tabs fullWidth>
          <Tab
            label={formatIOMessage({id: message.commissionTab.id, intl,}).toString()}
            active={tabs === 1}
            onClick={() => setTabs(1)}
          >
            <div className="mt5">
              <PageBlock>
                <div className="mt2">
                  <TableComponent schemaTable={tempColumns} itemTable={[]} actions={[]}/>
                </div>
              </PageBlock>
            </div>
          </Tab>
          <Tab
            label={formatIOMessage({id: message.invoicesTab.id, intl,}).toString()}
            active={tabs === 2}
            onClick={() => setTabs(2)}
          >
            <div className="mt5">
              <PageBlock>
                <TableComponent schemaTable={tempColumns} itemTable={[]} actions={[]}/>
              </PageBlock>
            </div>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

export default injectIntl(CommissionReportDetail)
