import type {
  IOContext,
  InstanceOptions,
  Serializable,
  GraphQLResponse,
} from '@vtex/api'
import { AppGraphQLClient } from '@vtex/api'

import { GET_SELLERS } from './queries'

class CustomGraphQLError extends Error {
  public graphQLErrors: any

  constructor(message: string, graphQLErrors: any[]) {
    super(message)
    this.graphQLErrors = JSON.stringify(graphQLErrors)
  }
}

function throwOnGraphQLErrors<T extends Serializable>(message: string) {
  return function maybeGraphQLResponse(response: GraphQLResponse<T>) {
    if (response?.errors && response.errors.length > 0) {
      throw new CustomGraphQLError(message, response.errors)
    }

    return response
  }
}

export default class SellersIO extends AppGraphQLClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.sellers-graphql@8.x', context, {
      ...options,
      headers: {
        ...options?.headers,
        cookie: `VtexIdclientAutCookie=${context.authToken}`,
      },
    })
  }

  public getSellers = async (): Promise<Sellers> => {
    const sellers = await this.graphql
      .query<Data, Record<string, unknown>>(
        {
          query: GET_SELLERS,
          variables: {},
        },
        {
          metric: 'get-sellers',
        }
      )
      .then(
        throwOnGraphQLErrors(
          'Error getting items data from vtex.sellers-graphql'
        )
      )
      .then((query) => {
        return query.data?.sellers as Sellers
      })

    return sellers
  }
}
