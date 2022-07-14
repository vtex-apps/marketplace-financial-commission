import { UserInputError } from '@vtex/api'

import { createTokenMarketplaceService } from '../../services/createTokenMarketplaceService'
import { createTokenService } from '../../services/createTokenService'

export async function createTokenAuth(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: { seller, originToken },
    },
  } = ctx

  switch (originToken) {
    case 'SELLER': {
      const { status, resultCreateToken } = await createTokenService(
        seller,
        ctx
      )

      ctx.status = status
      ctx.body = resultCreateToken
      break
    }

    case 'MARKETPLACE': {
      const { status, resultCreateToken } = await createTokenMarketplaceService(
        ctx.vtex.account,
        ctx
      )

      ctx.status = status
      ctx.body = resultCreateToken
      break
    }

    default:
      throw new UserInputError('Header originToken no valid o not Found')
  }

  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
