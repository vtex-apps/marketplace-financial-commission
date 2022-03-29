import { getDatesInvoiced } from '../../utils'
import { calculateCommissionByOrder } from './calculateCommissionByOrder'
import { orderListInvoicedBySeller } from './orderListInvoicedBySeller'

interface CalculateSellers {
  sellersDashboard: SellersDashboard[]
  statistics: StatsSeller
}

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function calculateSellers(
  ctx: Context,
  sellers: Sellers
): Promise<CalculateSellers> {
  const sellersDashboard: SellersDashboard[] = []
  const dateInvoiced = getDatesInvoiced()
  let ordersCountStats = 0
  let totalComissionStats = 0
  let totalOrderValueStats = 0

  await Promise.all(
    sellers.items.map(async (item) => {
      const orderListBySeller = await orderListInvoicedBySeller(ctx, item.name)

      const commissionByOrder = await calculateCommissionByOrder(
        ctx,
        orderListBySeller
      )

      const ordersCount = commissionByOrder.length
      const totalComission = commissionByOrder.reduce(
        (total, comis) => (total += comis.totalComission),
        0
      )

      const totalValueOrder = commissionByOrder.reduce(
        (total, value) => (total += value.totalOrderValue),
        0
      )

      const statsOrder: StatsSeller = {
        dateInvoiced: dateInvoiced.formattedDate,
        ordersCount,
        totalComission,
        totalOrderValue: totalValueOrder,
      }

      const sellersComission: SellersDashboard = {
        id: item.id,
        name: item.name,
        account: item.account ?? '',
        statistics: statsOrder,
      }

      ordersCountStats += ordersCount
      totalComissionStats += totalComission
      totalOrderValueStats += totalValueOrder

      sellersDashboard.push(sellersComission)
    })
  )

  const responseCalculateDashboard: CalculateSellers = {
    sellersDashboard,
    statistics: {
      ordersCount: ordersCountStats,
      totalComission: totalComissionStats,
      totalOrderValue: totalOrderValueStats,
    },
  }

  return responseCalculateDashboard
}
