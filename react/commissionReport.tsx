import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import {
  Layout,
  PageBlock,
  Checkbox,
  IconShoppingCart,
  IconUser,
  IconArrowUp,
  IconInfo
} from 'vtex.styleguide'
import { useLazyQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import type { InjectedIntlProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { message } from './utils/definedMessages'
import { TableComponent, Totalizer, Filter, SettingsDashboard} from './components'
import { GETSELLERS, STATS, DASHBOARD } from './graphql'



export const schemaTable = [
  {
    id: 'id',
    cellRenderer: () => {
      return (
        <div>
          <Checkbox
            checked={false}
            id="option-0"
            name="default-checkbox-group"
            onChange={() => { }}
            value="option-0"
          />
        </div>
      )
    },
  },
  {
    id: 'name',
    title: 'Seller name',
    sortable: true,
  },
  {
    id: 'dateInvoiced',
    title: 'Date Invoiced',
  },
  {
    id: 'ordersCount',
    title: 'Total Orders',
  },
  {
    id: 'totalComission',
    title: 'Total commission',
  },
  {
    id: 'totalOrderValue',
    title: 'Total Amount Orders',
  },
  {
    id: 'actions',
    title: 'Actions',
    cellRenderer: () => { },
  },
]

const CommissionReport: FC<InjectedIntlProps> = ({ intl }) => {
  const { culture } = useRuntime()
  const [sellersSelect, setSellerSelect] = useState<any>({data:{
    sellers:{
      item: [],
      paging: {
        total: 0
      }
    }
  }})
  const [optionsSelect, setOptionsSelect] = useState<any>([])
  const [openModal, setOpenModal] = useState(false)
  const [sellersDashboard, setSellersDashboard] = useState(false)
  const [statsTotalizer, setStatsTotalizer] = useState<StatsTotalizer[]>([{
    label: '',
    value: '',
    iconBackgroundColor: ''
  }])

  const [startDate, setStartDate] = useState('')
  const [finalDate, setFinalDate] = useState('')


  const [stats, { data: dataStats }] = useLazyQuery(STATS, {
    ssr: false,
    pollInterval: 5000,
  })

  const [sellers, { data: dataSellers }] = useLazyQuery(GETSELLERS, {
    ssr: false,
    pollInterval: 5000,
  })

  const [dashboard, { data: dataDashboard }] = useLazyQuery(DASHBOARD, {
    ssr: false,
    pollInterval: 5000,
  })

  useEffect(() => {

    const defaultDate = new Date();
    const defaultStart = new Date(defaultDate.getFullYear(), defaultDate.getMonth(), 1)
    const defaultStartString = defaultStart.getFullYear() + "-" + (defaultStart.getMonth() + 1) + "-" + "01"
    const valueDate = defaultDate.getDate()-1
    const dateDefault = valueDate <= 9 ? "0"+ valueDate: valueDate
    const defaultFinal = defaultDate.getFullYear() + "-" + (defaultDate.getMonth() + 1) + "-" + dateDefault
    setStartDate(defaultStartString)
    setFinalDate(defaultFinal)

    stats()
    sellers()
    dashboard()

    setSellersDashboard(false)

    if(dataStats){

      setStatsTotalizer([
        {
          label: 'Number of Sellers',
          value: '0',
          iconBackgroundColor: '#EAFCE3',
          icon: <IconUser color="#79B03A" size={18} />
        },
        {
          label: 'Total Orders',
          value: dataStats.stats.statistics.ordersCount,
          iconBackgroundColor: '#CCE8FF',
          icon: <IconShoppingCart color="#368DF7" size={18} />
        },
        {
          label: 'Total Amount Orders',
          value: (dataStats.stats.statistics.totalOrderValue.toFixed(2)).toString(),
          iconBackgroundColor: '#FFDCF8',
          icon: <IconArrowUp color="#F67CC7" size={14} />
        },
        {
          label: 'Total Commission',
          value: (dataStats.stats.statistics.totalComission.toFixed(2)).toString(),
          iconBackgroundColor: '#FFF0EC',
          icon: <IconInfo color="#F7634A" size={14} />
        },
      ])
    }

    if(dataSellers){
      let builtSelectSeller:any = []
      dataSellers.getSellers.items.forEach((seller:any) => {
        builtSelectSeller.push({
          value: { id: seller.id, name: seller.name },
          label: seller.name
        })
      })

      setOptionsSelect(builtSelectSeller)
      setSellerSelect(dataSellers.getSellers)

    }

    console.log('dataDashboard ', dataDashboard)

  }, [dataStats, dataSellers, dataDashboard])




  return (
    <Layout>
      <div className="mt9">
        <h1 style={{ color: '#3F3F40', fontSize: '35px' }}>
          {formatIOMessage({
            id: message.title.id,
            intl,
          }).toString()}
        </h1>
      </div>
      <div>
        <SettingsDashboard openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb7">
            {(startDate && finalDate) ? <Filter listSellers={sellersSelect.data ? sellersSelect.data.sellers.item : []} sellersDashboard={[]} startDatePicker={new Date(startDate)} finalDate={new Date(finalDate)} locale={culture.locale} optionsSelect={optionsSelect} setStartDate={setStartDate} setFinalDate={setFinalDate}/> : <div />}
          </div>
        </PageBlock>
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb5">
            <Totalizer item={statsTotalizer} />
          </div>
        </PageBlock>
      </div>
      <div className="mt4">
        <PageBlock>
          <div className="mt4 mb7">
            <TableComponent schemaTable={schemaTable} items={sellersDashboard}/>
          </div>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default injectIntl(CommissionReport)
