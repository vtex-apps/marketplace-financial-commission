import { getDatesInvoiced } from '../../utils'

export async function orderListInvoicedBySeller(
  ctx: Context,
  sellersName: string
): Promise<any> {
  const {
    clients: { ordersClient },
  } = ctx

  const dateInvoiced = getDatesInvoiced()
  const page = 1

  const orderListIni = await ordersClient.listOrders({
    fStatus: 'invoice,invoiced',
    fieldDate: 'invoicedDate',
    fieldDateStart: dateInvoiced.dateInvoiceInitial,
    fieldDateEnd: dateInvoiced.dateInvoiceEnd,
    sellerName: sellersName,
    orderBy: 'invoicedDate',
    page,
  })

  const allOrders = []

  for (let pages = 0; pages <= orderListIni.paging.pages; pages++) {
    allOrders.push(
      ordersClient.listOrders({
        fStatus: 'invoice,invoiced',
        fieldDate: 'invoicedDate',
        fieldDateStart: dateInvoiced.dateInvoiceInitial,
        fieldDateEnd: dateInvoiced.dateInvoiceEnd,
        sellerName: sellersName,
        orderBy: 'invoicedDate',
        page: pages,
      })
    )
  }

  const orderList = await Promise.all(allOrders)

  return orderList
}
