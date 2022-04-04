export const GETSELLERS = `
query getSellers {
  getSellers{
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
