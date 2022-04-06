import { validationParams } from '../middlewares/validationParams'
import { searchSellersService } from '../services/searchSellersService'

export const searchSellersDashboard = async (
  _: unknown,
  {
    searchDashboardParams,
  }: {
    searchDashboardParams: any
  },
  ctx: Context
): Promise<ResultSearch> => {
  await validationParams('Sellers', searchDashboardParams)
  const { result } = await searchSellersService(searchDashboardParams, ctx)

  return result
}
