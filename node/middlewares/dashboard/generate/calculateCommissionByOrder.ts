export async function calculateCommissionByOrder(
  ctx: Context,
  orderListBySeller: VtexListOrder[]
): Promise<OrderComission[]> {
  const {
    clients: { ordersClient },
  } = ctx

  const formatVtexNumber = (v: number) => v / 100

  const commissionByOrder: OrderComission[] = await Promise.all(
    orderListBySeller[0].list.map(async (order) => {
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

      const totalOrderValue = formatVtexNumber(orderData.value)
      const totalDiscounts = orderData.totals
        .filter((x) => x.id === 'Discounts')
        .reduce((total, x) => (total += formatVtexNumber(x.value)), 0)

      const totalOrdersItems = orderData.totals
        .filter((x) => x.id === 'Items')
        .reduce((total, x) => (total += formatVtexNumber(x.value)), 0)

      const totalShipping = orderData.totals
        .filter((x) => x.id === 'Shipping')
        .reduce((total, x) => (total += formatVtexNumber(x.value)), 0)

      const totalTax = orderData.totals
        .filter((x) => x.id === 'Tax')
        .reduce((total, x) => (total += formatVtexNumber(x.value)), 0)

      const lines: OrderComission = {
        orderId: order.orderId,
        totalComission,
        totalOrderValue,
        totalDiscounts,
        totalOrdersItems,
        totalShipping,
        totalTax,
        // TODO: Calculete correctly
        totalOrderRate: null,
      }

      return lines
    })
  )

  return commissionByOrder
}
