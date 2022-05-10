import type { CommissionInvoice } from 'vtex.marketplace-financial-commission'

import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../../constants'

export const getInvoice = async (
  _: unknown,
  params: any,
  ctx: Context
): Promise<CommissionInvoice | null> => {
  const {
    clients: { commissionInvoices },
  } = ctx

  const { id } = params

  const where = `id=${id}`

  const invoice = await commissionInvoices.search(
    { page: PAGE_DEFAULT, pageSize: PAGE_SIZE_DEFAULT },
    ['_all'],
    '',
    where
  )

  if (invoice.length > 1) {
    console.warn('Invoice duplication, seek resolution')
  }

  if (invoice.length > 0) {
    return invoice[0]
  }

  return null
}
