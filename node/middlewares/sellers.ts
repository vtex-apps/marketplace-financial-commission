export async function sellers(ctx: Context, next: () => Promise<Sellers>) {
  const {
    clients: { sellersIO },
  } = ctx

  const respsellers = await sellersIO.getSellers()

  ctx.status = 200
  ctx.body = respsellers
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
