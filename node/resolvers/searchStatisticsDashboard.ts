import { validationParams } from '../middlewares/validationParams'
import { searchStatisticsService } from '../services/searchStatisticsService'

export const searchStatisticsDashboard = async (
  _: unknown,
  {
    searchStatsDashboardParams,
  }: {
    searchStatsDashboardParams: any
  },
  ctx: Context
): Promise<StatisticsGeneralDashboard> => {
  await validationParams('Statistics', searchStatsDashboardParams)

  const { statisticsDashboard } = await searchStatisticsService(
    ctx,
    searchStatsDashboardParams
  )

  return statisticsDashboard
}
