import { NotFoundError } from '@vtex/api'

import { createTokenService } from '../services/createTokenService'

export const createToken = async (
  _: unknown,
  {
    sellerId,
  }: {
    sellerId: string
  },
  ctx: Context
): Promise<ResponseCreateToken> => {
  const {
    clients: { sellersIO },
  } = ctx

  const seller = await sellersIO.seller(sellerId)

  if (!seller) throw new NotFoundError('Seller no found')

  const { resultCreateToken } = await createTokenService(seller, ctx)

  return resultCreateToken
}
