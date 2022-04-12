export async function unificationSellers(
  dashboardResponse: any[]
): Promise<any[]> {
  const sellersArray = dashboardResponse.reduce((arr, p) => {
    const sell = p?.sellers as SellersDashboard[]

    return [...arr, ...sell]
  }, [] as SellersDashboard[])

  const unificationSellersDashboard: UnificationSellersDashboard[] = []
  let arrayTemp = []

  for (let i = 0; i < sellersArray.length; i++) {
    arrayTemp = unificationSellersDashboard.filter(
      (resp) => resp.id === sellersArray[i].id
    )
    if (arrayTemp.length > 0) {
      unificationSellersDashboard[
        unificationSellersDashboard.indexOf(arrayTemp[0])
      ].statistics.push(sellersArray[i].statistics)
    } else {
      unificationSellersDashboard.push({
        id: sellersArray[i].id,
        account: sellersArray[i].account,
        name: sellersArray[i].name,
        statistics: [sellersArray[i].statistics],
      })
    }
  }

  return unificationSellersDashboard
}
