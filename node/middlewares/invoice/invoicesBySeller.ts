import { AuthenticationError, UserInputError } from '@vtex/api'
/* import { json } from 'co-body' */

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../../constants'

/**
 * @description Retrieves a REFERENCE list of invoices for given seller.
 * The Marketplace account has total access, while
 * the seller account can only retrieve their own.
 */
export async function invoicesBySeller(ctx: Context, next: () => Promise<any>) {
  const {
    query: { seller },
    clients: { commissionInvoices },
    state,
    /* req, */
  } = ctx

  if (!seller) {
    throw new UserInputError(`A seller name is required`)
  }

  /**
   * @todo
   * Reemplazar por el sistema de auth
   */
  const account = state.body.auth
  const isMarketplace = true

  if (!isMarketplace && account !== seller) {
    throw new AuthenticationError(`Cannot access invoices for ${seller}`)
  }

  /**
   * @todo parsear los valores de pagination desde el front
   */
  // const requestBody = await json(req)

  const fields = ['id, status, invoiceCreateDate, invoiceDueDate, totalizers']

  const sellerInvoices = await commissionInvoices.search(
    { page: PAGE_DEFAULT, pageSize: PAGE_SIZE_DEFAULT },
    fields,
    '',
    `sellerData.name is ${seller}`
  )

  ctx.status = 200
  ctx.body = sellerInvoices

  await next()
}
