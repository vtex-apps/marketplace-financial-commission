export const GET_SELLERS = `
query GetSellers {
    sellers {
      items {
        id
        name
        account
        productCommissionPercentage
        freightCommissionPercentage
        isActive
      },
      paging {
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
