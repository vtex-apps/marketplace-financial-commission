import type { CommissionInvoice } from 'vtex.marketplace-financial-commission'

import { INVOICE_STATUS } from '../constants'
import { calculateCommissionByOrder } from '../middlewares/dashboard/generate/calculateCommissionByOrder'
import { orderListInvoicedBySeller } from '../middlewares/dashboard/generate/orderListInvoicedBySeller'
import { randomId } from './randomId'

/**
 * @description Returns an Invoice shaped object or null
 * if no orders are available for the selected date range
 */
export async function draftInvoice(
  ctx: Context,
  data: any
): Promise<CommissionInvoice | null> {
  const { sellerName, startDate, endDate, id, email } = data

  /**
   * @todo
   * Reconocer ordenes en invoices manuales y filtrarlas
   */
  const sellerOrders = await orderListInvoicedBySeller(ctx, sellerName, {
    start: startDate,
    end: endDate,
  })

  if (!sellerOrders[0].list.length) {
    return null
  }

  const commissionByOrder = await calculateCommissionByOrder(ctx, sellerOrders)

  const subTotal = commissionByOrder.reduce(
    (total, { totalComission }) => Number(total + totalComission),
    0
  )

  const [today] = new Date().toISOString().split('T')

  /**
   * @todo como manejamos el FEE y el TAX?
   */
  const fee = 0
  const sellerTax = { type: 'percentage', value: 0 }
  const tax =
    sellerTax.type === 'percentage'
      ? subTotal / sellerTax.value
      : sellerTax.value

  return {
    id: randomId(sellerName),
    status: INVOICE_STATUS.UNPAID,
    invoiceCreateDate: today,
    /**
     * @todo calcular due date
     */
    invoiceDueDate: today,
    sellerData: {
      name: sellerName,
      id,
      contact: {
        email,
        phone: null,
      },
      /**
       * @todo faltan los datos del seller, como los manejamos?
       */
      address: {
        postalCode: null,
        city: null,
        state: null,
        country: null,
        street: null,
        number: null,
      },
    },
    orders: commissionByOrder as [],
    totalizers: {
      subTotal,
      tax,
      fee,
      total: subTotal + tax + fee,
    },
  }
}
