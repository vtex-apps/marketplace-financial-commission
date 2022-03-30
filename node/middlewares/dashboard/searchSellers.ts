/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function searchSellers(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { sellersDashboardClientMD },
    query: { dateStart, dateEnd, page, pageSize, sellerId },
  } = ctx

  const pagination = {
    page,
    pageSize,
  }

  let where = `dateCut between ${dateStart} AND ${dateEnd} AND sellers.id=${sellerId}`

  if (sellerId === '' || sellerId === undefined || sellerId === null) {
    where = `dateCut between ${dateStart} AND ${dateEnd}`
  }

  console.info({ pagination })

  const dashboardResponse = await sellersDashboardClientMD.searchRaw(
    pagination,
    ['dateCut,sellers'],
    'sellers.id',
    where
  )

  // console.info(JSON.stringify(dashboardResponse.pagination))

  // const sellersArray = dashboardResponse.data.reduce((arr, p) => {
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
  //       sellersArray[i].statistics
  //     )
  //   } else {
  //     unificationSellers.push({
  //       id: sellersArray[i].id,
  //       account: sellersArray[i].account,
  //       name: sellersArray[i].name,
  //       stats: [sellersArray[i].statistics],
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
  //     statistics: {
  //       ordersCount,
  //       totalComission,
  //       totalOrderValue,
  //       outstandingBalance,
  //     },
  //   }

  //   calculateSellers.push(seller)
  // })

  // const dashboard: Dashboards = {
  //   dateStart,
  //   dateEnd,
  //   sellers: calculateSellers,
  // }

  ctx.status = 200
  ctx.body = dashboardResponse
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
