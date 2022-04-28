export const GET_SELLERS = `
query GetSellers($sellersParams: SellersParams) {
  sellers(parameters: $sellersParams){
      items {
        id
        name
        account
        productCommissionPercentage
        freightCommissionPercentage
        isActive
      },
      paging {
        from
        to
        total
      }
    }
  }
`

export const GET_SELLER = `
query getSeller($sellerId: ID!) {
  seller(id: $sellerId) {
    id,
    name,
    account,
    isActive
  }
}
`
