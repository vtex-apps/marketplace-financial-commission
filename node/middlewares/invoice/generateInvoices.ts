import { invoicingProcess } from '../../services/invoicingProcess'
import { assertRejected } from '../../utils/assertRejected'
import { ErorrWithPayload } from '../../utils/errorWithPayload'

/**
 * @description Starts the process which will create
 * an invoice for each seller.
 */
export async function generateInvoices(ctx: Context) {
  const { state } = ctx

  const sellers = state.body.sellers as SellerInvoice[]

  const unresolvedPromises = sellers.map((seller) =>
    invoicingProcess(ctx, seller)
  )

  const results = (await Promise.allSettled(
    unresolvedPromises
  )) as PromiseResult[]

  const rejected = results.filter(assertRejected)

  if (rejected.length > 0) {
    throw new ErorrWithPayload({
      message: "Couldn't complete the invoicing process for some sellers",
      status: 409,
      payload: rejected,
    })
  }

  return (ctx.status = 200)
}
