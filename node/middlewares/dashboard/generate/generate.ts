/* eslint-disable no-await-in-loop */
import type {
  SellersDashboard,
  StatisticsDashboard,
} from 'vtex.marketplace-financial-commission'

import { getDatesInvoiced } from '../../../utils'
import { calculateSellers } from './calculateSellers'

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function generate(ctx: Context, next: () => Promise<Dashboards>) {
  const {
    state: {
      body: { sellers },
    },
    clients: { sellersDashboardClientMD, statisticsDashboardClientMD },
  } = ctx

  const getDates = getDatesInvoiced()
  const dateCut = getDates.formattedDate

  const responseCalculateSellers = await calculateSellers(ctx, sellers)

  const {
    sellersDashboard,
    statistics: { ordersCount, totalComission, totalOrderValue },
  } = responseCalculateSellers

  const dashboard: SellersDashboard = {
    dateCut,
    sellers: sellersDashboard as [],
  }

  const dashboardWithId = {
    id: `DSH-${ctx.vtex.account}-${getDates.formattedDate}`,
    ...dashboard,
  }

  const dashboardSaveMD = await sellersDashboardClientMD.saveOrUpdate(
    dashboardWithId
  )

  const statsGeneral: StatisticsDashboard = {
    dateCut,
    statistics: {
      ordersCount,
      totalComission,
      totalOrderValue,
    },
  }

  const dashboardstatsWithId = {
    id: `DSH-Statistics-${ctx.vtex.account}-${getDates.formattedDate}`,
    ...statsGeneral,
  }

  let responseStatistics

  try {
    responseStatistics = await statisticsDashboardClientMD.saveOrUpdate(
      dashboardstatsWithId
    )
  } catch (error) {
    responseStatistics = '304 Not Modified'
  }

  const responseGenerateDashboard = {
    Sellers: dashboardSaveMD,
    Statistics: responseStatistics,
  }

  ctx.status = 200
  ctx.body = responseGenerateDashboard
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
