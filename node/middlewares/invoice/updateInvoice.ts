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
    vtex: {
      route: {
        params: { id },
      },
    },
    req,
  } = ctx

  const requestBody = await json(req)

  const invoice = {
    id: id[0],
    ...requestBody,
  }

  await commissionInvoices.update(id.toString(), invoice)

  return `Invoice ${id.toString()} updated`
}
