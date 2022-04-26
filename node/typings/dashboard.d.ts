interface Dashboards {
  dateCut?: string
  dateStart?: string
  dateEnd?: string
  sellers: SellersDashboard[]
  statistics?: StatsSeller
}

interface SellersDashboard {
  id: string
  name: string
  account: string
  statistics?: StatsSeller
}

interface UnificationSellersDashboard extends SellersDashboard {
  statistics: StatsSeller[]
}

interface StatsSeller {
  dateInvoiced?: string
  ordersCount: number
  totalComission: number
  totalOrderValue: number
  outstandingBalance?: number
  totalOrdersItems?: number
  totalDiscounts?: number
  totalShipping?: number
  totalTax?: number
}

interface OrderComission {
  orderId: string
  totalComission: number
  totalOrdersItems?: number
  totalDiscounts?: number
  totalShipping?: number
  totalTax?: number
  totalOrderValue: number
  totalOrderRate?: number | null
}

interface ResultSearch {
  dateStart: string
  dateEnd: string
  sellers: SellersDashboard[] | SellersDashboard
  pagination: Pagination
}

interface Pagination {
  currentPage: number
  pageSize: number
  totalPage: number
}

interface StatisticsGeneralDashboard {
  dateStart: string
  dateEnd: string
  statistics: StatsSeller
}
