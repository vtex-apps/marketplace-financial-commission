import { getDatesInvoiced } from '../../../utils'

/**
 * @todo
 * tipear el formato de fecha que pide la API (ISO format)
 */
interface DateRange {
  start: string
  end: string
}

/**
 * Given a Seller and an optional Date range, return
 * all orders marked as INVOICED
 * @param sellersName the seller to query orders from
 * @param dateRange the date range in ISO format
 * @returns {VtexListOrder[]}
 */
export async function orderListInvoicedBySeller(
  ctx: Context,
  sellersName: string,
  dateRange?: DateRange
): Promise<VtexListOrder[]> {
  const {
    clients: { ordersClient },
  } = ctx

  const dateInvoiced = getDatesInvoiced()
  const dateStart = dateRange?.start ?? dateInvoiced.dateInvoiceInitial
  const dateEnd = dateRange?.end ?? dateInvoiced.dateInvoiceEnd
  const page = 1

  const orderListIni = await ordersClient.listOrders({
    fStatus: 'invoice,invoiced',
    fieldDate: 'invoicedDate',
    fieldDateStart: dateStart,
    fieldDateEnd: dateEnd,
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
        fieldDateStart: dateStart,
        fieldDateEnd: dateEnd,
        sellerName: sellersName,
        orderBy: 'invoicedDate',
        page: pages,
      })
    )
  }

  const orderList = await Promise.all(allOrders)

  return orderList
}
