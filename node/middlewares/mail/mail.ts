import { json } from 'co-body'

export async function sendMail(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { mail },
  } = ctx

  const body = await json(ctx.req)

  const sendEmailResponse = await mail.sendMail({
    templateName: 'invoice-detail',
    jsonData: {
      message: {
        to: body.email,
      },
      ...body.jsonData,
    },
  })

  if (sendEmailResponse) {
    ctx.status = 200
    ctx.body = 'ok'
  }

  await next()
}
