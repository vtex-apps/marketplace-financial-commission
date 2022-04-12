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
