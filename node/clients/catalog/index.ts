import type {
  InstanceOptions,
  IOContext,
  RequestConfig,
  SegmentData,
} from '@vtex/api'
import { AppClient } from '@vtex/api'
import { stringify } from 'qs'

const inflightKey = ({ baseURL, url, params, headers }: RequestConfig) => {
  const segmentToken = headers['x-vtex-segment']
  const segmentQs = segmentToken ? `&segmentToken=${segmentToken}` : ''

  return (
    baseURL! +
    url! +
    stringify(params, { arrayFormat: 'repeat', addQueryPrefix: true }) +
    segmentQs
  )
}

interface CatalogPageTypeResponse {
  id: string
  pageType: string
  name: string
  url: string
  title: string | null
  metaTagDescription: string | null
}

export class Catalog extends AppClient {
  private basePath: string
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-api-proxy@0.x', ctx, opts)
    this.basePath = ctx.sessionToken
      ? '/proxy/authenticated/catalog'
      : '/proxy/catalog'
  }

  public pageType = (path: string, query = '') => {
    const pageTypePath = path.startsWith('/') ? path.substr(1) : path

    const pageTypeQuery = !query || query.startsWith('?') ? query : `?${query}`

    return this.get<CatalogPageTypeResponse>(
      `/pub/portal/pagetype/${pageTypePath}${pageTypeQuery}`,
      { metric: 'catalog-pagetype' }
    )
  }

  public salesChannelById = (id: string) =>
  this.get<any[]>(
    `/pub/saleschannel/${id}`,
    {
      metric: 'get-sales-channel-by-id',
    }
  )

  private get = <T = any>(url: string, config: RequestConfig = {}) => {
    const segmentData: SegmentData | undefined = (this
      .context! as any).segment

    const { channel: salesChannel = '' } = segmentData ?? {}

    config.params = {
      ...config.params,
      ...(!!salesChannel && { sc: salesChannel }),
    }

    config.inflightKey = inflightKey

    return this.http.get<T>(`${this.basePath}${url}`, config)
  }
}
