export async function policy(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: {
        seller,
        params: { id },
      },
    },
  } = ctx

  const { name } = seller as Seller

  ctx.query.sellerName = name
  ctx.vtex.route.params.id = id as string

  await next()
}
