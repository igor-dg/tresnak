import { Capacitor, CapacitorHttp } from '@capacitor/core'

const API_BASE_URL = 'https://idg.eus/jokatu/api'
const localShardPromises = new Map()

function normalizeWord(word) {
  return word.trim().toLocaleLowerCase('eu').normalize('NFC')
}

function getShardName(word) {
  const initial = word.charAt(0)
  return /^[a-z0-9]$/.test(initial) ? initial : '_'
}

async function getLocalEntry(word) {
  const normalizedWord = normalizeWord(word)
  if (!normalizedWord) return null

  const shardName = getShardName(normalizedWord)
  if (!localShardPromises.has(shardName)) {
    const promise = fetch(`${import.meta.env.BASE_URL}data/hiztegia/${shardName}.json`)
      .then(response => response.ok ? response.json() : null)
      .catch(() => null)
    localShardPromises.set(shardName, promise)
  }

  const shard = await localShardPromises.get(shardName)
  return shard?.[normalizedWord] ?? null
}

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

export async function fetchTranslation(word, definitionOnly = false) {
  const localEntry = await getLocalEntry(word)
  const localContent = definitionOnly
    ? localEntry?.elhuyarSummary
    : localEntry?.elhuyar

  if (localContent) return localContent

  return requestText('itzultzaile.php', {
    hitza: word,
    ...(definitionOnly ? { definition_only: 'true' } : {})
  })
}

export async function fetchDefinition(word) {
  const localEntry = await getLocalEntry(word)
  const localContent = localEntry?.harluxet?.[0]?.html

  if (localContent) return localContent

  return requestText('definizioa.php', {
    hitza: word,
    definition_only: 'true'
  })
}

export async function fetchDictionaryEntry(word) {
  const localEntry = await getLocalEntry(word)

  if (localEntry?.elhuyar) {
    return {
      html: localEntry.elhuyar,
      source: 'Elhuyar Hiztegia'
    }
  }

  const harluxet = localEntry?.harluxet?.[0]?.html
  if (harluxet) {
    return {
      html: harluxet,
      source: 'Harluxet Hiztegi Entziklopedikoa'
    }
  }

  return {
    html: await requestText('itzultzaile.php', { hitza: word }),
    source: 'Elhuyar Hiztegia'
  }
}

export async function fetchHiztegleClue(word, preferredType) {
  const localEntry = await getLocalEntry(word)
  const harluxet = localEntry?.harluxet?.[0]?.html
  const elhuyar = localEntry?.elhuyarSummary
  const localCandidates = preferredType === 'definition'
    ? [
        { html: harluxet, source: 'Harluxet Hiztegi Entziklopedikoa' },
        { html: elhuyar, source: 'Elhuyar Hiztegia' }
      ]
    : [
        { html: elhuyar, source: 'Elhuyar Hiztegia' },
        { html: harluxet, source: 'Harluxet Hiztegi Entziklopedikoa' }
      ]
  const localClue = localCandidates.find(candidate => candidate.html)

  if (localClue) return localClue

  if (preferredType === 'definition') {
    return {
      html: await requestText('definizioa.php', {
        hitza: word,
        definition_only: 'true'
      }),
      source: 'Harluxet Hiztegi Entziklopedikoa'
    }
  }

  return {
    html: await requestText('itzultzaile.php', {
      hitza: word,
      definition_only: 'true'
    }),
    source: 'Elhuyar Hiztegia'
  }
}
