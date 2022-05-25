/* eslint-disable react/jsx-key */
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import {
  Layout,
  Tab,
  Tabs,
  PageBlock,
  PageHeader,
  Divider,
  Modal,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-apollo'
import type { DocumentNode } from 'graphql'

import { GET_SELLERS } from './graphql'
import { Filter } from './components'
import SellerInvoices from './components/Dashboard/DetailDashboard/sellerInvoices'
import SellerOrders from './components/Dashboard/DetailDashboard/sellerOrders'
import { status } from './typings/constants'

interface DetailProps {
  account?: string
  ordersQuery?: DocumentNode
}

const CommissionReportDetail: FC<DetailProps> = ({ account, ordersQuery }) => {
  const [startDate, setStartDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [defaultStartDate, setDefaultStartDate] = useState('')
  const [defaultFinalDate, setDefaultFinalDate] = useState('')
  const [optionsSelect, setOptionsSelect] = useState<DataFilter[]>([])
  const [sellerName, setSellerName] = useState(account ?? '')
  const [tabs, setTabs] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [dateRate, setDataRate] = useState<any>([])
  const [optionsStatus, setOptionsStatus] = useState<any>([])
  const [statusOrders, setStatusOrders] = useState('')

  const { data: dataSellers } = useQuery(GET_SELLERS, {
    ssr: false,
    pollInterval: 0,
  })

  const formatDate = (valueDate: number) => {
    const validateDate = valueDate <= 9 ? `0${valueDate}` : valueDate

    return validateDate
  }

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (dataSellers) {
      const builtSelectSeller: DataFilter[] = []

      dataSellers.getSellers.sellers.forEach((seller: DataSellerSelect) => {
        builtSelectSeller.push({
          value: { id: seller.id, name: seller.name },
          label: seller.name,
        })
      })
      setOptionsSelect(builtSelectSeller)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSellers])

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (!optionsStatus.length) {
      const buildSelectStatus: any[] = []

      Object.keys(status).forEach((orderStatus) => {
        buildSelectStatus.push({
          value: { id: orderStatus, name: orderStatus },
          label: orderStatus,
        })
      })
      setOptionsStatus(buildSelectStatus)
    }
  }, [optionsStatus])

  useEffect(() => {
    const defaultDate = new Date()
    const defaultStart = new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth(),
      1
    )

    const defaultStartString =
      `${defaultStart.getFullYear()}-${formatDate(
        defaultStart.getMonth() + 1
      )}-` + `01`

    const valueDate = defaultDate.getDate() - 1
    const valueMonth = defaultDate.getMonth() + 1
    const defaultFinal = `${defaultDate.getFullYear()}-${formatDate(
      valueMonth
    )}-${formatDate(valueDate)}`

    setStartDate(defaultStartString)
    setFinalDate(defaultFinal)
    setDefaultStartDate(defaultStartString)
    setDefaultFinalDate(defaultFinal)
  }, [])

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/navigation.detail-title" />}
        />
      }
    >
      <Modal
        centered
        isOpen={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <div className="mb3">
          {dateRate.map((elmRate: any) => (
            <div>
              <h2>Item ID: #{elmRate.itemId}</h2>
              <p>
                <b>Name Item: </b> {elmRate.nameItem}
              </p>
              <p>
                <b>Freight Commission Percentage: </b>
                {elmRate.rate.freightCommissionPercentage}%
              </p>
              <p>
                <b>Producto Commission Percentage: </b>
                {elmRate.rate.productCommissionPercentage}%
              </p>
              <Divider />
            </div>
          ))}
        </div>
      </Modal>
      <div className="mt4 mb7">
        {startDate && finalDate && (
          <div className="mt2">
            <PageBlock>
              <div className="mt4 mb5-ns">
                <Filter
                  startDatePicker={new Date(`${startDate}T00:00:00`)}
                  finalDatePicker={new Date(`${finalDate}T00:00:00`)}
                  optionsSelect={optionsSelect}
                  setStartDate={setStartDate}
                  setFinalDate={setFinalDate}
                  defaultStartDate={defaultStartDate}
                  defaultFinalDate={defaultFinalDate}
                  setSellerId={setSellerName}
                  multiValue={false}
                  optionsStatus={optionsStatus}
                  setStatusOrders={setStatusOrders}
                  disableSelect={Boolean(account)}
                />
              </div>
            </PageBlock>
          </div>
        )}
      </div>
      <div className="mt7">
        <Tabs fullWidth>
          <Tab
            label={<FormattedMessage id="admin/table.title-tab-commission" />}
            active={tabs === 1}
            onClick={() => setTabs(1)}
          >
            <div className="mt5">
              <SellerOrders
                ordersQuery={ordersQuery}
                account={account}
                sellerName={sellerName}
                startDate={startDate}
                finalDate={finalDate}
                statusOrders={statusOrders}
                setDataRate={setDataRate}
              />
            </div>
          </Tab>
          <Tab
            label={<FormattedMessage id="admin/table.title-tab-invoices" />}
            active={tabs === 2}
            onClick={() => setTabs(2)}
          >
            <div className="mt5">
              <SellerInvoices
                ordersQuery={ordersQuery}
                account={account}
                sellerName={sellerName}
                startDate={startDate}
                finalDate={finalDate}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

export default CommissionReportDetail
