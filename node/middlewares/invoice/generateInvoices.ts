/**
 * @description Starts the process which will create
 * an invoice for each seller.
 */
export async function generateInvoices(ctx: Context, next: () => Promise<any>) {
  ctx.status = 200
  ctx.body = 'ENDPOINT IN DEVELOPMENT'

  await next()
}
