interface Dashboards {
  dateCut?: string
  dateStart?: string
  dateEnd?: string
  sellers: SellersDashboard[]
  stats: StatsSeller
}

interface SellersDashboard {
  id: string
  name: string
  account: string
  stats: StatsSeller
}

interface StatsSeller {
  dateInvoiced?: string
  ordersCount: number
  totalComission: float
  totalOrderValue: float
  outstandingBalance?: float
}

interface OrderComission {
  orderId: string
  totalComission: float
  totalOrderValue: float
}
