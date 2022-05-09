import { json } from 'co-body'

/**
 * @description
 * Attempts to update an Invoice.
 * @returns
 * Message confirming the update
 */
export async function updateInvoice(ctx: Context): Promise<string> {
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
