import { createTokenService } from '../../services/createTokenService'

export async function createTokenAuth(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: { seller },
    },
  } = ctx

  const { status, resultCreateToken } = await createTokenService(seller, ctx)

  ctx.status = status
  ctx.body = resultCreateToken
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
