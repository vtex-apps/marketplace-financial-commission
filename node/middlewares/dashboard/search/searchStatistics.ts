import type { StatisticsDashboard } from 'vtex.marketplace-financial-commision'

import { validationParams } from '../../validationParams'

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function searchStatistics(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { statisticsDashboardClientMD },
    query: { dateStart, dateEnd },
  } = ctx

  await validationParams('Statistics', ctx.query)

  const pagination = {
    page: 1,
    pageSize: 100,
  }

  const where = `dateCut between ${dateStart} AND ${dateEnd}`

  const responseSearchMD = await statisticsDashboardClientMD.searchRaw(
    pagination,
    ['dateCut,statistics'],
    'createdIn',
    where
  )

  const statisticsArray = responseSearchMD.data as StatisticsDashboard[]

  const ordersCount = statisticsArray.reduce(
    (total, count) => (total += count.statistics.ordersCount),
    0
  ) as number

  console.info({ ordersCount })

  const totalComission = statisticsArray.reduce(
    (total, comis) => (total += comis.statistics.totalComission),
    0
  )

  const totalOrderValue = statisticsArray.reduce(
    (total, value) => (total += value.statistics.totalOrderValue),
    0
  )

  const statistics: StatsSeller = {
    ordersCount,
    totalComission,
    totalOrderValue,
  }

  const statisticsDashboard = {
    dateStart,
    dateEnd,
    statistics,
  }

  ctx.status = 200
  ctx.body = statisticsDashboard
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
