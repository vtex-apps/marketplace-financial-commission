import type { FC } from 'react'
import React from 'react'
import { Layout, PageBlock, IconShoppingCart } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import type { InjectedIntlProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'

import { message } from './utils/definedMessages'
// import TableComponent from './components/Dashboard/Table'
import TableComponent from './components/Dashboard/Table/Tablev2'
import Totalizer from './components/Dashboard/Totalizer'
import Filter from './components/Dashboard/Filter'
import SettingsDashboard from './components/Dashboard/SettingsDashboard'

const CommissionReport: FC<InjectedIntlProps> = ({ intl }) => {
  const { culture } = useRuntime()

  return (
    <Layout fullWidth>
      <div className="mt9">
        <h1 style={{ color: '#3F3F40', fontSize: '35px' }}>
          {formatIOMessage({
            id: message.dashboardTitle.id,
            intl,
          }).toString()}
        </h1>
      </div>
      <div>
        <SettingsDashboard />
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb7">
            <Filter
              listSellers={[]}
              sellersDashboard={[]}
              startDatePicker={new Date()}
              finalDate={new Date()}
              locale={culture.locale}
              optionsSelect={[]}
            />
          </div>
        </PageBlock>
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb7">
            <Totalizer
              item={[
                {
                  label: 'test',
                  value: 0,
                  iconBackgroundColor: '#EAFCE3',
                  icon: <IconShoppingCart color="#79B03A" size={18} />,
                },
              ]}
            />
          </div>
        </PageBlock>
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb7">
            {/* <TableComponent schemaTable={tempColumns} itemTable={[]} actions={[]}/> */}
            <TableComponent />
          </div>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default injectIntl(CommissionReport)
