import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../../constants'
import { typeIntegration } from '../../utils/typeIntegration'

export const invoicesBySeller = async (
  _: unknown,
  params: any,
  ctx: Context
): Promise<any> => {
  const {
    clients: { commissionInvoices, externalInvoices },
  } = ctx

  const {
    sellerName,
    pagination: { page = PAGE_DEFAULT, pageSize = PAGE_SIZE_DEFAULT },
    dates: { startDate, endDate },
  } = params.sellerInvoiceParams

  const where = `seller.name="${sellerName}" AND (invoiceCreatedDate between ${startDate} AND ${endDate})`

  const fields = ['id', 'status', 'invoiceCreatedDate', 'totalizers']

  const pagination = { page, pageSize }

  let sellerInvoices

  const integration = await typeIntegration(ctx)

  if (TypeIntegration.external === integration) {
    const whereExternal = `seller.name="${sellerName}" AND (invoiceCreatedDate between ${startDate} AND ${endDate})`

    const fieldsExternal = ['id', 'status', 'invoiceCreatedDate', 'jsonData']

    sellerInvoices = await externalInvoices.searchRaw(
      pagination,
      fieldsExternal,
      'invoiceCreatedDate',
      whereExternal
    )
  } else {
    sellerInvoices = await commissionInvoices.searchRaw(
      pagination,
      fields,
      'invoiceCreatedDate',
      where
    )
  }

  return sellerInvoices
}
