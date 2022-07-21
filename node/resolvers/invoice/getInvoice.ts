import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../../constants'
import { typeIntegration } from '../../utils/typeIntegration'

export const getInvoice = async (
  _: unknown,
  params: any,
  ctx: Context
): Promise<any> => {
  const {
    clients: { commissionInvoices, externalInvoices },
  } = ctx

  const { id } = params

  const where = `id=${id}`

  let invoice

  const integration = await typeIntegration(ctx)

  if (TypeIntegration.external === integration) {
    const externalInvoice = await externalInvoices.search(
      { page: PAGE_DEFAULT, pageSize: PAGE_SIZE_DEFAULT },
      ['id,status,invoiceCreatedDate,seller,jsonData,comment'],
      '',
      where
    )

    if (externalInvoice.length === 0) {
      invoice = externalInvoice
    } else {
      invoice = [
        {
          id: externalInvoice[0].id,
          status: externalInvoice[0].status,
          invoiceCreatedDate: externalInvoice[0].invoiceCreatedDate,
          seller: externalInvoice[0].seller,
          jsonData: JSON.parse(externalInvoice[0].jsonData as string),
          comment: externalInvoice[0].comment,
        },
      ]
    }
  } else {
    invoice = await commissionInvoices.search(
      { page: PAGE_DEFAULT, pageSize: PAGE_SIZE_DEFAULT },
      ['_all'],
      '',
      where
    )
  }

  if (invoice.length > 1) {
    console.warn('Invoice duplication, seek resolution')
  }

  if (invoice.length > 0) {
    return invoice[0]
  }

  return null
}
