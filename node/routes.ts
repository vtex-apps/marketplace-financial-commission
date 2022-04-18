import { method } from '@vtex/api'

import {
  generate,
  searchSellers,
  searchStatistics,
  sellers,
  sellersResponse,
  orders,
  resolveInvoice,
  invoicesBySeller,
  generateInvoices,
  errorHandler,
  eligibleSellers,
} from './middlewares'
import { createTokenAuth } from './middlewares/authentication/createTokenAuth'
import { seller } from './middlewares/sellers/seller'
import { authentication } from './middlewares/authentication/authentication'
import { updateToken } from './middlewares/authentication/updateToken'
import { getToken } from './middlewares/authentication/getToken'

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
    GET: [resolveInvoice],
    POST: [resolveInvoice],
    DELETE: [resolveInvoice],
  }),
  invoicesBySeller: method({
    GET: [invoicesBySeller],
  }),
  generateInvoices: method({
    GET: [errorHandler, eligibleSellers, generateInvoices],
  }),
  orders: method({
    POST: [seller, authentication, orders],
  }),
  token: method({
    POST: [seller, createTokenAuth],
    PUT: [seller, updateToken],
    GET: [seller, getToken],
  }),
}

export { routes }
