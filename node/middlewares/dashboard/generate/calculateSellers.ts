import { calculateCommissionByOrder } from './calculateCommissionByOrder'
import { orderListInvoicedBySeller } from './orderListInvoicedBySeller'

interface CalculateSellers {
  sellersDashboard: SellersDashboard[]
  statistics: StatsSeller
}

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export async function calculateSellers(
  ctx: Context,
  sellers: Sellers,
  dateRange?: DateRange | undefined
): Promise<CalculateSellers> {
  const sellersDashboard: SellersDashboard[] = []
  let ordersCountStats = 0
  let totalComissionStats = 0
  let totalOrderValueStats = 0
  let totalDiscountsStats = 0
  let totalOrdersItemsStats = 0
  let totalShippingStats = 0
  let totalTaxStats = 0

  await Promise.all(
    sellers.items.map(async (item) => {
      const orderListBySeller = await orderListInvoicedBySeller(
        ctx,
        item.name,
        dateRange
      )

      const commissionByOrder = await calculateCommissionByOrder(
        ctx,
        orderListBySeller
      )

      const ordersCount = commissionByOrder.length
      const totalComission = commissionByOrder.reduce(
        (total, comis) => (total += comis.totalComission),
        0
      )

      const totalOrderValue = commissionByOrder.reduce(
        (total, value) => (total += value.totalOrderValue),
        0
      )

      const totalDiscounts = commissionByOrder.reduce(
        (total, value) => (total += value.totalDiscounts ?? 0),
        0
      )

      const totalOrdersItems = commissionByOrder.reduce(
        (total, value) => (total += value.totalOrdersItems ?? 0),
        0
      )

      const totalShipping = commissionByOrder.reduce(
        (total, value) => (total += value.totalShipping ?? 0),
        0
      )

      const totalTax = commissionByOrder.reduce(
        (total, value) => (total += value.totalTax ?? 0),
        0
      )

      const statsOrder: StatsSeller = {
        ordersCount,
        totalComission,
        totalOrderValue,
        totalDiscounts,
        totalOrdersItems,
        totalShipping,
        totalTax,
        /**
         * TODO @todo de donde obtener este valor
         */
        outstandingBalance: 0,
      }

      const sellersComission: SellersDashboard = {
        id: item.id,
        name: item.name,
        account: item.account ?? '',
        statistics: statsOrder,
      }

      ordersCountStats += ordersCount
      totalComissionStats += totalComission
      totalOrderValueStats += totalOrderValue
      totalDiscountsStats += totalDiscounts
      totalOrdersItemsStats += totalOrdersItems
      totalShippingStats += totalShipping
      totalTaxStats += totalTax

      sellersDashboard.push(sellersComission)
    })
  )

  const responseCalculateDashboard: CalculateSellers = {
    sellersDashboard,
    statistics: {
      ordersCount: ordersCountStats,
      totalComission: totalComissionStats,
      totalOrderValue: totalOrderValueStats,
      totalDiscounts: totalDiscountsStats,
      totalOrdersItems: totalOrdersItemsStats,
      totalShipping: totalShippingStats,
      totalTax: totalTaxStats,
    },
  }

  return responseCalculateDashboard
}
