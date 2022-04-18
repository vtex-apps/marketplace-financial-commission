export async function sendMail(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { mail },
  } = ctx

  console.info(
    'Sending mail**********************************************------>'
  )

  const sendEmailResponse = await mail.sendMail({
    templateName: 'invoice-detail',
    jsonData: {
      message: {
        to: 'andres.moreno@vtex.com.br',
      },
    },
  })

  console.info('Response************')
  console.info(sendEmailResponse)

  await next()
}
