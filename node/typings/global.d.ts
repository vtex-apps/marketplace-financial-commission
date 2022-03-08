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

interface Paging {
  total: string
}
