import { NotFoundError, UserInputError } from '@vtex/api'
import { json } from 'co-body'

import { config } from '../../constants'

export async function updateToken(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { vbase },
    state: {
      body: { seller },
    },
  } = ctx

  const bodyReq = await json(ctx.req)

  const { enabled } = bodyReq

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

  ctx.status = 200
  ctx.body = {
    message: 'Successful token update',
    sellerId,
    lastModificationDate,
    resultVBase,
  }
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
