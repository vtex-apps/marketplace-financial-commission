import { NotFoundError, UserInputError } from '@vtex/api'

export async function switchUser(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { sellersIO },
    request: { header },
    vtex: {
      route: { params },
    },
  } = ctx

  const originToken = header.origintoken?.toString().toUpperCase()

  switch (originToken) {
    case 'SELLER': {
      const sellerId = params.sellerId as string

      if (!sellerId) {
        throw new UserInputError('field "sellerId" is required')
      }

      const responseSeller = await sellersIO.seller(sellerId)

      if (!responseSeller) throw new NotFoundError('Seller no found')

      ctx.state.body = {
        originToken,
        seller: responseSeller,
      }

      break
    }

    case 'MARKETPLACE': {
      ctx.state.body = {
        originToken,
      }

      break
    }

    default:
      throw new UserInputError('Header originToken no valid o not Found')
  }

  await next()
}
