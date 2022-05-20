import { json } from 'co-body'

export async function sendMail(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { mail },
  } = ctx

  const body = await json(ctx.req)

  const { email } = body

  if (!email) {
    ctx.status = 400
    ctx.body = 'Specify an email address'

    return
  }

  // If users sends a json structure
  let data = {}

  if (body.jsonData) {
    data = { ...body.jsonData }
  } else {
    const { invoiceId } = body

    if (!invoiceId) {
      ctx.status = 400
      ctx.body = 'Specify an invoiceId'

      return
    }

    console.info('This is the invoice ID***************')
    console.info(invoiceId)

    // TODO: Get invoice from backend

    // TODO: Change mock invoice for real invoice
    const invoice = {
      id: 'sellerA_3918239129',
      status: 'paid',
      invoiceCreatedDate: '25/02/2022',
      invoiceDueDate: '15/03/2022',
      seller: {
        name: 'Seller A',
        id: 'SellerId',
        contact: {
          phone: '+34874958678',
          fax: null,
          email: 'sesarocampo@sellera.com',
        },
      },
      comment: 'Comments from seller',
      orders: [
        {
          orderId: '10012931-12',
          total: 1200.0,
          commission: 400.0,
          totalOrderRate: 0.3,
        },
        {
          orderId: '11212924-14',
          total: 500.0,
          commission: 100.0,
          totalOrderRate: 0.2,
        },
        {
          orderId: '13312931-13',
          total: 1500.0,
          commission: 1000.0,
          totalOrderRate: 0.6,
        },
      ],
      totalizers: {
        subtotal: 1500,
        tax: {
          type: 'percentage',
          value: 10,
        },
        fee: 150,
        total: 1800,
      },
    }

    data = {
      ...invoice,
    }
  }

  const sendEmailResponse = await mail.sendMail({
    templateName: 'invoice-detail',
    jsonData: {
      message: {
        to: email,
      },
      ...data,
    },
  })

  if (sendEmailResponse) {
    ctx.status = 200
    ctx.body = 'ok'
  }

  await next()
}
