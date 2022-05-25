import type { CommissionInvoice } from 'vtex.marketplace-financial-commission'

import { INVOICE_STATUS } from '../constants'
import { calculateCommissionByOrder } from '../middlewares/dashboard/generate/calculateCommissionByOrder'
import { orderListInvoicedBySeller } from '../middlewares/dashboard/generate/orderListInvoicedBySeller'
import { randomId } from './randomId'

/**
 * @summary
 * Creates an `object` following the schema model of commission invoice
 * @param sellerData
 * Data required to draft the object
 * - id (Seller id)
 * - name (Seller name)
 * - email (Seller email)
 * - startDate (Orders lookup start)
 * - endDate (Orders lookup end)
 * @returns
 * - An Invoice shaped object
 * - `null` if no orders are available for the selected date range
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
   * @todo FEE & TAX
   */
  const fee = 0
  /*   const sellerTax = { type: null, value: 0 }
  const tax =
    sellerTax.type === 'percentage'
      ? subTotal / sellerTax.value
      : sellerTax.value */

  return {
    id: randomId(sellerId),
    status: INVOICE_STATUS.UNPAID,
    invoiceCreatedDate: today,
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
      fee,
      total: subTotal + fee,
    },
    comment: null,
  }
}
