import { NotFoundError } from '@vtex/api'

import { createTokenMarketplaceService } from '../services/createTokenMarketplaceService'
import { createTokenService } from '../services/createTokenService'

export const createToken = async (
  _: unknown,
  {
    accountId,
  }: {
    accountId: string
  },
  ctx: Context
): Promise<ResponseCreateToken> => {
  const {
    clients: { sellersIO },
  } = ctx

  const accountMarketplace = ctx.vtex.account

  if (accountMarketplace !== accountId) {
    const seller = await sellersIO.seller(accountId)

    console.info('seller ', seller)

    if (!seller) throw new NotFoundError('Seller no found')

    const { resultCreateToken } = await createTokenService(seller, ctx)

    return resultCreateToken
  }

  const { resultCreateToken } = await createTokenMarketplaceService(
    accountMarketplace,
    ctx
  )

  return resultCreateToken
}
