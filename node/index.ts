import type { ParamsContext, RecorderState } from '@vtex/api'
import { Service, method } from '@vtex/api'

import type { Clients } from './clients'
import clients from './clients'
import { generate } from './middlewares/dashboard/generate'
import { search } from './middlewares/dashboard/search'
import { sellers } from './middlewares/sellers/sellers'
import { sellersResponse } from './middlewares/sellers/sellersresponse'
import { queries /* , mutations */ } from './resolvers'

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  graphql: {
    resolvers: {
      Query: {
        ...queries,
      } /*
      Mutation: {
        ...mutations,
      }, */,
    },
  },
  routes: {
    sellers: method({
      GET: [sellers, sellersResponse],
    }),
    generateDashboard: method({
      GET: [sellers, generate],
    }),
    searchDashboard: method({
      GET: [search],
    }),
  },
})
