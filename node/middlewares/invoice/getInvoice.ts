/**
 * @description Retrieves a specific Invoice by ID.
 * The Marketplace account has total access, while
 * the seller account can only fetch theirs.
 */
export async function getInvoice(ctx: Context, next: () => Promise<any>) {
  const {
    query: { id },
  } = ctx

  ctx.status = 200
  ctx.body = `ENDPOINT IN DEVELOPMENT. Invoice ID: ${id}`

  await next()
}
