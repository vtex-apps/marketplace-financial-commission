import type { CommissionInvoice } from 'vtex.marketplace-financial-commission'

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
    const internalInvoice = (await commissionInvoices.search(
      { page: PAGE_DEFAULT, pageSize: PAGE_SIZE_DEFAULT },
      ['id,status,invoiceCreatedDate,seller,orders,totalizers,comment'],
      '',
      where
    )) as unknown as CommissionInvoice[]

    const orders: any[] = internalInvoice[0].orders.map((order) => {
      return {
        orderId: order.orderId as string,
        sellerOrderId: order.sellerOrderId as string,
        totalComission: order.totalComission?.toFixed(2),
        totalOrderValue: order.totalOrderValue?.toFixed(2),
        totalOrderRate: order.totalOrderRate?.toFixed(2),
      }
    })

    invoice = [
      {
        id: internalInvoice[0].id as string,
        status: internalInvoice[0].status as string,
        invoiceCreatedDate: internalInvoice[0].invoiceCreatedDate as string,
        seller: internalInvoice[0].seller,
        orders,
        totalizers: {
          subTotal: internalInvoice[0].totalizers.subTotal?.toFixed(2),
          fee: internalInvoice[0].totalizers.fee?.toFixed(2),
          total: internalInvoice[0].totalizers.total?.toFixed(2),
        },
        comment: internalInvoice[0].comment,
      },
    ]
  }

  if (invoice.length > 1) {
    console.warn('Invoice duplication, seek resolution')
  }

  if (invoice.length > 0) {
    return invoice[0]
  }

  return null
}
