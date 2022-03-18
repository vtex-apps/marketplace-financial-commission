import type { Dashboard } from 'vtex.marketplace-financial-commission'

import { CalculateSellers } from './calculateSellers'

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function GenerateDashboard(
  ctx: Context,
  next: () => Promise<Dashboards>
) {
  const {
    clients: { sellersIO, dashboardClientMD },
  } = ctx

  const respsellers = await sellersIO.getSellers()

  const sellersDashboard = await CalculateSellers(ctx, respsellers)

  const countOrders = sellersDashboard.reduce(
    (total, x) => (total += x.stats.countOrders),
    0
  )

  const totalComission = sellersDashboard.reduce(
    (total, x) => (total += x.stats.totalComission),
    0
  )

  const totalValueOrder = sellersDashboard.reduce(
    (total, x) => (total += x.stats.totalValueOrder),
    0
  )

  const dateInvoi = new Date(new Date().setDate(new Date().getDate() - 1))

  const dashboard: Dashboard = {
    dateCut: dateInvoi.toISOString().split('T')[0],
    sellers: sellersDashboard as [],
    stats: {
      countOrders,
      dateInvoiced: dateInvoi.toISOString().split('T')[0],
      totalComission,
      totalValueOrder,
    },
  }

  const dashboardWithId = {
    id: `DSH-${ctx.vtex.account}-${dateInvoi.toISOString().split('T')[0]}`,
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
