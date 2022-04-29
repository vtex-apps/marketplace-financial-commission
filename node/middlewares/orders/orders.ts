import { searchOrdersService } from '../../services/searchOrdersService'
import { validationParams } from '../validationParams'

export async function orders(ctx: Context, next: () => Promise<Sellers>) {
  const dateStart = ctx.query.dateStart as string
  const dateEnd = ctx.query.dateEnd as string
  const sellerName = ctx.query.sellerName as string
  const page = Number(ctx.query.page)
  const perpage = Number(ctx.query.perpage)
  const statusVtex = ctx.query.status as string

  await validationParams('Orders', ctx.query)

  const searchOrdersParams = {
    dateStart,
    dateEnd,
    sellerName,
    page,
    perpage,
    status: statusVtex,
  }

  const { status, resultDetail } = await searchOrdersService(
    searchOrdersParams,
    ctx
  )

  ctx.status = status
  ctx.body = resultDetail
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
