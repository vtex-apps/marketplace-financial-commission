import { AuthenticationError, UserInputError } from '@vtex/api'
import { json } from 'co-body'

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../../constants'

/**
 * @description Retrieves a REFERENCE list of invoices for given seller.
 */
export async function invoicesBySeller(ctx: Context, next: () => Promise<any>) {
  const {
    query: { sellerName },
    clients: { commissionInvoices },
    state: {
      body: { seller },
    },
    req,
  } = ctx

  /* This means the seller wants to access other seller's invoices */
  if (sellerName !== seller) {
    throw new AuthenticationError(`Cannot access invoices for ${seller}`)
  }

  const {
    page = PAGE_DEFAULT,
    pageSize = PAGE_SIZE_DEFAULT,
    startDate,
    endDate,
  } = await json(req)

  if (!startDate || !endDate) {
    throw new UserInputError(
      'startDate and/or endDate not provided in the request'
    )
  }

  const where = `seller.name is ${seller} AND (invoiceCreatedDate between ${startDate} AND ${endDate})`

  const fields = ['id, status, invoiceCreatedDate, invoiceDueDate, totalizers']

  const sellerInvoices = await commissionInvoices.search(
    { page, pageSize },
    fields,
    '',
    where
  )

  ctx.status = 200
  ctx.body = sellerInvoices

  await next()
}
