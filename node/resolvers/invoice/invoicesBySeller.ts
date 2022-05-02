import type { CommissionInvoice } from 'vtex.marketplace-financial-commission'

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../../constants'

export const invoicesBySeller = async (
  _: unknown,
  params: any,
  ctx: Context
): Promise<CommissionInvoice[]> => {
  const {
    clients: { commissionInvoices },
  } = ctx

  const {
    sellerName,
    pagination: { page = PAGE_DEFAULT, pageSize = PAGE_SIZE_DEFAULT },
    dates: { startDate, endDate },
  } = params

  const where = `seller.name is ${sellerName} AND (invoiceCreatedDate between ${startDate} AND ${endDate})`

  const fields = ['id, status, invoiceCreatedDate, invoiceDueDate, totalizers']

  const sellerInvoices = await commissionInvoices.search(
    { page, pageSize },
    fields,
    '',
    where
  )

  return sellerInvoices
}
