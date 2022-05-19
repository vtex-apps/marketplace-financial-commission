import { config } from '../constants'

export const getSettings = async (
  _: unknown,
  {
    id,
  }: {
    id: string
  },
  ctx: Context
): Promise<any> => {
  const {
    clients: { vbase },
    vtex: { account: marketplace },
  } = ctx

  const idBucket = id || marketplace

  const response = await vbase.getJSON<any>(config.SETTINGS_BUCKET, idBucket)

  return response
}
