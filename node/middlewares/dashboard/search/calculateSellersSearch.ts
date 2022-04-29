/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function calculateSellersSearch(
  unificationSellers: UnificationSellersDashboard[]
): Promise<SellersDashboard[]> {
  const calculateSellers: SellersDashboard[] = []

  unificationSellers.forEach((item) => {
    const ordersCount = Number(
      item.statistics
        .reduce((total, x) => (total += x.ordersCount), 0)
        .toFixed(2)
    )

    const totalComission = Number(
      item.statistics
        .reduce((total, x) => (total += x.totalComission), 0)
        .toFixed(2)
    )

    const totalOrderValue = Number(
      item.statistics
        .reduce((total, x) => (total += x.totalOrderValue), 0)
        .toFixed(2)
    )

    const outstandingBalance = 0

    const seller: SellersDashboard = {
      id: item.id,
      account: item.account,
      name: item.name,
      statistics: {
        ordersCount,
        totalComission,
        totalOrderValue,
        outstandingBalance,
      },
    }

    calculateSellers.push(seller)
  })

  return calculateSellers
}
