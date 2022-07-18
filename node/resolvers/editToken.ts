import { NotFoundError } from '@vtex/api'

import { updateTokenMarketplaceService } from '../services/updateTokenMarketplaceService'
import { updateTokenService } from '../services/updateTokenService'

export const editToken = async (
  _: unknown,
  {
    accountId,
    tokenInput,
  }: {
    accountId: string
    tokenInput: RequestUpdateToken
  },
  ctx: Context
): Promise<ResponseUpdateToken> => {
  const {
    clients: { sellersIO },
  } = ctx

  const accountMarketplace = ctx.vtex.account

  if (accountMarketplace !== accountId) {
    const seller = await sellersIO.seller(accountId)

    if (!seller) throw new NotFoundError('Seller no found')

    const { resultUpdateToken } = await updateTokenService(
      seller,
      tokenInput,
      ctx
    )

    return resultUpdateToken
  }

  const { resultUpdateToken } = await updateTokenMarketplaceService(
    accountMarketplace,
    tokenInput,
    ctx
  )

  return resultUpdateToken
}
