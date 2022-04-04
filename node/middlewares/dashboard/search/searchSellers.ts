import { config } from '../../../constants'
import { validationParams } from '../../validationParams'
import { calculateSellersSearch } from './calculateSellersSearch'
import { findSeller } from './findSeller'
import { unificationSellers } from './unificationSellers'

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function searchSellers(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { sellersDashboardClientMD, vbase },
    query: { dateStart, dateEnd, sellerId, page, pageSize },
  } = ctx

  await validationParams('Sellers', ctx.query)

  const pagination = {
    page: 1,
    pageSize: 100,
  }

  console.info(sellerId)

  const vbaseId = `${dateStart.replace('-', '').replace('-', '')}-${dateEnd
    .replace('-', '')
    .replace('-', '')}`

  let result: any = ''
  let vbaseResponse: any | null = null

  try {
    vbaseResponse = await vbase.getRawJSON<Dashboards>(
      config.BUCKET_VBASE,
      vbaseId
    )

    result = vbaseResponse.data
  } catch (error) {
    console.info('No exist data')
  }

  if (vbaseResponse === null) {
    const dashboardResponse = await sellersDashboardClientMD.search(
      pagination,
      ['_all'],
      'createdIn',
      `dateCut between ${dateStart} AND ${dateEnd}`
    )

    const unificationResponse = await unificationSellers(dashboardResponse)

    const calculateSellers = await calculateSellersSearch(unificationResponse)

    const dashboard: Dashboards = {
      dateStart,
      dateEnd,
      sellers: calculateSellers,
    }

    const responseSaveVbase = await vbase.saveJSON<Dashboards>(
      config.BUCKET_VBASE,
      vbaseId,
      dashboard
    )

    result = {
      message: 'Save to VBase',
      responseSaveVbase,
    }

    console.info({ responseSaveVbase: JSON.stringify(result) })

    if (sellerId) {
      const searchSellerId = findSeller(dashboard, sellerId)

      const searchResult: ResultSearch = {
        dateStart,
        dateEnd,
        sellers: searchSellerId,
        pagination: {
          currentPage: 1,
          pageSize: 1,
          totalPage: 1,
        },
      }

      result = searchResult
    } else {
      const initialOffset = (page - 1) * pageSize
      const sellersDashboardOffset = dashboard.sellers.slice(
        initialOffset,
        page * pageSize
      )

      const totalPage = Math.round(dashboard.sellers.length / pageSize + 1)

      const searchResult: ResultSearch = {
        dateStart,
        dateEnd,
        sellers: sellersDashboardOffset,
        pagination: {
          currentPage: page,
          pageSize,
          totalPage,
        },
      }

      result = searchResult
    }
  } else {
    const sellerDashboardVbase: Dashboards = vbaseResponse.data

    if (sellerId) {
      const searchSellerId = findSeller(sellerDashboardVbase, sellerId)

      result = {
        dateStart,
        dateEnd,
        sellers: searchSellerId,
        pagination: {
          currentPage: 1,
          pageSize: 1,
          totalPage: 1,
        },
      }
    } else {
      const initialOffset = (page - 1) * pageSize
      const sellersDashboardOffset = sellerDashboardVbase.sellers.slice(
        initialOffset,
        page * pageSize
      )

      const totalPage = Math.round(
        sellerDashboardVbase.sellers.length / pageSize + 1
      )

      result = {
        dateStart,
        dateEnd,
        sellers: sellersDashboardOffset,
        pagination: {
          currentPage: page,
          pageSize,
          totalPage,
        },
      }
    }
  }

  ctx.status = 200
  ctx.body = result
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
