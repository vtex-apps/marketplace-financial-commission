import type { ClientsConfig } from '@vtex/api'
import type {
  SellersDashboard,
  StatisticsDashboard,
} from 'vtex.marketplace-financial-commission'
import { IOClients, LRUCache } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'

import { OrdersClient } from './orders'
import SellersIO from './sellers'
import Template from './template'

export class Clients extends IOClients {
  public get sellersIO() {
    return this.getOrSet('sellersIO', SellersIO)
  }

  public get template() {
    return this.getOrSet('template', Template)
  }

  public get ordersClient() {
    return this.getOrSet('ordersClient', OrdersClient)
  }

  public get sellersDashboardClientMD() {
    return this.getOrSet(
      'sellersdashboards',
      masterDataFor<SellersDashboard>('sellersdashboards')
    )
  }

  public get statisticsDashboardClientMD() {
    return this.getOrSet(
      'statisticsDashboards',
      masterDataFor<StatisticsDashboard>('statisticsDashboards')
    )
  }
}

const TIMEOUT_MS = 20000
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
