import React from 'react'
import { report as Report } from 'vtex.components-financial-commission'

import { GET_SELLERS, SEARCH_STATS, SEARCH_SELLERS } from './graphql'

const CommissionReport = () => {
  return (
    <Report
      getSellersQuery={GET_SELLERS}
      searchStatsQuery={SEARCH_STATS}
      searchSellersQuery={SEARCH_SELLERS}
    />
  )
}

export default CommissionReport
