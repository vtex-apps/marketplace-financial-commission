import { createToken } from './createToken'
import { editToken } from './editToken'
import { getSellers } from './getSellers'
import { getToken } from './getToken'
import { orders } from './orders'
import { searchSellersDashboard } from './searchSellersDashboard'
import { searchStatisticsDashboard } from './searchStatisticsDashboard'

export const queries = {
  getSellers,
  searchSellersDashboard,
  searchStatisticsDashboard,
  orders,
  getToken,
}

export const mutations = {
  createToken,
  editToken,
}
