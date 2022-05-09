import { ResolverError } from '@vtex/api'

import { config } from '../../constants'
import { listSellers } from './listSellers'

/**
 * @middleware
 * Filter sellers that are eligible for Invoice creation.
 * Intended to be automatically run by a scheduler in a Marketplace.
 */
export async function eligibleSellers(
  ctx: Context,
  next: () => Promise<Sellers>
) {
  const {
    clients: { vbase },
    vtex: { account: marketplace },
  } = ctx

  const [today] = new Date().toISOString().split('T')

  const retrySellers = await vbase.getJSON<any>(
    config.RETRY_SELLERS_BUCKET,
    marketplace,
    true
  )

  if (retrySellers) {
    ctx.state.body = { sellers: JSON.parse(retrySellers) }

    await next()
  }

  const DEFAULT_SETTINGS = await vbase.getJSON<Settings>(
    config.SETTINGS_BUCKET,
    marketplace,
    true
  )

  if (!DEFAULT_SETTINGS) {
    throw new ResolverError(
      "No default Marketplace's settings found, please configure them in the Admin panel",
      500
    )
  }

  const allSellers = await listSellers(ctx)

  const activeSellers = allSellers.items.filter(({ isActive }) => isActive)

  if (!activeSellers) {
    throw new ResolverError(
      "There're no active sellers for this Marketplace",
      204
    )
  }

  const sellersToInvoice = await Promise.all(
    activeSellers.map(async (seller) => {
      const sellerSettings =
        (await vbase.getJSON<SellerSettings>(
          config.SETTINGS_BUCKET,
          seller.name,
          true
        )) || DEFAULT_SETTINGS

      if (sellerSettings.endDate <= today) {
        return { ...seller, ...sellerSettings }
      }

      return null
    })
  )

  // Filter sellers that fall outside this cycle
  const sellers = sellersToInvoice.filter(Boolean) as SellerInvoice[]

  ctx.state.body = { sellers }

  await next()
}
