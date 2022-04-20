export const findSeller = (dashboard: Dashboards, sellersId: string) => {
  const sellersIds = sellersId.split(',')
  const searchSeller = dashboard.sellers.filter((v) =>
    sellersIds.includes(v.id)
  ) as SellersDashboard[]

  return searchSeller
}
