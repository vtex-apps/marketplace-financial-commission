import { validationParams } from '../validationParams'
import { orderDetailCommission } from './orderDetailCommission'
import { orderListSeller } from './orderListSeller'

export async function orders(ctx: Context, next: () => Promise<Sellers>) {
  const {
    query: { sellerName, dateStart, dateEnd, page, perpage },
  } = ctx

  await validationParams('Orders', ctx.query)

  const listOrders = await orderListSeller(
    ctx,
    sellerName,
    dateStart,
    dateEnd,
    page,
    perpage
  )

  const ordersDetailCommission = await orderDetailCommission(ctx, listOrders)

  const resultDetail = {
    data: ordersDetailCommission,
    paging: listOrders.paging,
  }

  ctx.status = 200
  ctx.body = resultDetail
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
