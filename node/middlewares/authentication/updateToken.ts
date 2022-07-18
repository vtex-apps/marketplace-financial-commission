import { UserInputError } from '@vtex/api'
import { json } from 'co-body'

import { updateTokenMarketplaceService } from '../../services/updateTokenMarketplaceService'
import { updateTokenService } from '../../services/updateTokenService'

export async function updateToken(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: { seller, originToken },
    },
  } = ctx

  const bodyReq = await json(ctx.req)

  switch (originToken) {
    case 'SELLER': {
      const { status, resultUpdateToken } = await updateTokenService(
        seller,
        bodyReq,
        ctx
      )

      ctx.status = status
      ctx.body = resultUpdateToken
      break
    }

    case 'MARKETPLACE': {
      const { status, resultUpdateToken } = await updateTokenMarketplaceService(
        ctx.vtex.account,
        bodyReq,
        ctx
      )

      ctx.status = status
      ctx.body = resultUpdateToken
      break
    }

    default:
      throw new UserInputError('Header originToken no valid o not Found')
  }

  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
