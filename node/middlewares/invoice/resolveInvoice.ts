/* eslint-disable padding-line-between-statements */
import type { CommissionInvoice } from 'vtex.marketplace-financial-commission'

import { getInvoice, createOrUpdateInvoice, deleteInvoice } from './index'

type InvoiceEndpointResponse = CommissionInvoice | string | null

export async function resolveInvoice(ctx: Context) {
  const {
    method,
    query: { id },
  } = ctx

  let body: InvoiceEndpointResponse

  switch (method) {
    case 'PATCH':
    case 'POST':
      body = await createOrUpdateInvoice(ctx)
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
