// eslint-disable-next-line max-params
export async function orderListSeller(
  ctx: Context,
  sellerName: string,
  dateStart: string,
  dateEnd: string,
  page: number,
  perpage: number
): Promise<VtexListOrder> {
  const {
    clients: { ordersClient },
  } = ctx

  const orderList = await ordersClient.listOrders({
    fStatus: '',
    fieldDate: 'creationDate',
    fieldDateStart: `${dateStart}T00:00:00.000Z`,
    fieldDateEnd: `${dateEnd}T23:59:59.999Z`,
    sellerName,
    orderBy: 'creationDate',
    page,
    perpage,
  })

  return orderList
}
