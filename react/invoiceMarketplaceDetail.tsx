import React from 'react'
import { invoiceDetail as InvoiceDetail } from 'vtex.components-financial-commission'

import { GET_INVOICE, GET_TEMPLATE, SEND_EMAIL } from './graphql'

const InvoiceMarketPlaceDetail = () => {
  return (
    <InvoiceDetail
      invoiceQuery={GET_INVOICE}
      getTemplate={GET_TEMPLATE}
      sendEmail={SEND_EMAIL}
    />
  )
}

export default InvoiceMarketPlaceDetail
