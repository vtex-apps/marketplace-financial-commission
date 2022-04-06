import type { StatisticsDashboard } from 'vtex.marketplace-financial-commission'

export const searchStatisticsService = async (
  ctx: Context,
  searchStatsDashboardParams: SearchStatsServiceRequest
) => {
  const {
    clients: { statisticsDashboardClientMD },
  } = ctx

  const { dateStart, dateEnd } = searchStatsDashboardParams

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

  const statisticsDashboard: StatisticsGeneralDashboard = {
    dateStart,
    dateEnd,
    statistics,
  }

  return { status: 200, statisticsDashboard }
}
