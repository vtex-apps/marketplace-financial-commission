interface EmailData {
  email: string
  jsonData: string
}

interface SendEmailInput {
  emailData: EmailData
}

export const sendEmail = async (
  _: unknown,
  params: SendEmailInput,
  ctx: Context
) => {
  const {
    clients: { mail },
  } = ctx

  if (!params.emailData.email) {
    return 'Specify an email address'
  }

  const response = await mail.sendMail({
    templateName: 'invoice-detail',
    jsonData: {
      message: {
        to: params.emailData.email,
      },
      ...JSON.parse(params.emailData.jsonData),
    },
  })

  if (response) {
    return 'ok'
  }

  return 'error'
}
