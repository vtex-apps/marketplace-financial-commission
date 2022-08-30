import type { InstanceOptions, IOContext } from '@vtex/api'
import { AuthenticationError, JanusClient } from '@vtex/api'

interface Data {
  appkey: string
  apptoken: string
}

interface AuthenticatedUser {
  userId: string
  user: string
  userType: string
}

export default class AppTokenClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'true',
        'Content-Type': 'application/json',
      },
    })
  }

  public async validateAppKeyAndToken(data: Data): Promise<any> {
    try {
      const result = await this.http.post(`/api/vtexid/apptoken/login`, data)

      return result
    } catch (error) {
      throw new AuthenticationError('Unauthorized')
    }
  }

  public getAuthenticatedUser(
    authToken: string
  ): Promise<AuthenticatedUser | null> {
    return this.http.get('/api/vtexid/pub/authenticated/user/', {
      params: {
        authToken,
      },
    })
  }
}
