/* eslint-disable @typescript-eslint/restrict-plus-operands */
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

  const { dateStart, dateEnd, sellersId, page, pageSize, reIndex } =
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

  if (
    vbaseResponse === null ||
    vbaseSellers?.length === 0 ||
    reIndex === true
  ) {
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

    if (calculateSellers.length > 0) {
      const responseSaveVbase = await vbase.saveJSON<Dashboards>(
        config.BUCKET_VBASE,
        vbaseId,
        dashboard
      )

      result = {
        message: 'Save to VBase',
        responseSaveVbase,
      }
    }

    if (sellersId) {
      const searchSellerId = findSeller(dashboard, sellersId)

      const sortSellers = searchSellerId.sort((a, b) =>
        a.id.localeCompare(b.id)
      )

      const ordersCount = sortSellers.reduce(
        (total, comis) => (total += Number(comis.statistics?.ordersCount)),
        0
      )

      const totalComission = sortSellers.reduce(
        (total, comis) => (total += Number(comis.statistics?.totalComission)),
        0
      )

      const totalOrderValue = sortSellers.reduce(
        (total, value) => (total += Number(value.statistics?.totalOrderValue)),
        0
      )

      const searchResult = {
        dateStart,
        dateEnd,
        sellers: sortSellers,
        statistics: {
          ordersCount,
          totalComission,
          totalOrderValue,
        },
        pagination: {
          currentPage: 1,
          pageSize: 1,
          totalPage: 1,
        },
      }

      result = searchResult
    } else {
      const initialOffset = (page - 1) * pageSize

      const sortSellers = dashboard.sellers.sort((a, b) =>
        a.id.localeCompare(b.id)
      )

      const sellersDashboardOffset = sortSellers.slice(
        initialOffset,
        page * pageSize
      )

      const totalPage = Math.ceil(dashboard.sellers.length / pageSize)

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

      const sortSellers = searchSellerId.sort((a, b) =>
        a.id.localeCompare(b.id)
      )

      const ordersCount = sortSellers.reduce(
        (total, comis) => (total += Number(comis.statistics?.ordersCount)),
        0
      )

      const totalComission = sortSellers.reduce(
        (total, comis) => (total += Number(comis.statistics?.totalComission)),
        0
      )

      const totalOrderValue = sortSellers.reduce(
        (total, value) => (total += Number(value.statistics?.totalOrderValue)),
        0
      )

      result = {
        dateStart,
        dateEnd,
        sellers: sortSellers,
        statistics: {
          ordersCount,
          totalComission,
          totalOrderValue,
        },
        pagination: {
          currentPage: 1,
          pageSize: 1,
          totalPage: 1,
        },
      }
    } else {
      const initialOffset = (page - 1) * pageSize

      const sortSellers = sellerDashboardVbase.sellers.sort((a, b) =>
        a.id.localeCompare(b.id)
      )

      const sellersDashboardOffset = sortSellers.slice(
        initialOffset,
        page * pageSize
      )

      const totalPage = Math.ceil(
        sellerDashboardVbase.sellers.length / pageSize
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
