export const findSeller = (dashboard: Dashboards, sellerId: string) => {
  const searchSeller = dashboard.sellers.find(
    (v) => v.id === sellerId
  ) as SellersDashboard

  return searchSeller
}
