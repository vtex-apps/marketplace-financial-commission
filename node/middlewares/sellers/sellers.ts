import { listSellers } from './listSellers'

export async function sellers(ctx: Context, next: () => Promise<Sellers>) {
  const respsellers = await listSellers(ctx)

  ctx.state.body = { sellers: respsellers }

  await next()
}
