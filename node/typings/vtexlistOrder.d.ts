interface List {
  orderId: string
  creationDate: Date
  clientName: string
  items?: any
  totalValue: number
  paymentNames: string
  status: string
  statusDescription: string
  marketPlaceOrderId?: any
  sequence: string
  salesChannel: string
  affiliateId: string
  origin: string
  workflowInErrorState: boolean
  workflowInRetry: boolean
  lastMessageUnread: string
  ShippingEstimatedDate?: any
  ShippingEstimatedDateMax: Date
  ShippingEstimatedDateMin: Date
  orderIsComplete: boolean
  listId?: any
  listType?: any
  authorizedDate: Date
  callCenterOperatorName?: any
  totalItems: number
  currencyCode: string
  hostname: string
  invoiceOutput: string[]
  invoiceInput: string[]
  lastChange: Date
  isAllDelivered: boolean
  isAnyDelivered: boolean
  giftCardProviders?: any
  orderFormId: string
  paymentApprovedDate: Date
  readyForHandlingDate?: any
  deliveryDates: Date[]
}

interface Paging {
  total: number
  pages: number
  currentPage: number
  perPage: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Facets {}

interface TotalValue {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: Facets
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Facets2 {}

interface TotalItems {
  Count: number
  Max: number
  Mean: number
  Min: number
  Missing: number
  StdDev: number
  Sum: number
  SumOfSquares: number
  Facets: Facets2
}

interface Stats2 {
  totalValue: TotalValue
  totalItems: TotalItems
}

interface Stats {
  stats: Stats2
}

interface VtexListOrder {
  list: List[]
  facets: any[]
  paging: Paging
  stats: Stats
  reportRecordsLimit: number
}
