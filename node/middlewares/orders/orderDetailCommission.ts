export async function orderDetailCommission(
  ctx: Context,
  orderListBySeller: VtexListOrder
): Promise<Order[]> {
  const {
    clients: { ordersClient },
  } = ctx

  const formatVtexNumber = (v: number) => v / 100

  const orderSeller: Order[] = await Promise.all(
    orderListBySeller.list.map(async (order) => {
      const orderData = await ordersClient.getOrder(order.orderId)

      const totalComission = orderData.items.reduce(
        (total, x) =>
          total +
          (formatVtexNumber(x.price) *
            formatVtexNumber(formatVtexNumber(x.commission)) +
            formatVtexNumber(x.shippingPrice ?? 0) *
              formatVtexNumber(formatVtexNumber(x.freightCommission ?? 0))),
        0
      )

      const totalOrderValue = orderData.items.reduce(
        (total, x) => (total += formatVtexNumber(x.price)),
        0
      )

      const itemsRate: ItemsRate[] = orderData.items.map((item) => {
        return {
          itemId: item.id,
          nameItem: item.name,
          rate: {
            freightCommissionPercentage: item.freightCommission,
            productCommissionPercentage: item.commission,
          },
        }
      })

      const item: Order = {
        orderId: orderData.orderId,
        sellerOrderId: orderData.sellerOrderId,
        totalOrderValue,
        totalComission,
        status: orderData.status,
        statusDescription: orderData.statusDescription,
        creationDate: orderData.creationDate,
        rate: itemsRate,
      }

      return item
    })
  )

  return orderSeller
}
