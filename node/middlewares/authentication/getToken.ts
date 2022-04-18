import { NotFoundError } from '@vtex/api'

import { config } from '../../constants'

export async function getToken(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { vbase },
    state: {
      body: { seller },
    },
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

  ctx.status = 200
  ctx.body = vbaseData
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
