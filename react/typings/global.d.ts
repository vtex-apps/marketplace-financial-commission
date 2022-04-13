declare module '*.png'
declare module '*.css'
declare module 'vtex.render-runtime'
declare module 'vtex.native-types'

interface TableProps {
  schemaTable: {
    properties: {
      id?: {
        title: string
        width: number
        cellRenderer?: () => void
      }
      seller?: {
        title: string
        width: number
      }
      totalOrders?: {
        title: string
        width: number
      }
      amountOrders?: {
        title: string
        width: number
      }
      totalCommission?: {
        title: string
        width: number
      }
      outstanding?: {
        title: string
        width: number
      }
      actions?: {
        title: string
        width: number
        cellRenderer?: () => void
      }
    }
  }
  itemTable: []
  actions: []
  totalizers?: TotalizerProps
  toolbar?: {
    newLine: {
      label: string
      handleCallback: () => void
    }
  }
}
interface FilterProps {
  dataWithoutFilter?: []
  setDataWithoutFilter?: any
  startDatePicker?: Date
  finalDatePicker?: Date
  locale: string
  optionsSelect?: []
  setStartDate?: any
  setFinalDate?: any
  defaultStartDate?: any
  defaultFinalDate?: any
}
interface TotalizerProps {
  item: [
    {
      label: string
      value: number
      iconBackgroundColor: string
      icon: any
    }
  ]
}
interface SettingsProps {
  openModal: boolean
  setOpenModal: (open: boolean) => void
}

// eslint-disable-next-line no-restricted-syntax
enum SortOrder {
  ASC = 'ASC',
  DSC = 'DSC',
}

type Sorted = {
  order?: SortOrder
  by?: string
}

interface StatsTotalizer {
  label: string
  value: string
  iconBackgroundColor?: string
  icon?: any
}

interface TableData {
  items: any
  schemaTable: any
  loading: boolean
  currentPage: number
  pageSize: number
  totalPage: number
  setPageSize: any
  totalItems: number
  setPage: any
}

interface DataFilter {
  label: string
  value: {
    id: string
    name: string
  }
}

interface DataSeller {
  dateInvoiced: string | undefined
  name: string
  ordersCount: string
  totalComission: string
  totalOrderValue: string
}
