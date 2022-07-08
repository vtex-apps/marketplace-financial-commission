export async function updateInvoiceExternal(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    state: {
      body: { requestData },
    },
    vtex: {
      route: {
        params: { id },
      },
    },
    clients: { externalInvoices },
  } = ctx

  let message
  let status

  const getInvoice = await externalInvoices.get(id as string, ['_all'])

  if (getInvoice) {
    await externalInvoices.update(id as string, requestData)
    message = {
      invoiceId: id,
      message: 'The invoice has been successfully update ',
    }
    status = 200
  } else {
    message = {
      invoiceId: id,
      message: 'The invoice no found, please verify ',
    }
    status = 404
  }

  ctx.status = status
  ctx.body = message
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
