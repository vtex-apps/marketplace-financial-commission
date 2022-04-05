import type { ClientsConfig, ServiceContext } from '@vtex/api'
import { IOClients, LRUCache } from '@vtex/api'

import DashboardIO from './dashboard'
import SellerIO from './sellers'
import StatsIO from './stats'
import OrdersIO from './orders'

export class Clients extends IOClients {
  public get DashboardIO() {
    return this.getOrSet('DashboardIO', DashboardIO)
  }

  public get SellerIO() {
    return this.getOrSet('SellerIO', SellerIO)
  }

  public get StatsIO() {
    return this.getOrSet('SellerIO', StatsIO)
  }

  public get OrdersIO() {
    return this.getOrSet('OrdersIO', OrdersIO)
  }
}

declare global {
  type Context = ServiceContext<Clients>
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
