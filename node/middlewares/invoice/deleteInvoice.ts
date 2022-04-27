import { getInvoice } from './getInvoice'

/**
 * @description Attempts to delete a specific Invoice by ID.
 * Only the Marketplace account has access to this resource
 */
export async function deleteInvoice(ctx: Context) {
  const {
    query: { id },
    clients: { commissionInvoices },
  } = ctx

  /**
   * @todo pensar como eliminar invoices en bulk;
   * por ejemplo:
   * - Elegir 1 seller y borrar todas sus invoices
   * - Elegir un rango de fechas y borrar todas
   */
  const invoiceToDelete = await getInvoice(ctx)

  if (!invoiceToDelete) {
    return null
  }

  await commissionInvoices.delete(id[0])

  return `Invoice ${id} deleted`
}
