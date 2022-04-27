/**
 * We extend native Errors to be able to catch status in the
 * error handler. Allowing us to pass additional data.
 */
export class ErorrWithPayload extends Error {
  public readonly status: number
  public readonly payload: any

  constructor({ message, status, payload }: any) {
    super(message)
    this.status = status
    this.payload = payload || null
  }
}
