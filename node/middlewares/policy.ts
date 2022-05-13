export async function policy(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: { seller },
    },
  } = ctx

  const { name } = seller as Seller

  ctx.query.sellerName = name

  await next()
}
