import type { FC } from 'react'
import React, { useState } from 'react'
import {
  Layout,
  Tab,
  Tabs,
  PageHeader,
  Box,
  EXPERIMENTAL_Select as Select,
  DatePicker,
  Button,
  Card,
  Table,
  Tag,
  InputSearch,
} from 'vtex.styleguide'

import CartLogo from './assets/img/cart.png'
import TotalLogo from './assets/img/dollar.png'
import CommLogo from './assets/img/percentage.png'

const Dashboard: FC = () => {
  const [tabs, setTabs] = useState(1)

  const jsonschema = {
    properties: {
      orderId: {
        title: 'Order ID',
        width: 150,
      },
      seller: {
        title: 'Seller',
        width: 290,
      },
      total: {
        title: 'Total',
        width: 150,
      },
      commission: {
        title: 'Commission',
        width: 150,
      },
      rate: {
        title: 'Rate',
        width: 150,
        cellRenderer: () => {
          return (
            <Tag bgColor="#F71963" color="#fff">
              <span className="nowrap">50</span>
            </Tag>
          )
        },
      },
    },
  }

  const jsonschema2 = {
    properties: {
      id: {
        title: 'ID Seller',
        width: 150,
      },
      seller: {
        title: 'Seller',
        width: 290,
      },
      invoiceDate: {
        title: 'Invoice Date',
        width: 150,
      },
      dueDate: {
        title: 'Due Date',
        width: 150,
      },
      totalDue: {
        title: 'Total Due',
        width: 150,
        cellRenderer: () => {
          return (
            <Tag bgColor="#00BBD4" color="#fff">
              <span className="nowrap">2000</span>
            </Tag>
          )
        },
      },
    },
  }

  const startDate = new Date()

  startDate.setDate(1)
  startDate.setMonth(startDate.getMonth() - 1)

  const finalDate = new Date()

  finalDate.setDate(finalDate.getDate() - 1)

  return (
    <Layout>
      <PageHeader title="Commission Report" fullWidth />
      <Tabs fullWidth>
        <Tab label="Commissions" active={tabs === 1} onClick={() => setTabs(1)}>
          <div className="mt5">
            <Box title="Generate commission report">
              <div className="flex">
                <div className="w-50 mr4">
                  <Select
                    defaultValue={{
                      value: { id: 0, name: 'first-option' },
                      label: 'Erika Gutierrez',
                    }}
                    multi
                    label="Choose seller name"
                    options={[
                      {
                        value: { id: 0, name: 'first-option' },
                        label: 'Deimer Marin',
                      },
                      {
                        value: { id: 0, name: 'first-option' },
                        label: 'Yudy Perez',
                      },
                    ]}
                    onChange={() => {}}
                  />
                </div>
                <div className="w-20 mr4">
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={() => {}}
                    locale="en-US"
                  />
                </div>
                <div className="w-20 mr4">
                  <DatePicker
                    label="Final Date"
                    value={finalDate}
                    onChange={() => {}}
                    locale="en-US"
                  />
                </div>
                <div className="w-10 mt6">
                  <Button variation="primary">Filter</Button>
                </div>
              </div>
            </Box>
          </div>
          <div className="flex mt5 w-100">
            <div className="w-30" style={{ borderBottom: 'solid 2px #71D38B' }}>
              <Card>
                <div className="flex ml6">
                  <div className="mr5">
                    <div
                      style={{
                        height: '70px',
                        width: '70px',
                        backgroundColor: '#EFFAF2',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginTop: '20px',
                      }}
                    >
                      <img
                        src={CartLogo}
                        alt="fireSpot"
                        style={{
                          width: '30px',
                          marginTop: '20px',
                          marginLeft: '19px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p style={{ marginBottom: '0px', marginTop: '25px' }}>
                      Orders Seller
                    </p>
                    <p style={{ marginTop: '2px' }}>
                      <b style={{ fontSize: '40px' }}>2 </b> items
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div
              className="w-40 ml3 mr3"
              style={{ borderBottom: 'solid 2px #F77DC6' }}
            >
              <Card>
                <div className="flex ml8">
                  <div className="mr5">
                    <div
                      style={{
                        height: '70px',
                        width: '70px',
                        backgroundColor: '#FEF1FA',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginTop: '20px',
                      }}
                    >
                      <img
                        src={TotalLogo}
                        alt="fireSpot"
                        style={{
                          width: '30px',
                          marginTop: '20px',
                          marginLeft: '21px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p style={{ marginBottom: '0px', marginTop: '25px' }}>
                      Total Orders
                    </p>
                    <p style={{ marginTop: '2px' }}>
                      <b style={{ fontSize: '40px' }}>15000 </b> usd
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="w-30" style={{ borderBottom: 'solid 2px #41D5FE' }}>
              <Card>
                <div className="flex ml2">
                  <div className="mr5">
                    <div
                      style={{
                        height: '70px',
                        width: '70px',
                        backgroundColor: '#ECFBFF',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginTop: '20px',
                      }}
                    >
                      <img
                        src={CommLogo}
                        alt="fireSpot"
                        style={{
                          width: '30px',
                          marginTop: '20px',
                          marginLeft: '22px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p style={{ marginBottom: '0px', marginTop: '25px' }}>
                      Total Commission
                    </p>
                    <p style={{ marginTop: '2px' }}>
                      <b style={{ fontSize: '40px' }}>2000 </b> usd
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="mt5">
            <Box>
              <div />
              <div>
                <Table
                  schema={jsonschema}
                  items={[
                    {
                      orderId: '1234',
                      seller: 'Erika Gutierrez',
                      total: '10000',
                      commission: '1000',
                      rate: '50',
                    },
                    {
                      orderId: '1234',
                      seller: 'Erika Gutierrez',
                      total: '5000',
                      commission: '1000',
                      rate: '50',
                    },
                  ]}
                  toolbar={{
                    newLine: {
                      label: 'Create Invoice',
                      handleCallback: () => {},
                    },
                  }}
                />
              </div>
            </Box>
          </div>
        </Tab>
        <Tab label="Invoices" active={tabs === 2} onClick={() => setTabs(2)}>
          <div className="mt5">
            <Box title="Search invoices">
              <div className="flex">
                <div className="w-30 mr4">
                  <Select
                    defaultValue={{
                      value: { id: 0, name: 'first-option' },
                      label: 'Erika Gutierrez',
                    }}
                    multi
                    label="Choose seller name"
                    options={[
                      {
                        value: { id: 0, name: 'first-option' },
                        label: 'Deimer Marin',
                      },
                      {
                        value: { id: 0, name: 'first-option' },
                        label: 'Yudy Perez',
                      },
                    ]}
                    onChange={() => {}}
                  />
                </div>
                <div className="w-20 mr4">
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={() => {}}
                    locale="en-US"
                  />
                </div>
                <div className="w-20 mr4">
                  <DatePicker
                    label="Final Date"
                    value={finalDate}
                    onChange={() => {}}
                    locale="en-US"
                  />
                </div>
                <div className="w-30 mr4">
                  <InputSearch
                    placeholder="Search..."
                    value=""
                    label="Filter another information"
                    size="regular"
                    onChange={() => {}}
                    onSubmit={() => {}}
                  />
                </div>
              </div>
              <div className="w-100 mt6">
                <div style={{ float: 'right' }}>
                  <Button variation="primary">Filter</Button>
                </div>
              </div>
              <div style={{ height: '20px' }} />
            </Box>
          </div>
          <div className="mt5">
            <Box>
              <div />
              <div>
                <Table
                  schema={jsonschema2}
                  items={[
                    {
                      id: '7869646118',
                      seller: 'Erika Gutierrez',
                      invoiceDate: '2/25/2022',
                      dueDate: '2/28/2022',
                      totalDue: '2000',
                    },
                  ]}
                  toolbar={{
                    newLine: {
                      label: 'Create Invoice',
                      handleCallback: () => {},
                    },
                  }}
                />
              </div>
            </Box>
          </div>
        </Tab>
      </Tabs>
    </Layout>
  )
}

export default Dashboard
