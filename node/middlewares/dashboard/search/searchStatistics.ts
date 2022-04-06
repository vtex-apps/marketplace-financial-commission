import { searchStatisticsService } from '../../../services/searchStatisticsService'
import { validationParams } from '../../validationParams'

import { validationParams } from '../../validationParams'

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function searchStatistics(ctx: Context, next: () => Promise<any>) {
  const dateStart = ctx.query.dateStart as string
  const dateEnd = ctx.query.dateEnd as string

  await validationParams('Statistics', ctx.query)

  const searchStatsParms = { dateStart, dateEnd }

  const { status, statisticsDashboard } = await searchStatisticsService(
    ctx,
    searchStatsParms
  )

  ctx.status = status
  ctx.body = statisticsDashboard
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
