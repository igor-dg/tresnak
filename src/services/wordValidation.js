const MIN_WORD_LENGTH = 2
const MAX_WORD_LENGTH = 13

let loadedLength = null
let loadedWords = null
let loadingLength = null
let loadingPromise = null

async function loadWords(length) {
  if (!Number.isInteger(length) || length < MIN_WORD_LENGTH || length > MAX_WORD_LENGTH) {
    return new Set()
  }

  if (loadedLength === length && loadedWords) {
    return loadedWords
  }

  if (loadingLength === length && loadingPromise) {
    return loadingPromise
  }

  loadingLength = length
  loadingPromise = fetch(`${import.meta.env.BASE_URL}data/hitzak/valid-${length}.txt`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Could not load the ${length}-letter word list (${response.status})`)
      }
      return response.text()
    })
    .then(text => {
      const words = new Set(text.split(/\r?\n/).filter(Boolean))
      loadedLength = length
      loadedWords = words
      return words
    })
    .finally(() => {
      if (loadingLength === length) {
        loadingLength = null
        loadingPromise = null
      }
    })

  return loadingPromise
}

export async function isValidHiztegleGuess(word) {
  const normalizedWord = word.trim().toUpperCase()
  const words = await loadWords(normalizedWord.length)
  return words.has(normalizedWord)
}
