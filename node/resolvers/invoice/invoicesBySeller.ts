import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../../constants'

export const invoicesBySeller = async (
  _: unknown,
  params: any,
  ctx: Context
): Promise<any> => {
  const {
    clients: { commissionInvoices },
  } = ctx

  const {
    sellerName,
    pagination: { page = PAGE_DEFAULT, pageSize = PAGE_SIZE_DEFAULT },
    dates: { startDate, endDate },
  } = params.sellerInvoiceParams

  const where = `seller.name=${sellerName} AND (invoiceCreatedDate between ${startDate} AND ${endDate})`

  const fields = ['id', 'status', 'invoiceCreatedDate', 'totalizers']

  const sellerInvoices = await commissionInvoices.search(
    { page, pageSize },
    fields,
    '',
    where
  )

  return sellerInvoices
}
