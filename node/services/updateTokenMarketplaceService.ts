import { NotFoundError, UserInputError } from '@vtex/api'

import { config } from '../constants'

export const updateTokenMarketplaceService = async (
  accountMarketplace: string,
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

  const keyBucket = `${accountMarketplace}`

  let vbaseData: TokenConfiguration | undefined

  try {
    vbaseData = await vbase.getJSON<TokenConfiguration>(
      config.BUCKET_VBASE_TOKEN,
      keyBucket
    )
  } catch (err) {
    throw new NotFoundError('Marketplace not configured')
  }

  const vbaseBody: TokenConfiguration = enabled
    ? {
        ...vbaseData,
        enabled,
        lastModificationDate,
      }
    : {
        ...vbaseData,
        enabled,
        lastModificationDate,
        autheticationToken: '',
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
      accountId: accountMarketplace,
      lastModificationDate,
      resultVBase,
    },
  }
}
