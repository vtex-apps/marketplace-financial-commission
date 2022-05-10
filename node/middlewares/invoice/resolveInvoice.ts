/* eslint-disable padding-line-between-statements */

import {
  getInvoice,
  createInvoice,
  deleteInvoice,
  updateInvoice,
} from './index'

export async function resolveInvoice(ctx: Context): Promise<void> {
  const {
    method,
    query: { id },
  } = ctx

  let body: any

  switch (method) {
    case 'PATCH':
      body = await updateInvoice(ctx)
      break

    case 'POST':
      body = await createInvoice(ctx)
      break

    case 'DELETE':
      body = await deleteInvoice(ctx)
      break

    default:
    case 'GET':
      body = await getInvoice(ctx)
      break
  }

  if (!body) {
    ctx.status = 404
    ctx.body = `Invoice '${id}' not found`
  }

  ctx.status = 200
  ctx.body = body
}
