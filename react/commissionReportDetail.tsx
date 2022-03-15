import type { FC } from 'react'
import React, { useState } from 'react'
import {
  Layout,
  Tab,
  Tabs,
  Box,
  EXPERIMENTAL_Select as Select,
  DatePicker,
  Table,
  Tag,
  ButtonWithIcon,
  IconCog,
  IconShoppingCart,
  IconUser,
  IconArrowUp,
  IconExternalLink,
  IconFilter,
} from 'vtex.styleguide'

import styles from './styles.css'

const CommissionReportDetail: FC = () => {
  const [openModal, setOpenModal] = useState(true)

  const startDate = new Date()

  startDate.setDate(1)
  startDate.setMonth(startDate.getMonth() - 1)

  const finalDate = new Date()

  finalDate.setDate(finalDate.getDate() - 1)

  const [tabs, setTabs] = useState(1)

  const jsonschema = {
    properties: {
      id: {
        title: 'Orders',
        width: 150,
        // eslint-disable-next-line react/display-name
        cellRenderer: () => (
          <div className={styles.btn_external}>
            <ButtonWithIcon
              icon={<IconExternalLink color="#134CD8" size={15} />}
              variation="tertiary"
              onClick={() => setOpenModal(!openModal)}
            >
              11234234443
            </ButtonWithIcon>
          </div>
        ),
      },
      creation: {
        title: 'Order Creation Date',
        width: 160,
      },
      invoiced: {
        title: 'Invoiced date',
        width: 140,
      },
      total: {
        title: 'Total Order',
        width: 120,
      },
      commission: {
        title: 'Total Commission',
        width: 150,
      },
      rate: {
        title: 'Rate',
        width: 80,
      },
      status: {
        title: 'Status',
        width: 90,
        // eslint-disable-next-line react/display-name
        cellRenderer: () => (
          <Tag type="warning" color="#fff">
            <span className="nowrap">pending</span>
          </Tag>
        ),
      },
    },
  }

  const jsonschema2 = {
    properties: {
      id: {
        title: 'Invoice',
        width: 280,
        // eslint-disable-next-line react/display-name
        cellRenderer: () => (
          <div className={styles.btn_external}>
            <ButtonWithIcon
              icon={<IconExternalLink color="#134CD8" size={15} />}
              variation="tertiary"
              onClick={() => {}}
            >
              974747333
            </ButtonWithIcon>
          </div>
        ),
      },
      invoicedData: {
        title: 'Invoiced Date',
        width: 230,
      },
      dueDate: {
        title: 'Due Date',
        width: 220,
      },
      totalDue: {
        title: 'Total Due',
        width: 160,
      },
    },
  }

  return (
    <div style={{ margin: '0px' }}>
      <div
        className="flex w-100 pb2"
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          height: '60px',
        }}
      >
        <div style={{ marginRight: '40px' }}>
          <p style={{ color: '#999999', fontSize: '15px' }}>
            Billing Cycle: 25/03/2022
          </p>
        </div>
        <div style={{ marginRight: '40px' }}>
          <p style={{ color: '#999999', fontSize: '15px' }}>
            Next Billing: 2 weeks
          </p>
        </div>
        <div style={{ marginRight: '40px' }}>
          <p style={{ color: '#999999', fontSize: '15px' }}>
            Current Commission: 10%
          </p>
        </div>
      </div>
      <Layout>
        <div className="mt9">
          <h1 style={{ color: '#3F3F40', fontSize: '35px' }}>
            Commission Report Dashboard
          </h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <ButtonWithIcon
            icon={<IconCog color="#3F3F40" size={20} />}
            variation="tertiary"
            onClick={() => setOpenModal(!openModal)}
          />
        </div>
        <div>
          <Box>
            <div className={`${styles.filter} flex`}>
              <div className={`${styles.filter_container} w-50 mr4`}>
                <Select
                  multi
                  label="Choose items to filter"
                  options={[
                    {
                      value: { id: 0, name: 'first-option' },
                      label: 'Better commission',
                    },
                    {
                      value: { id: 0, name: 'first-option' },
                      label: 'Total Orders',
                    },
                  ]}
                  onChange={() => {}}
                />
              </div>
              <div className={`${styles.filter_container} w-20 mr4`}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={() => {}}
                  locale="en-US"
                />
              </div>
              <div className={`${styles.filter_container} w-20 mr4`}>
                <DatePicker
                  label="Final Date"
                  value={finalDate}
                  onChange={() => {}}
                  locale="en-US"
                />
              </div>
              <div className={`${styles.btn_filter} w-10 mt6`}>
                <ButtonWithIcon
                  icon={<IconFilter color="#FFF" size={18} />}
                  variation="primary"
                  onClick={() => {}}
                >
                  Filter
                </ButtonWithIcon>
              </div>
            </div>
          </Box>
        </div>
        <div className="mt7">
          <Tabs fullWidth>
            <Tab
              label="Commissions"
              active={tabs === 1}
              onClick={() => setTabs(1)}
            >
              <div className="mt5">
                <Box>
                  <div className="mt2">
                    <Table
                      schema={jsonschema}
                      items={[
                        {
                          id: 'AAAAA',
                          creation: '03/04/2022',
                          invoiced: '03/04/2022',
                          total: '10000',
                          commission: '100',
                          rate: '50',
                          status: 'pending',
                        },
                        {
                          id: 'AAAAA',
                          creation: '03/04/2022',
                          invoiced: '03/04/2022',
                          total: '10000',
                          commission: '100',
                          rate: '50',
                          status: 'pending',
                        },
                      ]}
                      toolbar={{
                        newLine: {
                          label: 'Create Invoice',
                          handleCallback: () => {},
                        },
                      }}
                      totalizers={[
                        {
                          label: 'Orders Sellers',
                          value: '2',
                          iconBackgroundColor: '#EAFCE3',
                          icon: <IconShoppingCart color="#79B03A" size={18} />,
                        },
                        {
                          label: 'Total Orders',
                          value: '15000',
                          iconBackgroundColor: '#CCE8FF',
                          icon: <IconUser color="#368DF7" size={18} />,
                        },
                        {
                          label: 'Total Commission',
                          value: '2000',
                          iconBackgroundColor: '#FFDCF8',
                          icon: <IconArrowUp color="#F67CC7" size={14} />,
                        },
                      ]}
                      pagination={{
                        onNextClick: () => {},
                        onPrevClick: () => {},
                        currentItemFrom: 1,
                        currentItemTo: 5,
                        onRowsChange: () => {},
                        textShowRows: 'Show rows',
                        textOf: 'of',
                        totalItems: 5,
                        rowsOptions: [5, 10, 15, 25],
                      }}
                    />
                  </div>
                </Box>
              </div>
            </Tab>
            <Tab
              label="Invoices"
              active={tabs === 2}
              onClick={() => setTabs(2)}
            >
              <div className="mt5">
                <Box>
                  <Table
                    schema={jsonschema2}
                    items={[
                      {
                        id: 'AAAAAAAA',
                        invoicedData: '03/04/2022',
                        dueDate: '03/04/2022',
                        totalDue: '23434',
                      },
                    ]}
                    pagination={{
                      onNextClick: () => {},
                      onPrevClick: () => {},
                      currentItemFrom: 1,
                      currentItemTo: 5,
                      onRowsChange: () => {},
                      textShowRows: 'Show rows',
                      textOf: 'of',
                      totalItems: 5,
                      rowsOptions: [5, 10, 15, 25],
                    }}
                  />
                </Box>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Layout>
    </div>
  )
}

export default CommissionReportDetail
