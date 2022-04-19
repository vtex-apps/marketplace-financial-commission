import { NotFoundError } from '@vtex/api'

import { getTokenService } from '../services/getTokenService'

export const getToken = async (
  _: unknown,
  {
    sellerId,
  }: {
    sellerId: string
  },
  ctx: Context
): Promise<TokenConfiguration> => {
  const {
    clients: { sellersIO },
  } = ctx

  const seller = await sellersIO.seller(sellerId)

  if (!seller) throw new NotFoundError('Seller no found')

  const { resultGetToken } = await getTokenService(seller, ctx)

  return resultGetToken
}
