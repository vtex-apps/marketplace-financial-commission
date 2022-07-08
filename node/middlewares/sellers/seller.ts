import { NotFoundError, UserInputError } from '@vtex/api'

/**
 * @description
 * Takes the sellerId from the query or route to retrieve
 * the Seller data, and then write it in the state body.
 * @state {Seller}
 * - id
 * - name
 * - account
 * - isActive
 */
export async function seller(ctx: Context, next: () => Promise<Seller>) {
  const {
    clients: { sellersIO },
    vtex: {
      route: { params },
    },
    query,
  } = ctx

  const sellerId = (query.sellerId as string) ?? (params.sellerId as string)

  if (!sellerId) {
    throw new UserInputError('field "sellerId" is required')
  }

  const responseSeller = await sellersIO.seller(sellerId)

  if (!responseSeller) throw new NotFoundError('Seller no found')

  ctx.state.body = {
    seller: responseSeller,
  }

  await next()
}
