import { validationParams } from '../middlewares'
import { findSellerList } from '../middlewares/sellers/findSellerList'
import { listSellers } from '../middlewares/sellers/listSellers'

export const getSellers = async (
  _: unknown,
  {
    listSellersParams,
  }: {
    listSellersParams?: any
  },
  ctx: Context
): Promise<ResultSearchSellerList> => {
  let result: any = ''

  const respsellers = await listSellers(ctx)

  result = respsellers

  console.info('aca llegue')
  console.info({ listSellersParams })

  if (listSellersParams) {
    await validationParams('ListSellers', listSellersParams)

    const { sellersId, page, pageSize } = listSellersParams

    if (sellersId) {
      const searchSellerId = findSellerList(respsellers, sellersId)

      const searchResult: ResultSearchSellerList = {
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
      const sellersDashboardOffset = respsellers.items.slice(
        initialOffset,
        page * pageSize
      )

      const totalPage = Math.ceil(respsellers.items.length / pageSize)

      const searchResult: ResultSearchSellerList = {
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
    const searchResult: ResultSearchSellerList = {
      sellers: respsellers.items,
      pagination: {
        currentPage: 1,
        pageSize: 1,
        totalPage: respsellers.items.length,
      },
    }

    result = searchResult
  }

  return result
}
