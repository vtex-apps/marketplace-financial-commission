/* eslint-disable no-await-in-loop */
import type {
  SellersDashboard,
  StatisticsDashboard,
} from 'vtex.marketplace-financial-commission'

import { createKeyToken, getDatesInvoiced, numberOfDays } from '../../../utils'
import { validationParams } from '../../validationParams'
import { calculateSellers } from './calculateSellers'

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function generate(ctx: Context, next: () => Promise<Dashboards>) {
  const {
    state: {
      body: { sellers },
    },
    clients: { sellersDashboardClientMD, statisticsDashboardClientMD },
    vtex: { logger },
  } = ctx

  const start = ctx.query.dateStart as string
  const end = ctx.query.dateEnd as string

  await validationParams('Generate', ctx.query)

  const numDays = numberOfDays(new Date(start), new Date(end))

  console.info(`Number Days-------> ${numDays}`)

  const processGenerate = async () => {
    try {
      const getDates = getDatesInvoiced({
        start,
        end,
      })

      let loop = new Date(getDates.dateInvoiceInitial)
      const endLoop = new Date(getDates.dateInvoiceEnd)
      const responseSellersMD = []
      const responseStatisticsMD = []

      // eslint-disable-next-line no-console
      console.time('generateLoop')
      while (loop <= endLoop) {
        const [dayToProcess] = loop.toISOString().split('T')
        const dateRange: DateRange = {
          start: dayToProcess,
          end: dayToProcess,
        }

        const responseCalculateSellers = await calculateSellers(
          ctx,
          sellers,
          dateRange
        )

        const {
          sellersDashboard,
          statistics: {
            ordersCount,
            totalComission,
            totalOrderValue,
            totalDiscounts,
            totalOrdersItems,
            totalShipping,
            totalTax,
          },
        } = responseCalculateSellers

        const dashboard: SellersDashboard = {
          dateCut: dayToProcess,
          sellers: sellersDashboard as [],
          idGenerate: createKeyToken(),
        }

        const dashboardWithId = {
          id: `DSH-${ctx.vtex.account}-${dayToProcess}`,
          ...dashboard,
        }

        const dashboardSaveMD = await sellersDashboardClientMD.saveOrUpdate(
          dashboardWithId
        )

        responseSellersMD.push(dashboardSaveMD)

        const statsGeneral: StatisticsDashboard = {
          dateCut: dayToProcess,
          statistics: {
            ordersCount,
            totalComission,
            totalOrderValue,
            totalDiscounts,
            totalOrdersItems,
            totalShipping,
            totalTax,
          },
          idStatistics: createKeyToken(),
        }

        const dashboardstatsWithId = {
          id: `DSH-Statistics-${ctx.vtex.account}-${dayToProcess}`,
          ...statsGeneral,
        }

        let responseStats

        try {
          responseStats = await statisticsDashboardClientMD.saveOrUpdate(
            dashboardstatsWithId
          )
          responseStatisticsMD.push(responseStats)
        } catch (err) {
          const error = err as any
          const { message, status, payload } = error

          responseStats = { message, status, payload }

          responseStatisticsMD.push(responseStats)
        }

        const newDate = loop.setDate(loop.getDate() + 1)

        loop = new Date(newDate)
      }

      const responseGenerateDashboard = {
        Sellers: responseSellersMD,
        Statistics: responseStatisticsMD,
      }

      // eslint-disable-next-line no-console
      console.timeEnd('generateLoop')
      console.info('Process completed')

      logger.info({
        message: 'Process completed',
        data: `dateStart: ${start} - dateEnd: ${end}`,
      })

      return responseGenerateDashboard
    } catch (error) {
      logger.error({
        message: `Error while completing the process ----> ${error} `,
        data: `dateStart: ${start} - dateEnd: ${end}`,
      })
      throw error
    }
  }

  if (numDays > 5) {
    processGenerate()
    ctx.status = 200
    ctx.body = {
      message: 'We are processing your request, please validate in 15 minutes.',
    }
    ctx.set('Cache-Control', 'no-cache ')
    await next()
  } else {
    ctx.status = 200
    ctx.body = await processGenerate() // responseGenerateDashboard
    ctx.set('Cache-Control', 'no-cache ')
    await next()
  }
}
