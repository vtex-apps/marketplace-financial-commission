import { searchSellersService } from '../services/searchSellersService'

export const searchSellersDashboard = async (
  _: unknown,
  {
    dateStart,
    dateEnd,
    sellerId,
    page,
    pageSize,
  }: {
    dateStart: string
    dateEnd: string
    sellerId?: string
    page: number
    pageSize: number
  },
  ctx: Context
): Promise<ResultSearch> => {
  const { result } = await searchSellersService(
    { dateStart, dateEnd, sellerId, page, pageSize },
    ctx
  )

  return result
}
