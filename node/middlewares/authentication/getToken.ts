import { UserInputError } from '@vtex/api'

import { getTokenMarketplaceService } from '../../services/getTokenMarketplaceService'
import { getTokenService } from '../../services/getTokenService'

export async function getToken(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: { seller, originToken },
    },
  } = ctx

  switch (originToken) {
    case 'SELLER': {
      const { status, resultGetToken } = await getTokenService(seller, ctx)

      ctx.status = status
      ctx.body = resultGetToken
      break
    }

    case 'MARKETPLACE': {
      const { status, resultGetToken } = await getTokenMarketplaceService(
        ctx.vtex.account,
        ctx
      )

      ctx.status = status
      ctx.body = resultGetToken
      break
    }

    default:
      throw new UserInputError('Header originToken no valid o not Found')
  }

  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
