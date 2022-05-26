import { AuthenticationError, UserInputError } from '@vtex/api'
import { json } from 'co-body'

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../../constants'

/**
 * @description Retrieves a REFERENCE list of invoices for a given seller.
 */
export async function invoicesBySeller(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { commissionInvoices },
    state: {
      body: { seller },
    },
    vtex: {
      route: { params },
    },
    req,
  } = ctx

  /* This means the seller wants to access other seller's invoices */
  if (params.sellerId !== seller.id) {
    throw new AuthenticationError(
      `${seller.id} cannot access invoices for ${params.sellerId}`
    )
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

  const where = `seller.name=${seller.name} AND (invoiceCreatedDate between ${startDate} AND ${endDate})`

  const fields = ['id', 'status', 'invoiceCreatedDate', 'totalizers']

  const sellerInvoices = await commissionInvoices.searchRaw(
    { page, pageSize },
    fields,
    '',
    where
  )

  ctx.status = 200
  ctx.body = sellerInvoices

  await next()
}
