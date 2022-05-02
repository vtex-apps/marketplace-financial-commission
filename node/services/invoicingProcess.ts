import { config, JOB_STATUS } from '../constants'
import { draftInvoice } from '../utils/draftInvoice'

interface JobHistory {
  referenceId: string | null
  sellerId: string
  status: JobStatus
  message: string | null
}

type JobStatus = 'ONGOING' | 'COMPLETE' | 'ERROR' | 'OMITTED'

export const invoicingProcess = async (
  ctx: Context,
  sellerData: SellerInvoice,
  automated?: boolean
): Promise<string> => {
  const {
    clients: { vbase, commissionInvoices, mail },
    state: {
      body: { today },
    },
  } = ctx

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
      message: 'No eligible orders to invoice for given date range',
    })

    return JOB_STATUS.OMITTED
  }

  if (automated) {
    invoice = { ...invoice, comment: `Invoice manually created on ${today}` }
  }

  const document = await commissionInvoices.save(invoice)

  await mail.sendMail({
    templateName: '',
    jsonData: { message: { to: email } },
  })

  await vbase.saveJSON<JobHistory>(BUCKET, SELLER_NAME, {
    ...HISTORY,
    referenceId: document.DocumentId,
    status: JOB_STATUS.COMPLETE,
  })

  return document.DocumentId
}
