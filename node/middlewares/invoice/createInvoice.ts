import { json } from 'co-body'

import { JOB_STATUS } from '../../constants'
import { invoicingProcess } from '../../services/invoicingProcess'

/**
 * @description Attempts to create an Invoice.
 * Only the Marketplace account has access to this resource.
 */
export async function createInvoice(ctx: Context) {
  const { req } = ctx

  const seller = await json(req)

  const invoice = await invoicingProcess(ctx, seller)

  if (invoice === JOB_STATUS.OMITTED) {
    return 'No eligible orders to invoice for given date range'
  }

  return `Invoice ${invoice} created`
}
