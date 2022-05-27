declare module '*.png'
declare module '*.css'
declare module 'vtex.render-runtime'
declare module 'vtex.native-types'

interface Invoice {
  comment?: string
  invoiceCreateDate?: string
  orders?: [Order]
  seller?: Seller
  status?: string
  totalizers?: Totalizers
}

interface Order {
  orderId: string
  sellerOrderId: string
  totalComission: number
  totalOrderRate: number
  totalOrderValue: number
}

interface Seller {
  contact: SellerContact
  id: string
  name: string
}

interface SellerContact {
  email: string
  phone: string
}

interface Totalizers {
  fee: number
  subtotal: number
  total: number
}
interface ModalConfirmData {
  buttonMessage: FormattedMessage
  messages: MessagesData
  sellerData: SellerData
}

interface MessagesData {
  confirmation: FormattedMessage
  warning: aFormattedMessageny
}

interface SellerData {
  startDate: string
  finalDate: string
  sellerName: string
  id: string
}
interface SchemaTable {
  id: string
  title: any
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
  startDatePicker?: Date
  finalDatePicker?: Date
  optionsSelect: SellerSelect[]
  setStartDate?: (v: string) => void
  setFinalDate?: (v: string) => void
  defaultStartDate?: string
  defaultFinalDate?: string
  setTotalItems?: (v: number) => void
  setPages?: (v: number) => void
  setSellerId: (v: string) => void
  setId?: (v: string) => void
  multiValue: boolean
  optionsStatus?: any
  setStatusOrders?: any
  disableSelect?: boolean
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
  label: any
  value: any
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

interface SettingsSellers {
  id: string
  name: string
}

type SellerSettingsToken = Partial<TokenConfiguration>

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
  multi: boolean
  customLabel: any
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
