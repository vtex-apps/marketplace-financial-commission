import { config } from '../utils/config'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export async function searchDashboard(startDate: string, endDate: string){

  console.info('config ', config.getUrl(`searchDashboard?${startDate}&${endDate}`))
  try {
    const dateIni = 'dateIni='+startDate
    const dateEnd = 'dateEnd='+endDate
    const url = config.getUrl(`dashboard/searchDashboard?${dateIni}&${dateEnd}`)
    const response = await fetch(url, {
      method: 'GET',
      headers,
    })
    return await response.json()
  } catch (e) {
    throw e
  }
}

export async function getSellers(){

  console.info('config ', config.getUrl('getsellers'))
  try {
    const response = await fetch(config.getUrl('sellers/getsellers'), {
      method: 'GET',
      headers,
    })
    const res = await response.json()
    return res
  } catch (e) {
    throw e
  }
}
