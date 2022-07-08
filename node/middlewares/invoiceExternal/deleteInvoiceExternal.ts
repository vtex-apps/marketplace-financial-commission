export async function deleteInvoiceExternal(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
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
    await externalInvoices.delete(id as string)
    message = {
      invoiceId: id,
      message: 'The invoice has been successfully deleted ',
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
