import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../../constants'

/**
 * @description Retrieves a specific Invoice by ID.
 * The Marketplace account has total access, while
 * the seller account can only fetch theirs.
 */
export async function getInvoice(ctx: Context) {
  const {
    query: { id },
    clients: { commissionInvoices },
    state,
  } = ctx

  /**
   * @todo
   * Reemplazar por el sistema de auth
   */
  const account = state.body.auth
  const isMarketplace = true

  const where = isMarketplace
    ? `id=${id}`
    : `id=${id} AND sellerData.name=${account}`

  /**
   * We should allow 'expected sections' for masterdata's _fields
   */
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
