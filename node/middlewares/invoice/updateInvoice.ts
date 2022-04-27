import { json } from 'co-body'

/**
 * @description Attempts to update an Invoice.
 * Only the Marketplace account has access to this resource.
 */
export async function updateInvoice(ctx: Context) {
  const {
    clients: { commissionInvoices },
    query: { id },
    req,
  } = ctx

  const requestBody = await json(req)

  const invoice = {
    id: id[0],
    ...requestBody,
  }

  await commissionInvoices.update(id[0], invoice)

  return `Invoice ${id[0]} updated`
}
