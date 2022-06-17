import { getInvoice } from './getInvoice'

/**
 * @description Attempts to delete a specific Invoice by ID.
 * Only the Marketplace account has access to this resource
 */
export async function deleteInvoice(ctx: Context) {
  const {
    vtex: {
      route: {
        params: { id },
      },
    },
    clients: { commissionInvoices },
  } = ctx

  const invoiceToDelete = await getInvoice(ctx)

  if (!invoiceToDelete) {
    return null
  }

  await commissionInvoices.delete(id.toString())

  return `Invoice ${id} deleted`
}
