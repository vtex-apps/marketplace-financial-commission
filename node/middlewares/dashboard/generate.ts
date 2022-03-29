/* eslint-disable no-await-in-loop */
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
    clients: { sellersDashboardClientMD },
  } = ctx

  const getDates = getDatesInvoiced()
  const dateCut = getDates.formattedDate

  const responseCalculateSellers = await calculateSellers(ctx, sellers)

  const {
    sellersDashboard,
    // stats: { ordersCount, totalComission, totalOrderValue },
  } = responseCalculateSellers

  // const dashboard: SellersDashboard = {
  //   dateCut,
  //   sellers: sellersDashboard as [],
  // }

  const multiplier = 20
  let page = 1
  let lastSeller = false
  const totalPage = Math.round(sellersDashboard.length / 20 + 1)
  const responseGenerate = []

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

    responseGenerate.push(dashboardSave)

    console.info({ dashboardSave: JSON.stringify(dashboardSave) })

    page++
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
  ctx.body = responseGenerate // dashboardResponse
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
