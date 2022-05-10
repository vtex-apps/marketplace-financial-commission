import { ResolverError } from '@vtex/api'

import { config } from '../../constants'
import { invoicingProcess } from '../../services/invoicingProcess'

/**
 * @description
 * Starts the process which will create
 * an invoice for each seller.
 * @throws {409 - Conflict}
 * If any fails we will store them and error out.
 * This will cause the scheduler to retry, which will
 * make the sellers to be those that failed.
 */
export async function generateInvoices(ctx: Context) {
  const {
    state,
    clients: { vbase },
    vtex: { account: marketplace },
  } = ctx

  // Sellers that have their billing cycle today
  const sellers = state.body.sellers as SellerInvoice[]

  const unresolvedInvoices = sellers.map((seller) =>
    invoicingProcess(ctx, seller, true)
  )

  const results = (await Promise.allSettled(
    unresolvedInvoices
  )) as PromiseResult[]

  const rejectedSellers = results.reduce((rejected, promise, i) => {
    if (promise.status === 'rejected') {
      rejected.push(sellers[i])
    }

    return rejected
  }, [] as SellerInvoice[])

  const anyRejected = rejectedSellers.some(Boolean)

  // If any invoicing promise fails, we will retry them
  if (anyRejected) {
    await vbase.saveJSON(
      config.RETRY_SELLERS_BUCKET,
      marketplace,
      JSON.stringify(rejectedSellers)
    )

    throw new ResolverError(
      "Couldn't complete the invoicing process for some sellers",
      409
    )
  }

  // The retry bucket is purged if all succeeded
  await vbase.saveJSON(config.RETRY_SELLERS_BUCKET, marketplace, null)

  return (ctx.status = 200)
}
