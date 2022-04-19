import { json } from 'co-body'

import { updateTokenService } from '../../services/updateTokenService'

export async function updateToken(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: { seller },
    },
  } = ctx

  const bodyReq = await json(ctx.req)

  const { status, resultUpdateToken } = await updateTokenService(
    seller,
    bodyReq,
    ctx
  )

  ctx.status = status
  ctx.body = resultUpdateToken
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
