import { AuthenticationError } from '@vtex/api'

import { config } from '../../constants'

export async function authentication(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { vbase },
    request: { header },
    vtex: { logger },
    state: {
      body: { seller },
    },
  } = ctx

  const accountMarketplace = ctx.vtex.account

  const { name, account } = seller as Seller

  const keyBucket = `${accountMarketplace}-${name}-${account}`

  let autheticationToken = ''
  let enabledToken = true

  try {
    const resultVBase = await vbase.getJSON<TokenConfiguration>(
      config.BUCKET_VBASE_TOKEN,
      keyBucket
    )

    autheticationToken = resultVBase.autheticationToken
    enabledToken = resultVBase.enabled
  } catch (err) {
    throw new AuthenticationError('Unauthorized')
  }

  const verifyToken = async (): Promise<void> => {
    const bearerHeader = header.authorization

    if (bearerHeader) {
      const bearer = bearerHeader.split(' ')

      if (autheticationToken !== bearer[1]) {
        logger.warn({
          message: 'incoming-wrongApiKey',
        })
        throw new AuthenticationError('Unauthorized')
      }

      if (!enabledToken) {
        logger.warn({
          message: 'incoming-disabledApiKey',
        })
        throw new AuthenticationError('Unauthorized')
      }
    } else {
      logger.warn({
        message: 'incoming-missingApiKey',
      })
      throw new AuthenticationError('Unauthorized')
    }
  }

  await verifyToken()

  ctx.query.sellerName = name

  await next()
}
