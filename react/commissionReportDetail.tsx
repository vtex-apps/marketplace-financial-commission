import React, { FC, useState } from 'react'
import {
  Layout,
  Tab,
  Tabs,
  PageHeader,
  Box,
  EXPERIMENTAL_Select as Select,
  DatePicker,
  Button,
  Totalizer,
  Table,
  Tag,
  ButtonWithIcon,
  IconCog,
  IconShoppingCart,
  IconUser,
  IconArrowUp,
  IconExternalLink,
} from 'vtex.styleguide'

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
        title: 'Invoice',
        width: 150,
        // eslint-disable-next-line react/display-name
        cellRenderer: () => (
          <p style={{color:'#134CD8', textDecoration:'underline'}}>11234234443 <IconExternalLink /></p>
        ),
      },
      creation: {
        title: 'Order Creation Date',
        width: 160,
      },
      invoiced: {
        title: 'Invoiced date',
        width: 130,
      },
      total: {
        title: 'Total Order',
        width: 130,
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
          <p style={{color:'#134CD8', textDecoration:'underline'}}>11234234443 <IconExternalLink /></p>
        ),
      },
      invoicedData: {
        title: 'Invoiced Date',
        width: 220,
      },
      dueDate: {
        title: 'Due Date',
        width: 220,
      },
      totalDue: {
        title: 'Total Due',
        width: 150,
      },
    },
  }

  return (
    <div style={{margin: '0px'}}>
      <div className="flex w-100 pb2" style={{alignItems: 'flex-end', justifyContent: 'flex-end', height: '60px'}}>
        <div style={{ marginRight: '40px' }}>
          <p style={{ color: '#999999', fontSize: '15px'}}>
            Billing Cycle: 25/03/2022
          </p>
        </div>
        <div style={{ marginRight: '40px' }}>
          <p style={{ color: '#999999', fontSize: '15px'}}>
            Next Billing: 2 weeks
          </p>
        </div>
        <div style={{ marginRight: '40px'}}>
          <p style={{ color: '#999999', fontSize: '15px'}}>
            Current Commission: 10%
          </p>
        </div>
      </div>
      <Layout>
        <PageHeader title="Commission Report Seller: Erika Gutiérrez" fullWidth />
        <div className='mt3' style={{textAlign: 'right'}}>
          <ButtonWithIcon icon={<IconCog color="#3F3F40" size={20}/>} variation="tertiary" onClick={() => setOpenModal(!openModal)}>
          </ButtonWithIcon>
        </div>
        <div className='mt5'>
          <Box title="Overview">
            <Totalizer
              items={[
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
            />
          </Box>
        </div>
        <div className="mt7">
          <Box>
            <div className="flex">
              <div className="w-50 mr4">
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
        <div className="mt7">
          <Tabs fullWidth>
            <Tab
              label="Commissions"
              active={tabs === 1}
              onClick={() => setTabs(1)}
            >
              <div className="mt5">
                <Box>
                  <div>
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
                    />
                  </div>
                </Box>
              </div>
            </Tab>
            <Tab label="Invoices" active={tabs === 2} onClick={() => setTabs(2)}>
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
                      }
                    ]}
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
