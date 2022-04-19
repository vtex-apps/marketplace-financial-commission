import { getTokenService } from '../../services/getTokenService'

export async function getToken(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: { seller },
    },
  } = ctx

  const { status, resultGetToken } = await getTokenService(seller, ctx)

  ctx.status = status
  ctx.body = resultGetToken
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
