export async function sellers(ctx: Context, next: () => Promise<Sellers>) {
  const {
    clients: { sellersIO },
  } = ctx

<<<<<<< HEAD
  console.info('estoy acaaaaaaaaaa')
  const respsellers = await sellersIO.getSellers()
=======
  console.info('headers', ctx.headers)
  console.info('authToken', ctx.vtex.authToken)
  const respsellers = await sellersIO.GetSellers()
>>>>>>> 87d3d8e (Commit get sellers via GrapghQL)

  console.info('sellers', respsellers)

  ctx.status = 200
  ctx.body = respsellers
  ctx.set('Cache-Control', 'no-cache ')
  await next()
}
