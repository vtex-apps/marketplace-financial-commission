import { typeIntegration } from '../../utils/typeIntegration'

export async function getTypeIntegration(
  ctx: Context,
  next: () => Promise<any>
) {
  const integration = await typeIntegration(ctx)

  ctx.status = 200
  ctx.body = { integration }
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
