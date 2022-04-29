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

      const totalComission = Number(
        orderData.items
          .reduce(
            (total, x) =>
              total +
              x.quantity *
                (formatVtexNumber(x.price) *
                  formatVtexNumber(formatVtexNumber(x.commission)) +
                  formatVtexNumber(x.shippingPrice ?? 0) *
                    formatVtexNumber(
                      formatVtexNumber(x.freightCommission ?? 0)
                    )),
            0
          )
          .toFixed(2)
      )

      const totalOrderValue = Number(
        formatVtexNumber(orderData.value).toFixed(2)
      )

      const itemsRate: ItemsRate[] = orderData.items.map((item) => {
        return {
          itemId: item.id,
          nameItem: item.name,
          rate: {
            freightCommissionPercentage: Number(
              formatVtexNumber(item.freightCommission).toFixed(2)
            ),
            productCommissionPercentage: Number(
              formatVtexNumber(item.commission).toFixed(2)
            ),
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
