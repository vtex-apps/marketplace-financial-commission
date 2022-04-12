import { method } from '@vtex/api'

import { generate } from './middlewares/dashboard/generate/generate'
import { searchSellers } from './middlewares/dashboard/search/searchSellers'
import { searchStatistics } from './middlewares/dashboard/search/searchStatistics'
import { sellers } from './middlewares/sellers/sellers'
import { sellersResponse } from './middlewares/sellers/sellersresponse'
import { orders } from './middlewares/orders/orders'
import {
  getInvoice,
  invoicesBySeller,
  generateInvoices,
} from './middlewares/invoice'
import { templateMethod } from './middlewares/template/template'

const template = templateMethod

const routes = {
  sellers: method({
    GET: [sellers, sellersResponse],
  }),
  generateDashboard: method({
    GET: [sellers, generate],
  }),
  searchSellersDashboard: method({
    GET: [searchSellers],
  }),
  searchStatisticsDashboard: method({
    GET: [searchStatistics],
  }),
  singleInvoice: method({
    GET: [getInvoice],
    /* POST: [createInvoice],
    DELETE: [deleteInvoice], */
  }),
  template: method({
    GET: [template],
  }),
  invoicesBySeller: method({
    GET: [invoicesBySeller],
  }),
  generateInvoices: method({
    GET: [generateInvoices],
  }),
  orders: method({
    GET: [orders],
  }),
}

export { routes }
