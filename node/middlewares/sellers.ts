export async function sellers(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { sellersIO },
  } = ctx

  console.info('headers', ctx.headers)
  console.info('authToken', ctx.vtex.authToken)
  const respsellers = await sellersIO.GetSellers()

  console.info('sellers', respsellers)

  ctx.status = 200
  ctx.body = respsellers
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
