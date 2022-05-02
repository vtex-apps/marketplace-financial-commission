import { JOB_STATUS } from '../../constants'
import { invoicingProcess } from '../../services/invoicingProcess'

export const createInvoice = async (
  _: unknown,
  params: any,
  ctx: Context
): Promise<any> => {
  const invoice = await invoicingProcess(ctx, params)

  if (invoice === JOB_STATUS.OMITTED) {
    return 'No eligible orders to invoice for given date range'
  }

  return `Invoice ${invoice} created`
}
