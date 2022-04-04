export const SELLERS = `
query sellers {
  sellers{
    items{
      id
      name
      account
      productCommissionPercentage
      freightCommissionPercentage
      isActive
    }
    paging{
      total
    }
  }
}`
