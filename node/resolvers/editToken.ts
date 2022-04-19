import { NotFoundError } from '@vtex/api'

import { updateTokenService } from '../services/updateTokenService'

export const editToken = async (
  _: unknown,
  {
    sellerId,
    tokenInput,
  }: {
    sellerId: string
    tokenInput: RequestUpdateToken
  },
  ctx: Context
): Promise<ResponseUpdateToken> => {
  const {
    clients: { sellersIO },
  } = ctx

  const seller = await sellersIO.seller(sellerId)

  if (!seller) throw new NotFoundError('Seller no found')

  const { resultUpdateToken } = await updateTokenService(
    seller,
    tokenInput,
    ctx
  )

  return resultUpdateToken
}
