import { method } from '@vtex/api'

import { generate } from './middlewares/dashboard/generate'
import { searchSellers } from './middlewares/dashboard/searchSellers'
import { searchStatistics } from './middlewares/dashboard/searchStatistics'
import { sellers } from './middlewares/sellers/sellers'
import { sellersResponse } from './middlewares/sellers/sellersresponse'
import {
  getInvoice,
  invoicesBySeller,
  generateInvoices,
} from './middlewares/invoice'

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
  invoicesBySeller: method({
    GET: [invoicesBySeller],
  }),
  generateInvoices: method({
    GET: [generateInvoices],
  }),
}

export { routes }
