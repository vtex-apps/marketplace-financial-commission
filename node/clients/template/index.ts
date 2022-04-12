import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

const TEMPLATE_RENDER_PATH = '/api/template-render/pvt/templates'

export default class Template extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdClientAutCookie: context.authToken,
      },
    })
  }

  public getTemplate() {
    return this.http.get(`${TEMPLATE_RENDER_PATH}/invoice-detail`, {
      metric: 'mail-get-template',
    })
  }

  public publishTemplate(template: TemplateType) {
    return this.http.post(TEMPLATE_RENDER_PATH, template, {
      metric: 'mail-post-template',
    })
  }
}

interface TemplateType {
  AccountId?: string
  AccountName?: string
  ApplicationId?: string
  Description?: string
  FriendlyName: string
  IsDefaultTemplate: boolean
  IsPersisted: boolean
  IsRemoved: boolean
  Name: string
  Type: string
  Templates: {
    email: {
      To: string
      CC?: string
      BCC?: string
      Subject: string
      Message: string
      Type: string
      ProviderId: string
      ProviderName?: string
      IsActive: boolean
      withError: boolean
    }
    sms: {
      Type: string
      ProviderId?: string
      ProviderName?: string
      IsActive: boolean
      withError: boolean
      Parameters: string[]
    }
  }
}
