import type { ClientsConfig, ServiceContext } from '@vtex/api'
import { IOClients, LRUCache } from '@vtex/api'
import { OMS } from '@vtex/clients'

import { OrdersClient } from './orders'
import SellersIO from './sellers'

export class Clients extends IOClients {
  public get sellersIO() {
    return this.getOrSet('sellersIO', SellersIO)
  }

  public get omsClient() {
    return this.getOrSet('omsClient', OMS)
  }

  public get ordersClient() {
    return this.getOrSet('ordersClient', OrdersClient)
  }
}

declare global {
  type Context = ServiceContext<Clients>

  type LoggerMessage = {
    workflowInstance: string
    message: string
    exception?: string
    request?: any
  }
}

const TIMEOUT_MS = 5000
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('financial-commission', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
      memoryCache,
    },
  },
}

export default clients
