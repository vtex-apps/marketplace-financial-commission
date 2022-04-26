import { config } from '../constants'
import { calculateSellersSearch } from '../middlewares/dashboard/search/calculateSellersSearch'
import { findSeller } from '../middlewares/dashboard/search/findSeller'
import { unificationSellers } from '../middlewares/dashboard/search/unificationSellers'

export const searchSellersService = async (
  searchDashboardParams: SearchSellersServiceRequest,
  ctx: Context
) => {
  const {
    clients: { sellersDashboardClientMD, vbase },
  } = ctx

  const pagination = {
    page: 1,
    pageSize: 100,
  }

  const { dateStart, dateEnd, sellersId, page, pageSize } =
    searchDashboardParams

  const vbaseId = `${dateStart.replace('-', '').replace('-', '')}-${dateEnd
    .replace('-', '')
    .replace('-', '')}`

  let result: any = ''
  let vbaseResponse: any | null = null
  let vbaseSellers: SellersDashboard[] | null = null

  try {
    vbaseResponse = await vbase.getRawJSON<Dashboards>(
      config.BUCKET_VBASE,
      vbaseId
    )

    const sellerDashboardVbase: Dashboards = vbaseResponse.data

    vbaseSellers = sellerDashboardVbase.sellers
  } catch (error) {
    console.info('No exist data')
  }

  if (vbaseResponse === null || vbaseSellers?.length === 0) {
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

    if (sellersId) {
      const searchSellerId = findSeller(dashboard, sellersId)

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

    if (sellersId) {
      const searchSellerId = findSeller(sellerDashboardVbase, sellersId)

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

  return { status: 200, result }
}
