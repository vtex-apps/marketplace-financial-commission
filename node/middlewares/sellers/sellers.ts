export async function sellers(ctx: Context, next: () => Promise<Sellers>) {
  const {
    clients: { sellersIO },
  } = ctx

  const respsellers = await sellersIO.getSellers()

  ctx.state.body = { sellers: respsellers }

  await next()
}
