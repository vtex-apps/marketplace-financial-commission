import type { FC } from 'react'
import React, { useState } from 'react'
import {
  Layout,
  Box,
  EXPERIMENTAL_Select as Select,
  DatePicker,
  Table,
  Checkbox,
  Totalizer,
  IconShoppingCart,
  IconUser,
  IconArrowUp,
  IconInfo,
  ButtonWithIcon,
  IconOptionsDots,
  IconCog,
  ModalDialog,
  IconFilter,
} from 'vtex.styleguide'

import styles from './styles.css'

const CommissionReport: FC = () => {
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
              <ButtonWithIcon icon={<IconOptionsDots />} variation="tertiary" />
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
          onClose={() => setOpenModal(false)}
        >
          <div className="flex w-100">Definir campos aquí</div>
        </ModalDialog>
      </div>
      <div>
        <Box>
          <div className={`${styles.filter} flex`}>
            <div className={`${styles.filter_container} w-30 mr4`}>
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
            <div className={`${styles.filter_container} w-20 mr4`}>
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

      <div className="mt4">
        <Box>
          <div className="mt4 mb7">
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
          </div>
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
              rowsOptions: [5, 10, 15, 25],
            }}
          />
        </Box>
      </div>
    </Layout>
  )
}

export default CommissionReport
