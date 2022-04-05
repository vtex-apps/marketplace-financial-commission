// import { MOCK_INVOICES } from './__mocks__/getInvoice'

/**
 * @description Retrieves all the invoices of a given seller.
 * The Marketplace account has total access, while
 * the seller account can only retrieve their own.
 * @todo CHECK FOR TOKEN AUTHORIZATION / MARKETPLACE EXCEMPT
 * @todo FETCH INVOICES FACTORY MASTERDATA
 */
export async function invoicesBySeller(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: { /* logger, */ account },
    query: { seller },
    /* clients: { commissionInvoices }, */
  } = ctx

  if (account !== seller) {
    // eslint-disable-next-line no-console
    console.log('UNAUTHORIZED REQUEST')
  }

  /* const sellerInvoices = commissionInvoices.scroll() */

  /* logger.error({
    message: 'An error ocurred while fetching invoices for seller {seller}',
    data: null,
  }) */

  ctx.status = 200
  ctx.body = 'MOCK_INVOICES'

  await next()
}
