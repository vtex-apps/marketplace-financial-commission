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
    /**
     * @todo cuidado! Hay 2 interfaces con el nombre Item, hay que ser mas especificos
     */
    items: Item[]
    paging: Paging
  }

  interface SellerInvoice extends Item, SellerSettings {
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
    nextCycle: string
    startCycle: string
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
}

export {}
