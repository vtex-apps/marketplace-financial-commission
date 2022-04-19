import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import { pipe } from 'ramda'

interface MailParameters {
  templateName: string
  jsonData: JsonData
}

interface JsonData {
  message: {
    to: string
  }
}

const withCookieAsHeader =
  (context: IOContext) =>
  (options: InstanceOptions): InstanceOptions => ({
    ...options,
    headers: {
      VtexIdclientAutCookie: context.authToken,
      ...(options?.headers ?? {}),
    },
  })

export default class Mail extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options && pipe(withCookieAsHeader(context))(options))
  }

  public async sendMail(mailData: MailParameters): Promise<string> {
    const data = {
      ...mailData,
    }

    return this.http.post(`/api/mail-service/pvt/sendmail`, data)
  }
}
