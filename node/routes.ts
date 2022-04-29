import { method } from '@vtex/api'

import {
  sendMail,
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
  templateMethod,
} from './middlewares'
import { createTokenAuth } from './middlewares/authentication/createTokenAuth'
import { seller } from './middlewares/sellers/seller'
import { authentication } from './middlewares/authentication/authentication'
import { updateToken } from './middlewares/authentication/updateToken'
import { getToken } from './middlewares/authentication/getToken'
import { generate } from './middlewares/dashboard/generate/generate'

const template = templateMethod

const routes = {
  mail: method({
    POST: [sendMail],
  }),
  sellers: method({
    GET: [sellers, sellersResponse],
  }),
  template: method({
    GET: [template],
  }),
  generateDashboard: method({
    POST: [sellers, generate],
  }),
  searchSellersDashboard: method({
    GET: [searchSellers],
  }),
  searchStatisticsDashboard: method({
    GET: [searchStatistics],
  }),
  singleInvoice: method({
    GET: [authentication, resolveInvoice],
    POST: [resolveInvoice],
    DELETE: [resolveInvoice],
    PATCH: [resolveInvoice],
  }),
  invoicesBySeller: method({
    POST: [authentication, invoicesBySeller],
  }),
  generateInvoices: method({
    GET: [errorHandler, eligibleSellers, generateInvoices],
  }),
  orders: method({
    GET: [seller, authentication, orders],
  }),
  token: method({
    POST: [seller, createTokenAuth],
    PUT: [seller, updateToken],
    GET: [seller, getToken],
  }),
}

export { routes }
