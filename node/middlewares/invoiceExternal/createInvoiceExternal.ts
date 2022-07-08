import { processInvoiceExternal } from './processInvoiceExternal'
import { sendEmailInvoiceExternal } from './sendEmailInvoiceExternal'

export async function createInvoiceExternal(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    state: {
      body: { requestData },
    },
  } = ctx

  let status
  let body

  const documentMD = await processInvoiceExternal(ctx, requestData)
  const { DocumentId } = documentMD
  const documentId = DocumentId

  if (documentId) {
    try {
      await sendEmailInvoiceExternal(ctx, documentId, requestData)
    } catch (error) {
      console.error(error)
    }

    status = 200
    body = {
      message: `Invoice Created, Shortly you will receive an email with the invoice created to your email address. ${requestData.seller.contact.email}`,
      id: documentId,
    }
  } else {
    status = 400
    body = {
      message: `It was not possible to create the invoice`,
      exception: documentMD,
    }
  }

  ctx.status = status
  ctx.body = body
  ctx.set('Cache-Control', 'no-cache ')

  await next()
}
