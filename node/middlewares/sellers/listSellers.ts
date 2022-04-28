/* eslint-disable no-await-in-loop */
export async function listSellers(ctx: Context): Promise<Sellers> {
  const {
    clients: { sellersIO },
  } = ctx

  const ArraySellers: ItemSeller[] = []
  let from = 0
  let to = 100
  let total = 0

  while (total !== to) {
    let sellersParams: SellerListParams = {
      pagination: {
        from,
        to,
      },
    }

    const respsellers = await sellersIO.getSellers(sellersParams)

    respsellers.items.forEach((seller) => {
      ArraySellers.push(seller)
    })

    total = respsellers.paging.total ?? 0

    if (total <= to) {
      console.info('Into to break')
      break
    }

    const totalProcessPending = total - to

    console.info(
      `totalProcessPending ----------------------------------> ${totalProcessPending}`
    )

    from = to
    to = total > totalProcessPending ? from + 100 : totalProcessPending

    sellersParams = {
      pagination: {
        from,
        to,
      },
    }
  }

  const sellers: Sellers = {
    items: ArraySellers,
    paging: {
      total,
    },
  }

  return sellers
}
