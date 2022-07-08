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
  policy,
  createInvoiceExternal,
  getInvoiceExternal,
} from './middlewares'
import { createTokenAuth } from './middlewares/authentication/createTokenAuth'
import { seller } from './middlewares/sellers/seller'
import { authentication } from './middlewares/authentication/authentication'
import { updateToken } from './middlewares/authentication/updateToken'
import { getToken } from './middlewares/authentication/getToken'
import { generate } from './middlewares/dashboard/generate/generate'
import { validateParamsExternal } from './middlewares/invoiceExternal/validateParamsExternal'
import { getTypeIntegration } from './middlewares/typeIntegration/getTypeIntegration'
import { deleteInvoiceExternal } from './middlewares/invoiceExternal/deleteInvoiceExternal'
import { updateInvoiceExternal } from './middlewares/invoiceExternal/updateInvoiceExternal'

const template = templateMethod

const routes = {
  mail: method({
    POST: [sendMail],
  }),
  _mail: method({
    POST: [sendMail],
  }),
  sellers: method({
    GET: [sellers, sellersResponse],
  }),
  template: method({
    GET: [template],
  }),
  _template: method({
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
    GET: [seller, authentication, resolveInvoice],
    POST: [seller, authentication, resolveInvoice],
    DELETE: [seller, authentication, resolveInvoice],
    PATCH: [seller, authentication, resolveInvoice],
  }),
  _singleInvoice: method({
    GET: [seller, policy, resolveInvoice],
    POST: [seller, policy, resolveInvoice],
  }),
  invoicesBySeller: method({
    POST: [seller, authentication, invoicesBySeller],
  }),
  _invoicesBySeller: method({
    POST: [seller, policy, invoicesBySeller],
  }),
  generateInvoices: method({
    GET: [errorHandler, eligibleSellers, generateInvoices],
  }),
  orders: method({
    GET: [seller, authentication, orders],
  }),
  _orders: method({
    GET: [seller, policy, orders],
  }),
  token: method({
    POST: [seller, createTokenAuth],
    PUT: [seller, updateToken],
    GET: [seller, getToken],
  }),
  invoiceExternal: method({
    POST: [validateParamsExternal, createInvoiceExternal],
    GET: [getInvoiceExternal],
    DELETE: [validateParamsExternal, deleteInvoiceExternal],
    PATCH: [validateParamsExternal, updateInvoiceExternal],
  }),
  typeIntegration: method({
    GET: [getTypeIntegration],
  }),
}

export { routes }
