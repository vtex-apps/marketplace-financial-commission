import { orderDetailCommission } from '../middlewares/orders/orderDetailCommission'
import { orderListSeller } from '../middlewares/orders/orderListSeller'

export const searchOrdersService = async (
  searchOrdersParams: SearchOrdersServiceRequest,
  ctx: Context
) => {
  console.info('acaaaaa voy')
  const { dateStart, dateEnd, sellerName, page, perpage } = searchOrdersParams

  const listOrders = await orderListSeller(
    ctx,
    sellerName,
    dateStart,
    dateEnd,
    page,
    perpage
  )

  const ordersDetailCommission = await orderDetailCommission(ctx, listOrders)

  const resultDetail: OrdersResponse = {
    data: ordersDetailCommission,
    paging: listOrders.paging,
  }

  return { status: 200, resultDetail }
}
