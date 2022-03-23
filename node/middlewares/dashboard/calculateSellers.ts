import { getDatesInvoiced } from '../../utils'

interface CalculateSellers {
  sellersDashboard: SellersDashboard[]
  stats: StatsSeller
}

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function CalculateSellers(
  ctx: Context,
  respsellers: Sellers
): Promise<CalculateSellers> {
  const {
    clients: { ordersClient },
  } = ctx

  const sellersDashboard: SellersDashboard[] = []

  const val = (v: number) => v / 100
  const dateInvoiced = getDatesInvoiced()
  let ordersCountStats = 0
  let totalComissionStats = 0
  let totalOrderValueStats = 0

  await Promise.all(
    respsellers.items.map(async (item) => {
      const page = 1

      const orderListIni = await ordersClient.listOrders({
        fStatus: 'invoice,invoiced',
        fieldDate: 'invoicedDate',
        fieldDateStart: dateInvoiced.dateInvoiceInitial,
        fieldDateEnd: dateInvoiced.dateInvoiceEnd,
        sellerName: item.name,
        orderBy: 'invoicedDate',
        page,
      })

      const allOrders = []
      const pagesOrder = []

      for (let index = 0; index <= orderListIni.paging.pages; index++) {
        pagesOrder.push(index)
      }

      for (const pages of pagesOrder) {
        allOrders.push(
          ordersClient.listOrders({
            fStatus: 'invoice,invoiced',
            fieldDate: 'invoicedDate',
            fieldDateStart: dateInvoiced.dateInvoiceInitial,
            fieldDateEnd: dateInvoiced.dateInvoiceEnd,
            sellerName: item.name,
            orderBy: 'invoicedDate',
            page: pages,
          })
        )
      }

      const orderList = await Promise.all(allOrders)

      const comissions = await Promise.all(
        orderList[0].list.map(async (order) => {
          const orderData = await ordersClient.getOrder(order.orderId)

          const totalComission = orderData.items.reduce(
            (total, x) =>
              total +
              (val(x.price) * val(val(x.commission)) +
                val(x.shippingPrice ?? 0) * val(val(x.freightCommission ?? 0))),
            0
          )

          const totalOrderValue = orderData.items.reduce(
            (total, x) => (total += val(x.price)),
            0
          )

          const lines: OrderComission = {
            orderId: order.orderId,
            totalComission,
            totalOrderValue,
          }

          return lines
        })
      )

      const ordersCount = comissions.length
      const totalComission = comissions.reduce(
        (total, comis) => (total += comis.totalComission),
        0
      )

      const totalValueOrder = comissions.reduce(
        (total, value) => (total += value.totalOrderValue),
        0
      )

      const statsOrder: StatsSeller = {
        dateInvoiced: dateInvoiced.formattedDate,
        ordersCount,
        totalComission,
        totalOrderValue: totalValueOrder,
      }

      const sellersComission: SellersDashboard = {
        id: item.id,
        name: item.name,
        account: item.account ?? '',
        stats: statsOrder,
      }

      ordersCountStats += ordersCount
      totalComissionStats += totalComission
      totalOrderValueStats += totalValueOrder

      sellersDashboard.push(sellersComission)
    })
  )

  const responseCalculateDashboard: CalculateSellers = {
    sellersDashboard,
    stats: {
      ordersCount: ordersCountStats,
      totalComission: totalComissionStats,
      totalOrderValue: totalOrderValueStats,
    },
  }

  return responseCalculateDashboard
}
