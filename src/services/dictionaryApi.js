import { Capacitor, CapacitorHttp } from '@capacitor/core'

const API_BASE_URL = 'https://idg.eus/jokatu/api'

async function requestText(endpoint, params) {
  const url = `${API_BASE_URL}/${endpoint}`

  if (Capacitor.isNativePlatform()) {
    const response = await CapacitorHttp.get({
      url,
      params,
      responseType: 'text',
      connectTimeout: 10_000,
      readTimeout: 15_000
    })

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Zerbitzariak ${response.status} egoera itzuli du`)
    }

    return typeof response.data === 'string'
      ? response.data
      : String(response.data ?? '')
  }

  const query = new URLSearchParams(params)
  const response = await fetch(`${url}?${query}`)

  if (!response.ok) {
    throw new Error(`Zerbitzariak ${response.status} egoera itzuli du`)
  }

  return response.text()
}

export function fetchTranslation(word, definitionOnly = false) {
  return requestText('itzultzaile.php', {
    hitza: word,
    ...(definitionOnly ? { definition_only: 'true' } : {})
  })
}

export function fetchDefinition(word) {
  return requestText('definizioa.php', {
    hitza: word,
    definition_only: 'true'
  })
}
