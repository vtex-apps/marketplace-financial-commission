interface SellersOrdersDetail {
  sellerId: string
  sellerName: string
  orders: Order[]
  totalComission: float
  totalOrderValue: float
}

interface Order {
  orderId: string
  totalComission: float
  totalOrderValue: float
  status: string
  statusDescription: string
  creationDate: string
  rate: ItemsRate[]
}

interface ItemsRate {
  itemId: string
  nameItem: string
  rate: Rate
}

interface Rate {
  productCommissionPercentage: number
  freightCommissionPercentage: number
}
