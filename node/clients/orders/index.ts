import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import Polly from 'polly-js'
import fetch from 'node-fetch'

const routes = {
  getOrder: (account: string, orderId: string) =>
    `${routes.baseUrl(account)}/${orderId}`,
  listOrders: (account: string, params: ParamsListOrders) => {
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

    return `${routes.baseUrl(
      account
    )}?f_status=${fStatus}&f_${fieldDate}=${fieldDate}:[${fieldDateStart} TO ${fieldDateEnd}]&f_sellerNames=${sellerName}&orderBy=${orderBy},desc&page=${page}&per_page=${
      perpage ?? 100
    }`
  },
  baseUrl: (account: string) =>
    `https://${account}.vtexcommercestable.com.br/api/oms/pvt/orders`,
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
      const loadData = () => {
        return Polly()
          .waitAndRetry([1000, 2000, 3000, 4000, 5000, 6000, 7000])
          .executeForPromise(async () => {
            const rsp = await fetch(
              routes.getOrder(this.context.account, orderId),
              {
                method: 'get',
                headers: this.options?.headers,
              }
            )

            if (rsp.ok) {
              return rsp.json()
            }

            return Promise.reject(rsp)
          })
      }
      // const order = await this.http.get(routes.getOrder(orderId))

      const order = await loadData()

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
      const loadData = () => {
        return Polly()
          .waitAndRetry([1000, 2000, 3000, 4000, 5000, 6000, 7000])
          .executeForPromise(async () => {
            const rsp = await fetch(
              routes.listOrders(this.context.account, params),
              {
                method: 'get',
                headers: this.options?.headers,
              }
            )

            if (rsp.ok) {
              return rsp.json()
            }

            return Promise.reject(rsp)
          })
      }

      const listOrders = await loadData()

      // const order = await this.http.get<VtexListOrder>(
      //   routes.listOrders(params)
      // )

      return listOrders
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
