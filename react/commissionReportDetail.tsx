import type { FC } from 'react'
import React, { useState } from 'react'
import { Layout, Tab, Tabs, PageBlock, PageHeader } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'

import Filter from './components/Dashboard/Filter'
import SettingsDashboard from './components/Dashboard/SettingsDashboard'

const CommissionReportDetail: FC = () => {
  const { culture } = useRuntime()
  const [openModal, setOpenModal] = useState(false)

  const startDate = new Date()

  startDate.setDate(1)
  startDate.setMonth(startDate.getMonth() - 1)

  const finalDate = new Date()

  finalDate.setDate(finalDate.getDate() - 1)

  const [tabs, setTabs] = useState(1)

  return (
    <Layout
      fullWidth
      pageHeader={
        <PageHeader title={<FormattedMessage id="admin/navigation.title" />} />
      }
    >
      <div className="flex">
        <div className="w-25">
          <p className="ml3">
            <FormattedMessage id="admin/title-billing-cycle" />
            25/03/2022
          </p>
        </div>
        <div className="w-25">
          <p className="ml3">
            <FormattedMessage id="admin/title-netx-billing" />2 weeks
          </p>
        </div>
        <div className="w-25">
          <p className="ml3">
            <FormattedMessage id="admin/title-current-commission" />
            10%
          </p>
        </div>
        <div className="w-25" style={{ textAlign: 'end' }}>
          <SettingsDashboard
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
      </div>
      <div>
        <PageBlock>
          <div className="mt4 mb7">
            <Filter
              dataWithoutFilter={[]}
              setDataWithoutFilter={[]}
              startDatePicker={new Date(startDate)}
              finalDatePicker={new Date(finalDate)}
              locale={culture.locale}
            />
          </div>
        </PageBlock>
      </div>
      <div className="mt7">
        <Tabs fullWidth>
          <Tab
            label={<FormattedMessage id="admin/table.title-tab-commission" />}
            active={tabs === 1}
            onClick={() => setTabs(1)}
          >
            <div className="mt5">
              <PageBlock>
                <div className="mt2">
                  {/* <TableComponent schemaTable={tempColumns} itemTable={[]} actions={[]}/> */}
                </div>
              </PageBlock>
            </div>
          </Tab>
          <Tab
            label={<FormattedMessage id="admin/table.title-tab-invoices" />}
            active={tabs === 2}
            onClick={() => setTabs(2)}
          >
            <div className="mt5">
              <PageBlock>
                {/* <TableComponent schemaTable={tempColumns} itemTable={[]} actions={[]}/> */}
              </PageBlock>
            </div>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

export default CommissionReportDetail
