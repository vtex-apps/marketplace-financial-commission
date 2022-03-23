import type { Dashboard } from 'vtex.marketplace-financial-commission'

import { getDatesInvoiced } from '../../utils'
import { CalculateSellers } from './calculateSellers'

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function GenerateDashboard(
  ctx: Context,
  next: () => Promise<Dashboards>
) {
  const {
    clients: { sellersIO, dashboardClientMD },
  } = ctx

  const getDates = getDatesInvoiced()
  const dateCut = getDates.formattedDate

  const respsellers = await sellersIO.getSellers()

  const responseCalculateSellers = await CalculateSellers(ctx, respsellers)

  const {
    sellersDashboard,
    stats: { ordersCount, totalComission, totalOrderValue },
  } = responseCalculateSellers

  const sellers = sellersDashboard as []

  const dashboard: Dashboard = {
    dateCut,
    sellers,
    stats: {
      ordersCount,
      dateInvoiced: getDates.formattedDate,
      totalComission,
      totalOrderValue,
    },
  }

  const dashboardWithId = {
    id: `DSH-${ctx.vtex.account}-${getDates.formattedDate}`,
    ...dashboard,
  }

  const dashboardResponse = await dashboardClientMD.saveOrUpdate(
    dashboardWithId
  )

  ctx.status = 200
  ctx.body = dashboardResponse
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
