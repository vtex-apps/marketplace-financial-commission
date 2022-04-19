import { NotFoundError } from '@vtex/api'

import { config } from '../constants'

export const getTokenService = async (seller: Seller, ctx: Context) => {
  const {
    clients: { vbase },
  } = ctx

  let vbaseData: TokenConfiguration | undefined
  const accountMarketplace = ctx.vtex.account

  const { name, account } = seller as Seller
  const keyBucket = `${accountMarketplace}-${name}-${account}`

  try {
    vbaseData = await vbase.getJSON<TokenConfiguration>(
      config.BUCKET_VBASE_TOKEN,
      keyBucket
    )
  } catch (err) {
    throw new NotFoundError('Seller not configured')
  }

  return {
    status: 200,
    resultGetToken: vbaseData,
  }
}
