import type {
  IOContext,
  InstanceOptions,
  Serializable,
  GraphQLResponse,
} from '@vtex/api'
import { AppGraphQLClient } from '@vtex/api'

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

export default class StatsIO extends AppGraphQLClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.sellers-graphql@8.x', context, {
      ...options,
      headers: {
        ...options?.headers,
        Cookie: `VtexIdclientAutCookie=${context.adminUserAuthToken}`,
      },
    })
  }

  public stats =  async (): Promise<Stats> => {
    const dataBody = {
      "dateStart": "2022-03-25",
      "dateEnd": "2022-03-28 ",
      "statistics": {
          "ordersCount": 31,
          "totalComission": 21.120000000000005,
          "totalOrderValue": 172.97
      }
  }

    throwOnGraphQLErrors(
      'Error getting items data from vtex.sellers-graphql'
    )

    return dataBody
  }
}
