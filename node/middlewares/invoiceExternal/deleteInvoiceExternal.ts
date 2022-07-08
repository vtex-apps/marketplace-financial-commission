export async function getInvoiceExternal(
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
}
