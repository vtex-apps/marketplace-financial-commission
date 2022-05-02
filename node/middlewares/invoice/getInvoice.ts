import { AuthenticationError } from '@vtex/api'

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../../constants'

/**
 * @description Retrieves a specific Invoice by ID.
 */
export async function getInvoice(ctx: Context) {
  const {
    query: { id, sellerName },
    clients: { commissionInvoices },
    state: {
      body: { seller },
    },
  } = ctx

  /* This means the seller wants to access other seller's invoices */
  if (sellerName !== seller) {
    throw new AuthenticationError(`Cannot access invoices for ${seller}`)
  }

  const where = `id=${id} AND seller.name=${sellerName}`

  const invoice = await commissionInvoices.search(
    { page: PAGE_DEFAULT, pageSize: PAGE_SIZE_DEFAULT },
    ['_all'],
    '',
    where
  )

  /**
   * @todo como solucionar duplicados
   */
  if (invoice.length > 1) {
    console.warn('Invoice duplication, seek resolution')
  }

  if (invoice.length > 0) {
    return invoice[0]
  }

  return null
}
