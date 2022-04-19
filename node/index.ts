import type { ParamsContext, RecorderState } from '@vtex/api'
import { Service } from '@vtex/api'

import clients from './clients'
import type { Clients } from './clients'
import { queries, mutations } from './resolvers'
import { routes } from './routes'

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  routes,
  graphql: {
    resolvers: {
      Query: {
        ...queries,
      },
      Mutation: {
        ...mutations,
      },
    },
  },
})
