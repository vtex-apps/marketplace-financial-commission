declare module '*.png'
declare module '*.css'
declare module 'vtex.render-runtime'
declare module 'vtex.native-types'

interface SchemaTable {
  id: string
  title: string
  cellRenderer?: (props: CellRendererProps) => void
}

interface SellerSelect {
  value: {
    id: string
    name: string
  }
  label: string
}
interface FilterProps {
  startDatePicker: Date
  finalDatePicker: Date
  optionsSelect: SellerSelect[]
  setStartDate: function
  setFinalDate: function
  defaultStartDate: string
  defaultFinalDate: string
  setTotalItems: (v: number) => void
  setSellerId: (v: string) => void
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
  schemaTable: SchemaTable[]
  loading: boolean
}

interface DataSellerSelect {
  account: string
  freightCommissionPercentage: number
  id: string
  isActive: boolean
  name: string
  productCommissionPercentage: number
}

interface DataDashboardSeller {
  account: string
  id: string
  name: string
  statistics: DataStatistics
}

interface DataStatistics {
  ordersCount: number
  outstandingBalance: number
  totalComission: number
  totalOrderValue: number
}

interface DataFilter {
  label: string
  value: {
    id: string
    name: string
  }
}

interface DataSeller {
  id: string
  name: string
  ordersCount: string
  totalComission: string
  totalOrderValue: string
}

interface PaginationProps {
  setPageSize: (v: number) => void
  currentPage: number
  pageSize: number
  setPage: (v: number) => void
  totalItems: number
  onNextClick: () => void
  changeRows: (row: number) => void
  onPrevClick: () => void
}

interface SelectProps {
  options: DataFilter[]
  dataFilter: DataFilter[]
  setDataFilter: (v: DataFilter[]) => void
}

interface DatepickerProps {
  startDateFilter: Date | string
  startDatePicker: Date | undefined
  changeStartDate: (start: Date) => void
  finalDateFilter: Date | string
  finalDatePicker: Date | undefined
  changeFinalDate: (final: Date) => void
}

interface CellRendererProps {
  data: string
  density: string
  motion: {
    transaction: string
    willChange: string
  }
  rowHeight: number
}
