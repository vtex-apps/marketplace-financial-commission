/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function search(ctx: Context, next: () => Promise<any>) {
  const {
    // clients: { dashboardClientMD },
    query: { dateStart, dateEnd },
  } = ctx

  // const pagination = {
  //   page: 1,
  //   pageSize: 100,
  // }

  // const dashboardResponse = await dashboardClientMD.search(
  //   pagination,
  //   ['_all'],
  //   'createdIn',
  //   `dateCut between ${dateStart} AND ${dateEnd}`
  // )

  // const sellersArray = dashboardResponse.reduce((arr, p) => {
  //   const sell = p?.sellers as SellersDashboard[]

  //   return [...arr, ...sell]
  // }, [] as SellersDashboard[])

  // const unificationSellers = []
  // let arrayTemp = []

  // for (let i = 0; i < sellersArray.length; i++) {
  //   arrayTemp = unificationSellers.filter(
  //     (resp) => resp.id === sellersArray[i].id
  //   )
  //   if (arrayTemp.length > 0) {
  //     unificationSellers[unificationSellers.indexOf(arrayTemp[0])].stats.push(
  //       sellersArray[i].stats
  //     )
  //   } else {
  //     unificationSellers.push({
  //       id: sellersArray[i].id,
  //       account: sellersArray[i].account,
  //       name: sellersArray[i].name,
  //       stats: [sellersArray[i].stats],
  //     })
  //   }
  // }

  // const calculateSellers: SellersDashboard[] = []

  // unificationSellers.forEach((item) => {
  //   const ordersCount = item.stats.reduce(
  //     (total, x) => (total += x.ordersCount),
  //     0
  //   )

  //   const totalComission = item.stats.reduce(
  //     (total, x) => (total += x.totalComission),
  //     0
  //   )

  //   const totalOrderValue = item.stats.reduce(
  //     (total, x) => (total += x.totalOrderValue),
  //     0
  //   )

  //   const outstandingBalance = 0

  //   const seller: SellersDashboard = {
  //     id: item.id,
  //     account: item.account,
  //     name: item.name,
  //     stats: {
  //       ordersCount,
  //       totalComission,
  //       totalOrderValue,
  //       outstandingBalance,
  //     },
  //   }

  //   calculateSellers.push(seller)
  // })

  // const ordersCount = calculateSellers.reduce(
  //   (total, x) => (total += x.stats.ordersCount),
  //   0
  // )

  // const totalComission = calculateSellers.reduce(
  //   (total, x) => (total += x.stats.totalComission),
  //   0
  // )

  // const totalOrderValue = calculateSellers.reduce(
  //   (total, x) => (total += x.stats.totalOrderValue),
  //   0
  // )

  // const dashboard: Dashboards = {
  //   dateStart,
  //   dateEnd,
  //   sellers: calculateSellers,
  //   stats: {
  //     ordersCount,
  //     totalComission,
  //     totalOrderValue,
  //   },
  // }

  ctx.status = 200
  ctx.body = { dateStart, dateEnd }
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
