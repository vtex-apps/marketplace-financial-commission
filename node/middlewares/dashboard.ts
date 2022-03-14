/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function GenerateDashboard(
  ctx: Context,
  next: () => Promise<Dashboard>
) {
  const {
    clients: { sellersIO, ordersClient },
  } = ctx

  const val = (v: number) => v / 100
  const respsellers = await sellersIO.getSellers()
  const sellersDashboard: SellersDashboard[] = []

  await Promise.all(
    respsellers.items.map(async (item) => {
      const dateInvoiced = getDatesInvoiced()
      const page = 1

      const orderList = await ordersClient.listOrders(
        dateInvoiced.invoicedDateInit,
        dateInvoiced.invoicedDateEnd,
        page,
        item.name
      )

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

      const statsTotal: StatsSeller[] = []

      statsTotal.push(statsOrder)

      const sellersComission: SellersDashboard = {
        id: item.id,
        name: item.name,
        account: item.account,
        stats: statsTotal,
      }

      sellersDashboard.push(sellersComission)
    })
  )

  const countOrders = sellersDashboard.reduce(
    (total, x) => (total += x.stats[0].countOrders),
    0
  )

  const totalComission = sellersDashboard.reduce(
    (total, x) => (total += x.stats[0].totalComission),
    0
  )

  const totalValueOrder = sellersDashboard.reduce(
    (total, x) => (total += x.stats[0].totalValueOrder),
    0
  )

  const dateInvoi = new Date(new Date().setDate(new Date().getDate() - 1))

  const dashboard: Dashboard = {
    sellers: sellersDashboard,
    stats: {
      countOrders,
      dateInvoiced: dateInvoi.toISOString().split('T')[0],
      totalComission,
      totalValueOrder,
    },
  }

  ctx.status = 200
  ctx.body = dashboard
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}

function getDatesInvoiced(): DatesInvoice {
  const date = new Date()
  const firstDateMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const yesterdayDateMonth = new Date(
    new Date().setDate(new Date().getDate() - 1)
  )

  return {
    invoicedDateInit: firstDateMonth.toISOString(),
    invoicedDateEnd: yesterdayDateMonth
      .toISOString()
      .split('T')[0]
      .concat('T23:59:59.999Z'),
  }
}
