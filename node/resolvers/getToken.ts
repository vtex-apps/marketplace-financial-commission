import { NotFoundError } from '@vtex/api'

import { getTokenMarketplaceService } from '../services/getTokenMarketplaceService'
import { getTokenService } from '../services/getTokenService'

export const getToken = async (
  _: unknown,
  {
    accountId,
  }: {
    accountId: string
  },
  ctx: Context
): Promise<TokenConfiguration> => {
  const {
    clients: { sellersIO },
  } = ctx

  console.info(':::::::::::::::::::: ', accountId)

  const accountMarketplace = ctx.vtex.account

  if (accountMarketplace !== accountId) {
    const seller = await sellersIO.seller(accountId)

    if (!seller) throw new NotFoundError('Seller no found')

    const { resultGetToken } = await getTokenService(seller, ctx)

    return resultGetToken
  }

  const { resultGetToken } = await getTokenMarketplaceService(
    accountMarketplace,
    ctx
  )

  return resultGetToken
}
