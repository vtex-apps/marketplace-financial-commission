export const DASHBOARD = `query dashboard{
  dashboard{
    dateCut
    dateStart
    dateEnd
    sellers{
      id
      name
      account
      statistics{
        dateInvoiced
        ordersCount
        totalComission
        totalOrderValue
        outstandingBalance
      }
    }
    statistics{
      dateInvoiced
      ordersCount
      totalComission
      totalOrderValue
      outstandingBalance
    }
    paging{
      currentPage
      totalPages
    }
  }
}`