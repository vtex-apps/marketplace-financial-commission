import { createToken } from './createToken'
import { editToken } from './editToken'
import { invoicesBySeller, getInvoice, createInvoice } from './invoice'
import { getSellers } from './getSellers'
import { getToken } from './getToken'
import { orders } from './orders'
import { searchSellersDashboard } from './searchSellersDashboard'
import { searchStatisticsDashboard } from './searchStatisticsDashboard'
import { createSettings } from './createSettings'
import { getSettings } from './getSettings'

export const queries = {
  getSellers,
  searchSellersDashboard,
  searchStatisticsDashboard,
  orders,
  getToken,
  invoicesBySeller,
  getInvoice,
  getSettings,
}

export const mutations = {
  createToken,
  editToken,
  createInvoice,
  createSettings,
}
