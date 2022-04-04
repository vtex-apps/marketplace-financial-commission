export const STATS = `
query stats {
  stats{
    dateStart
    dateEnd
    statistics{
      ordersCount
      totalComission
      totalOrderValue
    }
  }
}`
