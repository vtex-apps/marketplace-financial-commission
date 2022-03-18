interface Dashboards {
  dateCut?: string
  dateIni?: string
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
  countOrders: number
  totalComission: float
  totalValueOrder: float
  outstandingBalance?: float
}

interface OrderComission {
  orderId: string
  totalComission: float
  totalValueOrder: float
}
