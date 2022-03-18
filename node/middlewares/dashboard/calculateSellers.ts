import { getDatesInvoiced } from '../../utils'

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function CalculateSellers(
  ctx: Context,
  respsellers: Sellers
): Promise<SellersDashboard[]> {
  const {
    clients: { ordersClient },
  } = ctx

  const sellersDashboard: SellersDashboard[] = []

  const val = (v: number) => v / 100

  await Promise.all(
    respsellers.items.map(async (item) => {
      const dateInvoiced = getDatesInvoiced()
      const page = 1

      const orderList = await ordersClient.listOrders({
        f_status: 'invoice,invoiced',
        fieldDate: 'invoicedDate',
        fieldDateIni: dateInvoiced.invoicedDateInit,
        fieldDateEnd: dateInvoiced.invoicedDateEnd,
        sellerName: item.name,
        orderBy: 'invoicedDate',
        page,
      })

      const comissions = await Promise.all(
        orderList.list.map(async (order) => {
          const orderData = await ordersClient.getOrder(order.orderId)

          const totalComission = orderData.items.reduce(
            (total, x) =>
              total +
              (val(x.price) * val(val(x.commission)) +
                val(x.shippingPrice ?? 0) * val(val(x.freightCommission ?? 0))),
            0
          )

          const totalValueOrder = orderData.items.reduce(
            (total, x) => (total += val(x.price)),
            0
          )

          const lines: OrderComission = {
            orderId: order.orderId,
            totalComission,
            totalValueOrder,
          }

          return lines
        })
      )

      const dateInvoi = new Date(new Date().setDate(new Date().getDate() - 1))
      const countOrders = comissions.length
      const totalComission = comissions.reduce(
        (total, comis) => (total += comis.totalComission),
        0
      )

      const totalValueOrder = comissions.reduce(
        (total, value) => (total += value.totalValueOrder),
        0
      )

      const statsOrder: StatsSeller = {
        dateInvoiced: dateInvoi.toISOString().split('T')[0],
        countOrders,
        totalComission,
        totalValueOrder,
      }

      const sellersComission: SellersDashboard = {
        id: item.id,
        name: item.name,
        account: item.account ?? '',
        stats: statsOrder,
      }

      sellersDashboard.push(sellersComission)
    })
  )

  return sellersDashboard
}
