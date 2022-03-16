import type { Dashboard } from 'vtex.marketplace-financial-commission'

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function GenerateDashboard(
  ctx: Context,
  next: () => Promise<Dashboards>
) {
  const {
    clients: { sellersIO, ordersClient, dashboardClientMD },
  } = ctx

  const val = (v: number) => v / 100
  const respsellers = await sellersIO.getSellers()

  const sellersDashboard: SellersDashboard[] = []

  const getComissions = async (order: List) => {
    const orderData = await ordersClient.getOrder(order.orderId)

    const inputPackages = orderData.packageAttachment.packages.filter(
      (x) => x.type === 'Input'
    )

    let refundValue = 0

    const restitutionsItems = inputPackages.reduce((arr, p) => {
      const restitutions = p?.restitutions?.Refund?.items ?? []

      refundValue = p.restitutions.Refund.value

      return [...arr, ...restitutions]
    }, [] as ItemRefund[])

    const totalComission = orderData.items.reduce((total, x) => {
      const restitution = restitutionsItems.find((f) => f.id === x.id)

      const productComission = val(x.price) * val(val(x.commission))
      const freightCommission =
        val(x.shippingPrice ?? 0) * val(val(x.freightCommission ?? 0))

      const restitutionProductComission =
        val(restitution?.price ?? 0) * val(val(x.commission))

      const restitutionShipping =
        val(refundValue) - val(restitution?.price ?? 0)

      const restitutionFreightCommission =
        restitutionShipping * val(val(x.freightCommission ?? 0))

      const totalSum =
        total +
        (productComission + freightCommission) -
        (restitutionProductComission + restitutionFreightCommission)

      return totalSum
    }, 0)

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
  }

  const calculateSellers = async (item: Item) => {
    const dateInvoiced = getDatesInvoiced()
    const page = 1
    const orderListIni = await ordersClient.listOrders({
      f_status: 'invoice,invoiced',
      fieldDate: 'invoicedDate',
      fieldDateIni: dateInvoiced.invoicedDateInit,
      fieldDateEnd: dateInvoiced.invoicedDateEnd,
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
          f_status: 'invoice,invoiced',
          fieldDate: 'invoicedDate',
          fieldDateIni: dateInvoiced.invoicedDateInit,
          fieldDateEnd: dateInvoiced.invoicedDateEnd,
          sellerName: item.name,
          orderBy: 'invoicedDate',
          page: pages,
        })
      )
    }

    const orderList = await Promise.all(allOrders)

    const comissions = await Promise.all(orderList[0].list.map(getComissions))

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
      account: item.account ?? '',
      stats: statsTotal,
    }

    sellersDashboard.push(sellersComission)
  }

  await Promise.all(respsellers.items.map(calculateSellers))

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
    dateCut: dateInvoi.toISOString().split('T')[0],
    sellers: sellersDashboard as [],
    stats: {
      countOrders,
      dateInvoiced: dateInvoi.toISOString().split('T')[0],
      totalComission,
      totalValueOrder,
    },
  }

  const dashboardWithId = {
    id: `DSH-${ctx.vtex.account}-${dateInvoi.toISOString().split('T')[0]}`,
    ...dashboard,
  }

  const dashboardResponse = await dashboardClientMD.saveOrUpdate(
    dashboardWithId
  )

  ctx.status = 200
  ctx.body = dashboardResponse
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}

function getDatesInvoiced(): DatesInvoice {
  // const date = new Date()
  // const firstDateMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const yesterdayDateMonth = new Date(
    new Date().setDate(new Date().getDate() - 1)
  )

  return {
    // invoicedDateInit: firstDateMonth.toISOString(),
    invoicedDateInit: yesterdayDateMonth
      .toISOString()
      .split('T')[0]
      .concat('T00:00:00.001Z'),
    invoicedDateEnd: yesterdayDateMonth
      .toISOString()
      .split('T')[0]
      .concat('T23:59:59.999Z'),
  }
}
