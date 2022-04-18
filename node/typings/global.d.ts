import type { ServiceContext } from '@vtex/api'
import type { Clients } from '../clients'

declare global {
  type Context = ServiceContext<Clients>

  type LoggerMessage = {
    workflowInstance: string
    message: string
    exception?: string
    request?: any
  }

  interface DatesInvoice {
    dateInvoiceInitial: string
    dateInvoiceEnd: string
    formattedDate: string
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
    sellers?: Sellers
    seller?: Seller
  }

  interface Seller {
    id: string
    name: string
    account: string
    isActive: string
  }

  interface DataSellers {
    data: Data
  }

  interface ParamsListOrders {
    fStatus?: string
    fieldDate: string
    fieldDateStart: string
    fieldDateEnd: string
    sellerName: string
    orderBy: string
    page: number
    perpage?: number
  }

  interface SearchSellersServiceRequest {
    dateStart: string
    dateEnd: string
    sellerId?: string
    page: number
    pageSize: number
  }

  interface SearchStatsServiceRequest {
    dateStart: string
    dateEnd: string
  }

  interface SearchOrdersServiceRequest {
    dateStart: string
    dateEnd: string
    sellerName: string
    page: number
    perpage: number
  }
}

export {}
