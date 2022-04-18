export async function response(ctx: Context, next: () => Promise<Sellers>) {
  const {
    state: {
      body: { sellers },
    },
  } = ctx

  ctx.status = 200
  ctx.body = sellers
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
