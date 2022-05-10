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
  } catch (err) {
    const error = err as any
    const { message, status, payload } = error

    logger.error({
      message,
      data: error,
    })

    ctx.status = status || 500
    ctx.body = payload ? { message, payload } : message
  }
}
