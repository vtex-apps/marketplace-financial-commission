import { config } from '../../constants'

export async function getInvoiceExternal(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: {
        params: { id },
      },
    },
    clients: { vbase },
  } = ctx

  let resultList

  console.info('🚀 ~ file: getInvoiceExternal.ts ~ line 19 ~ id', id)

  if (id !== '') {
    console.info('Entre aca getFile')

    resultList = await vbase.getFile(
      config.INVOICE_EXTERNAL_BUCKET,
      id as string
    )
  } else {
    console.info('Entre aca listFiles')

    resultList = (await vbase.listFiles(config.INVOICE_EXTERNAL_BUCKET)).data
  }

  ctx.status = 200
  ctx.body = { resultList }
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
