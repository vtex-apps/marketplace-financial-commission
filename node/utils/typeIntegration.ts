import { config } from '../constants'

export const typeIntegration = async (ctx: Context): Promise<any> => {
  const {
    clients: { vbase },
    vtex: { account: marketplace },
  } = ctx

  const idBucket = marketplace

  const response = await vbase.getJSON<MarketplaceSettings>(
    config.SETTINGS_BUCKET,
    idBucket
  )

  return response.integration
}
