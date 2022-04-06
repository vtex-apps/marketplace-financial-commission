import { validationParams } from '../middlewares/validationParams'
import { searchOrdersService } from '../services/searchOrdersService'

export const orders = async (
  _: unknown,
  {
    searchOrdersParams,
  }: {
    searchOrdersParams: any
  },
  ctx: Context
): Promise<OrdersResponse> => {
  console.info({ searchOrdersParams })
  await validationParams('Orders', searchOrdersParams)
  const { resultDetail } = await searchOrdersService(searchOrdersParams, ctx)

  return resultDetail
}
