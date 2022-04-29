import { searchSellersService } from '../../../services/searchSellersService'
import { validationParams } from '../../validationParams'

export async function searchSellers(ctx: Context, next: () => Promise<any>) {
  const dateStart = ctx.query.dateStart as string
  const dateEnd = ctx.query.dateEnd as string
  const sellersId = ctx.query.sellersId as string
  const page = Number(ctx.query.page)
  const pageSize = Number(ctx.query.pageSize)
  const reIndex = JSON.parse(
    (ctx.query.reIndex as string) ?? 'false'
  ) as boolean

  await validationParams('Sellers', ctx.query)

  const searchSellersParams = {
    dateStart,
    dateEnd,
    sellersId,
    page,
    pageSize,
    reIndex,
  }

  const { status, result } = await searchSellersService(
    searchSellersParams,
    ctx
  )

  ctx.status = status
  ctx.body = result
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
