import { NotFoundError } from '@vtex/api'

import { config } from '../constants'

export const getTokenMarketplaceService = async (
  accountMarketplace: string,
  ctx: Context
) => {
  const {
    clients: { vbase },
  } = ctx

  let vbaseData: TokenConfiguration | undefined

  const keyBucket = `${accountMarketplace}`

  try {
    vbaseData = await vbase.getJSON<TokenConfiguration>(
      config.BUCKET_VBASE_TOKEN,
      keyBucket
    )

    console.info({ vbaseData })
  } catch (err) {
    throw new NotFoundError('Marketplace not configured')
  }

  return {
    status: 200,
    resultGetToken: vbaseData,
  }
}
