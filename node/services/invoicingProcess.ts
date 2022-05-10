import { config, JOB_STATUS } from '../constants'
import { draftInvoice } from '../utils/draftInvoice'

interface JobHistory {
  referenceId: string | null
  sellerId: string
  status: JobStatus
  message: string | null
}

type JobStatus = 'ONGOING' | 'COMPLETE' | 'ERROR' | 'OMITTED'

/**
 * @description
 * Attempts to save a Commission Invoice document in MasterData.
 * @param sellerData
 * Data required to submit a document to the data entity
 * - id (Seller id)
 * - name (Seller name)
 * - email (Seller email)
 * - startDate (Orders lookup start)
 * - endDate (Orders lookup end)
 * @param automated
 * Used to either state the invoice was made manually or automatically
 * @returns
 * - If no orders are available, returns an 'omitted' message
 * - If the process completed, returns the masterdata document ID
 */
export const invoicingProcess = async (
  ctx: Context,
  sellerData: SellerInvoice,
  automated?: boolean
): Promise<string> => {
  const {
    clients: { vbase, commissionInvoices, mail },
  } = ctx

  const [today] = new Date().toISOString().split('T')

  const { id: sellerId, name: SELLER_NAME, email } = sellerData

  const BUCKET = automated ? config.AUTO_JOB_BUCKET : config.MANUAL_JOB_BUCKET

  const HISTORY = {
    referenceId: null,
    sellerId,
    status: JOB_STATUS.ONGOING,
    message: null,
  }

  await vbase.saveJSON<JobHistory>(BUCKET, SELLER_NAME, HISTORY)

  let invoice = await draftInvoice(ctx, sellerData)

  if (!invoice) {
    await vbase.saveJSON<JobHistory>(BUCKET, SELLER_NAME, {
      ...HISTORY,
      status: JOB_STATUS.OMITTED,
      message: `No eligible orders to invoice between ${sellerData.startDate} and ${sellerData.endDate}`,
    })

    return JOB_STATUS.OMITTED
  }

  if (automated) {
    invoice = { ...invoice, comment: `Invoice manually created on ${today}` }
  }

  const document = await commissionInvoices.save(invoice)

  await mail.sendMail({
    templateName: config.INVOICE_MAIL_TEMPLATE,
    jsonData: {
      message: {
        to: email,
      },
      ...invoice,
    },
  })

  await vbase.saveJSON<JobHistory>(BUCKET, SELLER_NAME, {
    ...HISTORY,
    referenceId: document.DocumentId,
    status: JOB_STATUS.COMPLETE,
  })

  /**
   * @todo save new dates for seller settings
   */

  return document.DocumentId
}
