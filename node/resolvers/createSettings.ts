import { config } from '../constants'

export const createSettings = async (
  _: unknown,
  {
    settingsData,
  }: {
    settingsData: any
  },
  ctx: Context
): Promise<string> => {
  const {
    clients: { vbase },
    vtex: { account: marketplace },
  } = ctx

  const { sellerName } = settingsData
  const idBucket = sellerName || marketplace

  try {
    await vbase.saveJSON<any>(config.SETTINGS_BUCKET, idBucket, settingsData)
  } catch (err) {
    console.info('error ', err)
  }

  return settingsData
}
