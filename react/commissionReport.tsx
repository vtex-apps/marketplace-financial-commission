import React, { FC, useState } from 'react'
import {
  Layout,
  PageHeader,
  Box,
  EXPERIMENTAL_Select as Select,
  DatePicker,
  Button,
  Table,
  Checkbox,
  Totalizer,
  IconShoppingCart,
  IconUser,
  IconArrowUp,
  IconInfo,
  ButtonWithIcon,
  IconExternalLink,
  IconCog,
  Collapsible,
  LineChart,
  IconArrowDown,
  ModalDialog,
} from 'vtex.styleguide'



const CommissionReport: FC = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const jsonschema2 = {
    properties: {
      id: {
        title: ' ',
        width: 50,
        // eslint-disable-next-line react/display-name
        cellRenderer: () => {
          return (
            <div>
              <Checkbox
                checked={false}
                id="option-0"
                name="default-checkbox-group"
                onChange={() => {}}
                value="option-0"
              />
            </div>
          )
        },
      },
      seller: {
        title: 'Seller name',
        width: 150,
      },
      totalOrders: {
        title: 'Total orders',
        width: 130,
      },
      amountOrders: {
        title: 'Total amount orders',
        width: 160,
      },
      totalCommission: {
        title: 'Total commission',
        width: 160,
      },
      outstanding: {
        title: 'Outstanding balance',
        width: 160,
      },
      actions: {
        title: 'Actions',
        width: 80,
        // eslint-disable-next-line react/display-name
        cellRenderer: () => {
          return (
            <div>
              <ButtonWithIcon icon={<IconExternalLink />} variation="tertiary">
              </ButtonWithIcon>
            </div>
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
      <PageHeader title="Commission Report Dashboard" fullWidth />
      <div className='mt3' style={{textAlign: 'right'}}>
        <ButtonWithIcon icon={<IconCog color="#3F3F40" size={20}/>} variation="tertiary" onClick={() => setOpenModal(!openModal)}>
        </ButtonWithIcon>
      </div>
      <div>
        <ModalDialog
          centered
          loading={false}
          confirmation={{
            onClick: () => {},
            label: 'Send',
          }}
          cancelation={{
            onClick: () => setOpenModal(false),
            label: 'Cancel',
          }}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}>
            <div className='flex w-100'>
              Definir campos aquí
            </div>
        </ModalDialog>
      </div>
      <div className='mt5'>
        <Box title="Overview">
          <Totalizer
            items={[
              {
                label: 'Total Orders',
                value: '500',
                iconBackgroundColor: '#EAFCE3',
                icon: <IconShoppingCart color="#79B03A" size={18} />,
              },
              {
                label: 'Number of Sellers',
                value: '15',
                iconBackgroundColor: '#CCE8FF',
                icon: <IconUser color="#368DF7" size={18} />,
              },
              {
                label: 'Total Amount Orders',
                value: '95000 usd',
                iconBackgroundColor: '#FFDCF8',
                icon: <IconArrowUp color="#F67CC7" size={14} />,
              },
              {
                label: 'Total Commission',
                value: '2000 usd',
                iconBackgroundColor: '#FFF0EC',
                icon: <IconInfo color="#F7634A" size={14} />,
              },
            ]}
          />
        </Box>
      </div>
      <div className="mt7">
        <Box>
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
        <Box>
          <Table
            schema={jsonschema2}
            items={[
              {
                seller: 'Erika Gutierrez',
                totalOrders: '40',
                amountOrders: '20000',
                totalCommission: '5000',
                outstanding: '1000',
              },
              {
                seller: 'Erika Gutierrez',
                totalOrders: '40',
                amountOrders: '20000',
                totalCommission: '5000',
                outstanding: '1000',
              },
              {
                seller: 'Erika Gutierrez',
                totalOrders: '40',
                amountOrders: '20000',
                totalCommission: '5000',
                outstanding: '1000',
              },
              {
                seller: 'Erika Gutierrez',
                totalOrders: '40',
                amountOrders: '20000',
                totalCommission: '5000',
                outstanding: '1000',
              },
              {
                seller: 'Erika Gutierrez',
                totalOrders: '40',
                amountOrders: '20000',
                totalCommission: '5000',
                outstanding: '1000',
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
              rowsOptions: [5, 10, 15, 25]
            }}
          />
        </Box>
      </div>
      <div className="mt7 mb4">
        <Collapsible
        header={
          <span className="c-action-primary hover-c-action-primary fw5">
            Graphics and Statistics
          </span>
        }
        onClick={() => setIsOpen(!isOpen) }
        isOpen={isOpen}>
          <div className='mt7'>
            <div className="mt4 flex">
              <div className='w-50 mr7'>
                <Box>
                  <LineChart
                  data={[{orders: '600', month: 'January'}, {orders: '200', month: 'February'}, {orders: '800', month: 'March'}, {orders: '700', month: 'April'}, {orders: '800', month: 'May'}]}
                  dataKeys={['orders', 'month']}
                  xAxisKey='month'
                  />
                </Box>
              </div>
              <div className='w-50'>
                <div style={{height: '183px'}}>
                  <Box>
                    <div className='flex w-100' style={{alignItems: 'center', justifyContent: 'center'}}>
                      <div className='w-10'>
                        <IconArrowUp color="#79B03A" size={35} />
                      </div>
                      <div className='w-90 pl5 pt2 pb2'>
                        <p style={{marginBottom: '0px'}}><b style={{fontSize: '35px'}}>10%</b> orders</p>
                        <p style={{marginTop: '4px'}}>higher that last month</p>
                      </div>
                    </div>
                  </Box>
                </div>
                <div className='mt4'>
                  <Box>
                    <div className='flex w-100' style={{alignItems: 'center', justifyContent: 'center'}}>
                      <div className='w-10'>
                        <IconArrowDown color="#FF4C4C" size={35} />
                      </div>
                      <div className='w-90 pl5 pt2 pb2'>
                        <p style={{marginBottom: '0px'}}><b style={{fontSize: '35px'}}>5%</b> due payments</p>
                        <p style={{marginTop: '4px'}}>less that last month</p>
                      </div>
                    </div>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </Collapsible>
      </div>
    </Layout>
  )
}

export default CommissionReport
