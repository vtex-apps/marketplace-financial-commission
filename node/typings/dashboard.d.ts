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
  /**
   * @todo float no es un type nativo, habria que generarlo
   */
  totalComission: float
  totalOrderValue: float
  outstandingBalance?: float
}

interface OrderComission {
  orderId: string
  totalComission: number
  totalOrderValue: number
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
