import { config } from '../../constants'
import { ErorrWithPayload } from '../../utils/errorWithPayload'

/**
 * @middleware
 * Filter sellers that are eligible for Invoice creation.
 * Intended to be automatically run by a scheduler in a Marketplace.
 */
export async function eligibleSellers(
  ctx: Context,
  next: () => Promise<Sellers>,
  retrySellers?: ItemSeller[]
) {
  if (retrySellers) {
    ctx.state.body = { sellers: retrySellers }

    await next()
  }

  const {
    clients: { sellersIO, vbase },
    vtex: { account: marketplace },
  } = ctx

  const [today] = new Date().toISOString().split('T')

  const DEFAULT_SETTINGS = await vbase.getJSON<Settings>(
    config.SETTINGS_BUCKET,
    marketplace,
    true
  )

  if (!DEFAULT_SETTINGS) {
    throw new ErorrWithPayload({
      message:
        "No default Marketplace's settings found, please configure them in the Admin panel",
      status: 500,
    })
  }

  const allSellers = await sellersIO.getSellers()

  const activeSellers = allSellers.items.filter(({ isActive }) => isActive)

  if (!activeSellers) {
    throw new ErorrWithPayload({
      message: "There're no active sellers for this Marketplace",
      status: 204,
    })
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

  ctx.state.body = { sellers, today }

  await next()
}
