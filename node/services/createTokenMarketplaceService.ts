import { config } from '../constants'
import { createKeyToken } from '../utils'

export const createTokenMarketplaceService = async (
  accountMarketplace: string,
  ctx: Context
) => {
  const {
    clients: { vbase },
  } = ctx

  const date = new Date()
  const creationDate = date.toISOString()

  const autheticationToken = createKeyToken()

  const keyBucket = `${accountMarketplace}`

  let vbaseData: TokenConfiguration | undefined
  let lastModificationDate

  try {
    vbaseData = await vbase.getJSON<TokenConfiguration>(
      config.BUCKET_VBASE_TOKEN,
      keyBucket
    )
  } catch (err) {
    console.info('Token new')
  }

  if (vbaseData) {
    lastModificationDate = creationDate
  }

  const vbaseBody: TokenConfiguration = {
    account: accountMarketplace,
    autheticationToken,
    creationDate: vbaseData?.creationDate as string,
    enabled: true,
    name: accountMarketplace,
    id: accountMarketplace,
    lastModificationDate,
  }

  const resultVBase = await vbase.saveJSON(
    config.BUCKET_VBASE_TOKEN,
    keyBucket,
    vbaseBody
  )

  return {
    status: 200,
    resultCreateToken: {
      message: 'Successful token creation',
      accountId: accountMarketplace,
      autheticationToken,
      creationDate,
      resultVBase,
    },
  }
}
