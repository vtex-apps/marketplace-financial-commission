export const findSeller = (dashboard: Dashboards, sellerId: string) => {
  const sellerIds = sellerId.split(',')
  const searchSeller = dashboard.sellers.filter((v) =>
    sellerIds.includes(v.id)
  ) as SellersDashboard[]

  return searchSeller
}
