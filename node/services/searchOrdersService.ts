import { orderDetailCommission } from '../middlewares/orders/orderDetailCommission'
import { orderListSeller } from '../middlewares/orders/orderListSeller'

export const searchOrdersService = async (
  searchOrdersParams: SearchOrdersServiceRequest,
  ctx: Context
) => {
  const { dateStart, dateEnd, sellerName, page, perpage } = searchOrdersParams

  const status = searchOrdersParams.status as string

  console.info(sellerName)

  const listOrders = await orderListSeller(
    ctx,
    sellerName,
    dateStart,
    dateEnd,
    page,
    perpage,
    status
  )

  const ordersDetailCommission = await orderDetailCommission(ctx, listOrders)

  const resultDetail: OrdersResponse = {
    data: ordersDetailCommission,
    paging: listOrders.paging,
  }

  return { status: 200, resultDetail }
}
