/* eslint-disable no-await-in-loop */
import type {
  SellersDashboard,
  StatisticsDashboard,
} from 'vtex.marketplace-financial-commission'

import { getDatesInvoiced } from '../../utils'
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

  const multiplier = 20
  let page = 1
  let lastSeller = false
  const totalPage = Math.round(sellersDashboard.length / 20 + 1)
  const responseGenerateSellers = []

  while (!lastSeller) {
    const initialOffset = (page - 1) * multiplier
    const sellersDashboardOffset = sellersDashboard.slice(
      initialOffset,
      page * multiplier
    )

    if (sellersDashboardOffset.length === 0) {
      lastSeller = true
      break
    }

    const dashboard: SellersDashboard = {
      dateCut,
      sellers: sellersDashboardOffset as [],
    }

    const dashboardWithId = {
      id: `DSH-${ctx.vtex.account}-${getDates.formattedDate}-Page_${page}to${totalPage}`,
      ...dashboard,
    }

    const dashboardSave = await sellersDashboardClientMD.saveOrUpdate(
      dashboardWithId
    )

    responseGenerateSellers.push(dashboardSave)

    page++
  }

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

  // const responseStatistics = await statisticsDashboardClientMD.saveOrUpdate(
  //   dashboardstatsWithId
  // )

  const responseGenerateDashboard = {
    Sellers: responseGenerateSellers,
    Statistics: responseStatistics,
  }

  ctx.status = 200
  ctx.body = responseGenerateDashboard
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
