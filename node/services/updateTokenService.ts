import { NotFoundError, UserInputError } from '@vtex/api'

import { config } from '../constants'

export const updateTokenService = async (
  seller: Seller,
  body: RequestUpdateToken,
  ctx: Context
) => {
  const {
    clients: { vbase },
  } = ctx

  const { enabled } = body

  if (enabled === undefined) {
    throw new UserInputError('field enabled is required')
  }

  const date = new Date()
  const lastModificationDate = date.toISOString()

  const accountMarketplace = ctx.vtex.account

  const { id, name, account } = seller as Seller
  const sellerId = id as string

  const keyBucket = `${accountMarketplace}-${name}-${account}`

  let vbaseData: TokenConfiguration | undefined

  try {
    vbaseData = await vbase.getJSON<TokenConfiguration>(
      config.BUCKET_VBASE_TOKEN,
      keyBucket
    )
  } catch (err) {
    throw new NotFoundError('Seller not configured')
  }

  const vbaseBody: TokenConfiguration = {
    ...vbaseData,
    enabled,
    lastModificationDate,
  }

  const resultVBase = await vbase.saveJSON(
    config.BUCKET_VBASE_TOKEN,
    keyBucket,
    vbaseBody
  )

  return {
    status: 200,
    resultUpdateToken: {
      message: 'Successful token update',
      sellerId,
      lastModificationDate,
      resultVBase,
    },
  }
}
