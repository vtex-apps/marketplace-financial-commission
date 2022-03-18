/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function SearchDashboard(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { dashboardClientMD },
  } = ctx

  const pagination = {
    page: 1,
    pageSize: 100,
  }

  const { dateIni, dateEnd } = ctx.query
  const dashboardResponse = await dashboardClientMD.search(
    pagination,
    ['_all'],
    'createdIn',
    `dateCut between ${dateIni} AND ${dateEnd}`
  )

  const sellersArray = dashboardResponse.reduce((arr, p) => {
    const sell = p?.sellers as SellersDashboard[]

    return [...arr, ...sell]
  }, [] as SellersDashboard[])

  const unificationSellers = []
  let arrayTemp = []

  for (let i = 0; i < sellersArray.length; i++) {
    arrayTemp = unificationSellers.filter(
      (resp) => resp.id === sellersArray[i].id
    )
    if (arrayTemp.length > 0) {
      unificationSellers[unificationSellers.indexOf(arrayTemp[0])].stats.push(
        sellersArray[i].stats
      )
    } else {
      unificationSellers.push({
        id: sellersArray[i].id,
        account: sellersArray[i].account,
        name: sellersArray[i].name,
        stats: [sellersArray[i].stats],
      })
    }
  }

  const calculateSellers: SellersDashboard[] = []

  unificationSellers.forEach((item) => {
    const countOrders = item.stats.reduce(
      (total, x) => (total += x.countOrders),
      0
    )

    const totalComission = item.stats.reduce(
      (total, x) => (total += x.totalComission),
      0
    )

    const totalValueOrder = item.stats.reduce(
      (total, x) => (total += x.totalValueOrder),
      0
    )

    const outstandingBalance = 0

    const seller: SellersDashboard = {
      id: item.id,
      account: item.account,
      name: item.name,
      stats: {
        countOrders,
        totalComission,
        totalValueOrder,
        outstandingBalance,
      },
    }

    calculateSellers.push(seller)
  })

  const countOrders = calculateSellers.reduce(
    (total, x) => (total += x.stats.countOrders),
    0
  )

  const totalComission = calculateSellers.reduce(
    (total, x) => (total += x.stats.totalComission),
    0
  )

  const totalValueOrder = calculateSellers.reduce(
    (total, x) => (total += x.stats.totalValueOrder),
    0
  )

  const dashboard: Dashboards = {
    dateIni,
    dateEnd,
    sellers: calculateSellers,
    stats: {
      countOrders,
      totalComission,
      totalValueOrder,
    },
  }

  ctx.status = 200
  ctx.body = dashboard
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
