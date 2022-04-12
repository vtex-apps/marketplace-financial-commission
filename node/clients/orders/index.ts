import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

const baseURL = 'api/oms/pvt/orders'

const routes = {
  getOrder: (orderId: string) => `${baseURL}/${orderId}`,
  listOrders: (params: ParamsListOrders) => {
    const {
      fStatus,
      fieldDate,
      fieldDateStart,
      fieldDateEnd,
      sellerName,
      orderBy,
      page,
      perpage,
    } = params

    return `${baseURL}?f_status=${fStatus}&f_${fieldDate}=${fieldDate}:[${fieldDateStart} TO ${fieldDateEnd}]&f_sellerNames=${sellerName}&orderBy=${orderBy},desc&page=${page}&per_page=${
      perpage ?? 100
    }`
  },
}

export class OrdersClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'true',
        'Content-Type': 'application/json',
        vtexIdClientAutCookie: context.authToken,
      },
    })
  }

  public async getOrder(orderId: string): Promise<VtexOrder> {
    const { logger } = this.context

    try {
      const order = await this.http.get(routes.getOrder(orderId))

      return order
    } catch (err) {
      logger.error({
        workflowInstance: 'GetOrder',
        message: 'Error Getting VTEX order',
        exception: err,
      } as LoggerMessage)

      throw err
    }
  }

  /* eslint max-params: ["error", 4] */
  public async listOrders(params: ParamsListOrders): Promise<VtexListOrder> {
    const { logger } = this.context

    try {
      const order = await this.http.get<VtexListOrder>(
        routes.listOrders(params)
      )

      return order
    } catch (err) {
      logger.error({
        workflowInstance: 'GetListOrders',
        message: 'Error Getting VTEX List Order',
        exception: err,
      } as LoggerMessage)

      throw err
    }
  }
}
