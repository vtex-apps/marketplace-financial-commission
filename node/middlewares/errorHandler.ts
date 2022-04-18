/**
 * By awaiting the next middleware, we can use this scope to
 * centralize emitted errors down the promise chain.
 */
export async function errorHandler(ctx: Context, next: () => Promise<void>) {
  const {
    vtex: { logger },
  } = ctx

  try {
    await next()
  } catch (error: any) {
    const { message, status, payload } = error

    logger.error({
      message,
      data: error,
    })

    /**
     * @todo
     * Le mandamos al CRON un custom status para retries?
     * Podriamos enviarle un payload[] con los sellers que fallaron,
     * y reintentar esos. (Hasta 3 veces)
     */
    ctx.status = status || 500
    ctx.body = payload ? { message, payload } : message
  }
}
