interface DatesInvoice {
  invoicedDateInit: string
  invoicedDateEnd: string
}

interface Item {
  id: string
  name: string
  account: string
  productCommissionPercentage: float
  freightCommissionPercentage: float
  isActive: boolean
}

interface Paging {
  total: number
}

interface Sellers {
  items: Item[]
  paging: Paging
}

interface Data {
  sellers: Sellers
}

interface DataSellers {
  data: Data
}
