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

  interface ItemSeller {
    id: string
    name: string
    account: string
    productCommissionPercentage: number
    freightCommissionPercentage: number
    isActive: boolean
  }

  interface PagingSellers {
    total?: number
    from?: number
    to?: number
  }

  interface Sellers {
    items: ItemSeller[]
    paging: PagingSellers
  }

  interface SellerListParams {
    pagination?: PagingSellers
    sellerId?: string
  }

  interface SellerInvoice extends ItemSeller, SellerSettings {
    email: string
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
    sellersId?: string
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

  interface Settings {
    billingCycle: string
    endDate: string
    startDate: string
  }

  interface SellerSettings extends Settings {
    email: string
  }

  type FullFilledResult = {
    status: 'fullfilled'
    value: any
  }

  type RejectResult = {
    status: 'rejected'
    reason: string
  }

  type PromiseResult = RejectResult | FullFilledResult

  interface ResponseCreateToken {
    message: string
    sellerId: string
    autheticationToken?: string
    creationDate?: string
    resultVBase: any
  }

  interface RequestUpdateToken {
    enabled: boolean
  }

  interface ResponseUpdateToken extends ResponseCreateToken {
    lastModificationDate: string
  }

  interface DateRange {
    start: string
    end: string
  }

  interface ResultSearchSellerList {
    sellers: ItemSeller[]
    pagination: Pagination
  }
}

export {}
