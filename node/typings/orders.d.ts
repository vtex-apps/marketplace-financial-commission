interface SellersOrdersDetail {
  sellerId: string
  sellerName: string
  orders: Order[]
  totalComission: number
  totalOrderValue: number
}

interface Order {
  orderId: string
  sellerOrderId?: string
  marketplaceOrderId?: string
  totalComission: number
  totalOrderValue: number
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

interface OrdersResponse {
  data: Order[]
  paging: Paging
}
