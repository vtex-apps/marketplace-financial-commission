import type { ParamsContext, RecorderState } from '@vtex/api'
import { Service, method } from '@vtex/api'

import type { Clients } from './clients'
import clients from './clients'
import { GenerateDashboard } from './middlewares/dashboard/generateDashboard'
import { SearchDashboard } from './middlewares/dashboard/searchDashboard'
import { sellers } from './middlewares/sellers'
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
      GET: [sellers],
    }),
    generateDashboard: method({
      GET: [GenerateDashboard],
    }),
    searchdashboard: method({
      GET: [SearchDashboard],
    }),
  },
})
