/* eslint-disable @typescript-eslint/restrict-plus-operands */
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

  const ordersCount = Number(
    statisticsArray
      .reduce((total, count) => (total += count.statistics.ordersCount), 0)
      .toFixed(2)
  ) as number

  const totalComission = Number(
    statisticsArray
      .reduce((total, comis) => (total += comis.statistics.totalComission), 0)
      .toFixed(2)
  )

  const totalOrderValue = Number(
    statisticsArray
      .reduce((total, value) => (total += value.statistics.totalOrderValue), 0)
      .toFixed(2)
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
