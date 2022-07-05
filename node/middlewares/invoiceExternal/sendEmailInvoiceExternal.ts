import { config } from '../../constants'
import type {
  EmailInvoiceData,
  InvoiceExternal,
} from '../../typings/externalInvoice'

export const sendEmailInvoiceExternal = async (
  ctx: Context,
  documentId: string,
  dataInvoice: InvoiceExternal
): Promise<any> => {
  try {
    const {
      clients: { mail },
    } = ctx

    const emailData: EmailInvoiceData = {
      id: documentId,
      createdDate: dataInvoice.createdDate,
      seller: dataInvoice.seller,
      status: dataInvoice.status,
      jsonData: JSON.parse(dataInvoice.jsonData),
    }

    await mail.sendMail({
      templateName: config.INVOICE_MAIL_TEMPLATE_EXTERNAL,
      jsonData: {
        message: {
          to: dataInvoice.seller.contact.email,
        },
        ...emailData,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
