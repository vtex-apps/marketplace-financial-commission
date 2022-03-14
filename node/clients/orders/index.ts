import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

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
    const baseUrl = `http://${this.context.account}.vtexcommercestable.com.br/api`

    try {
      const order = await this.http.get(`api/oms/pvt/orders/${orderId}`)

      logger.info({
        workflowInstance: 'GetOrder',
        message: 'Getting VTEX Order',
        data: JSON.stringify({
          request: JSON.stringify({
            url: `${baseUrl}/oms/pvt/orders/${orderId}`,
          }),
          response: '',
        }),
      })

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
  public async listOrders(
    invoicedDateInit: string,
    invoicedDateEnd: string,
    page: number,
    sellerName: string
  ): Promise<VtexListOrder> {
    const { logger } = this.context
    // const baseUrl = `http://${this.context.account}.vtexcommercestable.com.br/api`

    try {
      const order = await this.http.get<VtexListOrder>(
        `api/oms/pvt/orders?f_status=invoice,invoiced&f_invoicedDate=invoicedDate:[${invoicedDateInit} TO ${invoicedDateEnd}]&f_sellerNames=${sellerName}&orderBy=invoicedDate,desc&page=${page}&per_page=100`
      )

      // console.info(
      //   `${baseUrl}/oms/pvt/orders?f_status=invoice,invoiced&f_invoicedDate=invoicedDate:[${invoicedDateInit} TO ${invoicedDateEnd}]&f_sellerNames=${sellerName}&orderBy=invoicedDate,desc&page=${page}&per_page=100`
      // )

      // logger.info({
      //   workflowInstance: 'GetOrder',
      //   message: 'Getting VTEX Order',
      //   data: JSON.stringify({
      //     request: JSON.stringify({
      //       url: `${baseUrl}/oms/pvt/orders`,
      //     }),
      //     response: JSON.stringify(order),
      //   }),
      // })

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
}
