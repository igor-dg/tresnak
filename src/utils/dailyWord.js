import { differenceInCalendarDays, format } from 'date-fns'
import dailySequence from '@/data/hitzak/dailySequence.json'
import validWords from '@/data/hitzak/validWords.json'

const DAILY_STATE_KEY = 'hiztegle_daily_state'

// Día 0 del calendario del reto diario.
//
// IMPORTANTE: mientras la app no esté publicada, esta fecha se puede
// mover libremente (nadie depende todavía de que "hoy" sea un día fijo).
// En cuanto haya usuarios reales jugando el reto diario, esta fecha y el
// contenido de dailySequence.json quedan CONGELADOS para siempre: cambiar
// cualquiera de los dos desplazaría retroactivamente qué palabra le
// correspondió a cada fecha ya jugada.
const EPOCH_DATE = new Date('2026-07-31T00:00:00')

const VALID_WORD_SET = new Set(validWords)

export function getDailyDateKey(date = new Date()) {
  return format(date, 'yyyy-MM-dd')
}

// Índice determinista y reproducible: mismo día natural -> mismo índice
// en todos los dispositivos, sin backend. dailySequence.json es una
// mezcla fija (ver scripts/generate_daily_sequence.py); nunca se baraja
// en tiempo real aquí.
export function getDailyWord(date = new Date()) {
  const daysSinceEpoch = differenceInCalendarDays(date, EPOCH_DATE)
  const index = ((daysSinceEpoch % dailySequence.length) + dailySequence.length) % dailySequence.length
  return dailySequence[index]
}

// Lista cerrada de intentos aceptados para el reto diario (5 letras).
// Validación local: sin red, sin depender de que la API de diccionario
// reconozca cada forma flexionada.
export function isValidDailyGuess(word) {
  return VALID_WORD_SET.has(word.toUpperCase())
}

// Devuelve el resultado guardado del reto diario si ya se jugó hoy, o null.
export function getDailyChallengeState(date = new Date()) {
  const stored = localStorage.getItem(DAILY_STATE_KEY)
  if (!stored) return null

  try {
    const state = JSON.parse(stored)
    return state.date === getDailyDateKey(date) ? state : null
  } catch {
    return null
  }
}

export function saveDailyChallengeResult({ correct, attempts, word, date = new Date() }) {
  const state = {
    date: getDailyDateKey(date),
    word,
    correct,
    attempts
  }
  localStorage.setItem(DAILY_STATE_KEY, JSON.stringify(state))
  return state
}
