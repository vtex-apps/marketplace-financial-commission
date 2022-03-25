import type {
  SellersDashboard,
  // StatisticsDashboard,
} from 'vtex.marketplace-financial-commission'

import { getDatesInvoiced } from '../../utils'
import { calculateSellers } from './calculateSellers'

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function generate(ctx: Context, next: () => Promise<Dashboards>) {
  const {
    state: {
      body: { sellers },
    },
  } = ctx

  const getDates = getDatesInvoiced()
  const dateCut = getDates.formattedDate

  const responseCalculateSellers = await calculateSellers(ctx, sellers)

  const {
    sellersDashboard,
    // stats: { ordersCount, totalComission, totalOrderValue },
  } = responseCalculateSellers

  const dashboard: SellersDashboard = {
    dateCut,
    sellers: sellersDashboard as [],
  }

  // const statsGeneral: StatisticsDashboard = {
  //   dateCut,
  //   statistics: {
  //     ordersCount,
  //     totalComission,
  //     totalOrderValue,
  //   },
  // }

  // const dashboardWithId = {
  //   id: `DSH-${ctx.vtex.account}-${getDates.formattedDate}`,
  //   ...dashboard,
  // }

  // const dashboardResponse = await dashboardClientMD.saveOrUpdate(
  //   dashboardWithId
  // )

  ctx.status = 200
  ctx.body = dashboard // dashboardResponse
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
