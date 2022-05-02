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
  sellerData: SellerInvoice
): Promise<CommissionInvoice | null> {
  const {
    name: sellerName,
    startDate,
    endDate,
    id: sellerId,
    email,
  } = sellerData

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
    invoiceCreatedDate: today,
    /**
     * @todo calcular due date
     */
    invoiceDueDate: today,
    seller: {
      name: sellerName,
      id: sellerId,
      contact: {
        email,
        phone: null,
      },
    },
    orders: commissionByOrder as [],
    totalizers: {
      subTotal,
      tax,
      fee,
      total: subTotal + tax + fee,
    },
    comment: null,
  }
}
