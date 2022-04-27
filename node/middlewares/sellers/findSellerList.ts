export const findSellerList = (sellers: Sellers, sellersId: string) => {
  const sellersIds = sellersId.split(',')
  const searchSeller = sellers.items.filter((v) =>
    sellersIds.includes(v.id)
  ) as ItemSeller[]

  return searchSeller
}
