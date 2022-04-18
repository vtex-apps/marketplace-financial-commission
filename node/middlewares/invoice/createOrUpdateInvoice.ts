import { json } from 'co-body'

import { randomId } from '../../utils/randomId'

/**
 * @description Attempts to create or update an Invoice.
 * Only the Marketplace account has access to this resource.
 */
export async function createOrUpdateInvoice(ctx: Context) {
  const {
    clients: { commissionInvoices },
    query: { id },
    req,
  } = ctx

  const requestBody = await json(req)

  if (!id && !requestBody.sellerData?.name) {
    throw new Error(
      `'sellerData.name' is required to create a unique ID for the Invoice`
    )
  }

  const docId = id ?? randomId(requestBody.sellerData.name)

  const invoice = {
    id: docId,
    ...requestBody,
  }

  const document = await commissionInvoices.saveOrUpdate(invoice)

  return `Invoice ${document.DocumentId} created/updated`
}
