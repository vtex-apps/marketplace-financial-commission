interface Sellers {
  sellers: Seller[]
  paging: Paging
}

interface Seller {
  id: string
  name: string
  account: string
  productCommissionPercentage: float
  freightCommissionPercentage: float
  isActive: boolean
}
interface Dashboards {
  dateCut?: string
  dateStart?: string
  dateEnd?: string
  sellers: SellersDashboard[]
  statistics?: StatsSeller
  paging: Paging
}

interface SellersDashboard {
  id: string
  name: string
  account: string
  statistics: StatsSeller
}

interface StatsSeller {
  dateInvoiced?: string
  ordersCount: number
  totalComission: number
  totalOrderValue: number
  outstandingBalance?: number
}

interface Paging {
  currentPage: number,
  totalPages: number
}

interface Stats {
  dateStart: string
  dateEnd: string
  statistics: statisticsStats
}

interface statisticsStats {
  ordersCount: number
  totalComission: number
  totalOrderValue: number
}
