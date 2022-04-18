import { config, INVOICE_STATUS, JOB_STATUS } from '../constants'
import { calculateCommissionByOrder } from '../middlewares/dashboard/generate/calculateCommissionByOrder'
import { orderListInvoicedBySeller } from '../middlewares/dashboard/generate/orderListInvoicedBySeller'
import { randomId } from '../utils/randomId'

interface JobHistory {
  referenceId: string
  sellerId: string
  status: JobStatus
  message: string | null
}

type JobStatus = 'ongoing' | 'complete' | 'error'

export const invoicingProcess = async (ctx: Context, seller: SellerInvoice) => {
  const {
    clients: { vbase, commissionInvoices },
    state,
  } = ctx

  const { id, name, startCycle, nextCycle } = seller

  const documentId = randomId(name)

  const HISTORY = {
    referenceId: documentId,
    sellerId: id,
    status: JOB_STATUS.ONGOING,
    message: null,
  }

  await vbase.saveJSON<JobHistory>(config.OUTSTANDING_BUCKET, name, HISTORY)

  /**
   * @todo
   * Reconocer ordenes en invoices manuales y filtrarlas
   */
  const sellerOrders = await orderListInvoicedBySeller(ctx, name, {
    start: startCycle,
    end: nextCycle,
  })

  if (!sellerOrders[0].list.length) {
    await vbase.saveJSON<JobHistory>(config.OUTSTANDING_BUCKET, name, {
      ...HISTORY,
      status: JOB_STATUS.COMPLETE,
    })

    return true
  }

  /**
   * @todo falta el totalOrderRate, como se calcula?
   */
  const commissionByOrder = await calculateCommissionByOrder(ctx, sellerOrders)

  const subTotal = commissionByOrder.reduce(
    (total, { totalComission }) => Number(total + totalComission),
    0
  )

  const { email } = seller

  /**
   * @todo como manejamos el FEE y el TAX?
   */
  const fee = 0
  const sellerTax = { type: 'percentage', value: 0 }
  const tax =
    sellerTax.type === 'percentage'
      ? subTotal / sellerTax.value
      : sellerTax.value

  const invoice = {
    id: documentId,
    status: INVOICE_STATUS.UNPAID,
    invoiceCreateData: state.body.today,
    /**
     * @todo calcular due date
     */
    invoiceDueDate: state.body.today,
    sellerData: {
      name,
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
    orders: commissionByOrder,
    totalizers: {
      subTotal,
      tax,
      fee,
      total: subTotal + tax + fee,
    },
  }

  await commissionInvoices.save(invoice)

  /**
   * @todo usar el cliente de emails y enviarselo al seller
   */
  // await sendMessage(email, invoice)

  await vbase.saveJSON<JobHistory>(config.OUTSTANDING_BUCKET, name, {
    ...HISTORY,
    status: JOB_STATUS.COMPLETE,
  })

  return true
}
