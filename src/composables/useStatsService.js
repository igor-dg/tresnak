// composables/useStatsService.js
import { ref } from 'vue'
import { format, subDays, startOfDay } from 'date-fns'
import { getTiempoDisplayName } from '@/utils'

const RANGE_DAYS = {
  today: 1,
  '7d': 7,
  '30d': 30,
  '90d': 90
}

export function useStatsService() {
  const db = ref(null)

  const requestToPromise = (request) => {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  const initDB = async () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('euskeraStats', 2)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        db.value = request.result
        resolve(request.result)
      }
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        
        // Store para sinónimos
        if (!db.objectStoreNames.contains('sinonimos')) {
          const sinonimoStore = db.createObjectStore('sinonimos', { keyPath: 'id', autoIncrement: true })
          sinonimoStore.createIndex('fecha', 'fecha')
          sinonimoStore.createIndex('palabra', 'palabra')
        }
        
        // Store para aditzak
        if (!db.objectStoreNames.contains('aditzak')) {
          const aditzakStore = db.createObjectStore('aditzak', { keyPath: 'id', autoIncrement: true })
          aditzakStore.createIndex('fecha', 'fecha')
          aditzakStore.createIndex('sistema', 'sistema')
          aditzakStore.createIndex('tiempo', 'tiempo')
        }

        if (!db.objectStoreNames.contains('hiztegle')) {
          const hiztegleStore = db.createObjectStore('hiztegle', { keyPath: 'id', autoIncrement: true })
          hiztegleStore.createIndex('fecha', 'fecha')
          hiztegleStore.createIndex('palabra', 'palabra')
        }
      }
    })
  }

  const saveSinonimoAttempt = async (palabra, correcto) => {
    const dbInstance = db.value || await initDB()
    const tx = dbInstance.transaction('sinonimos', 'readwrite')
    const store = tx.objectStore('sinonimos')

    await requestToPromise(store.add({
      fecha: new Date(),
      palabra,
      correcto
    }))
  }

  const saveAditzakAttempt = async (sistema, tiempo, correcto) => {
    const dbInstance = db.value || await initDB()
    const tx = dbInstance.transaction('aditzak', 'readwrite')
    const store = tx.objectStore('aditzak')

    await requestToPromise(store.add({
      fecha: new Date(),
      sistema,
      tiempo,
      correcto
    }))
  }

  const saveHiztegleAttempt = async (palabra, correcto, intentos) => {
    const dbInstance = db.value || await initDB()
    const tx = dbInstance.transaction('hiztegle', 'readwrite')

    await requestToPromise(tx.objectStore('hiztegle').add({
      fecha: new Date(),
      palabra,
      correcto,
      intentos
    }))
  }

  const clearStats = async () => {
    const dbInstance = db.value || await initDB()
    const tx = dbInstance.transaction(['sinonimos', 'aditzak', 'hiztegle'], 'readwrite')

    await Promise.all([
      requestToPromise(tx.objectStore('sinonimos').clear()),
      requestToPromise(tx.objectStore('aditzak').clear()),
      requestToPromise(tx.objectStore('hiztegle').clear())
    ])
  }

  const getStats = async (timeRange = '7d') => {
    const dbInstance = db.value || await initDB()
    
    // Calcular fecha inicio según el rango (siempre al inicio del día, para cubrir el día completo)
    const startDate = new Date()
    const days = RANGE_DAYS[timeRange] ?? RANGE_DAYS['7d']
    if (timeRange !== 'today') {
      startDate.setDate(startDate.getDate() - (days - 1))
    }
    startDate.setHours(0, 0, 0, 0)

    // Obtener datos
    const [sinonimosData, aditzakData, hiztegleData] = await Promise.all([
      getAllSinonimoStats(dbInstance, startDate),
      getAllAditzakStats(dbInstance, startDate),
      getAllStoreStats(dbInstance, 'hiztegle', startDate)
    ])

    return {
      sinonimos: processSinonimoStats(sinonimosData, timeRange),
      aditzak: processAditzakStats(aditzakData, timeRange),
      hiztegle: processHiztegleStats(hiztegleData, timeRange)
    }
  }

  const getAllStoreStats = async (dbInstance, storeName, startDate = null) => {
    const tx = dbInstance.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)
    if (!startDate) return requestToPromise(store.getAll())
    return requestToPromise(store.index('fecha').getAll(IDBKeyRange.lowerBound(startDate)))
  }

  const getAllSinonimoStats = async (dbInstance, startDate) => {
    return new Promise((resolve, reject) => {
      const tx = dbInstance.transaction('sinonimos', 'readonly')
      const store = tx.objectStore('sinonimos')
      const index = store.index('fecha')
      const range = IDBKeyRange.lowerBound(startDate)
      
      const request = index.getAll(range)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  const getAllAditzakStats = async (dbInstance, startDate) => {
    return new Promise((resolve, reject) => {
      const tx = dbInstance.transaction('aditzak', 'readonly')
      const store = tx.objectStore('aditzak')
      const index = store.index('fecha')
      const range = IDBKeyRange.lowerBound(startDate)
      
      const request = index.getAll(range)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  const processSinonimoStats = (data, timeRange) => {
    // Rellenar días sin datos con ceros
    const today = startOfDay(new Date())
    const days = RANGE_DAYS[timeRange] ?? RANGE_DAYS['7d']
    const filledData = Array.from({ length: days }, (_, i) => {
      const date = format(subDays(today, i), 'yyyy-MM-dd')
      // Asegurarnos de que filtramos correctamente por la fecha local
      const dayData = data.filter(item => {
        const itemDate = format(new Date(item.fecha), 'yyyy-MM-dd')
        return itemDate === date
      })
      
      return {
        date,
        respuestas: dayData.length,
        aciertos: dayData.filter(i => i.correcto).length
      }
    }).reverse()

    // Palabras más acertadas/falladas
    const palabrasMap = {}
    for (const item of data) {
      const key = item.palabra
      if (!palabrasMap[key]) palabrasMap[key] = []
      palabrasMap[key].push(item)
    }

    const palabrasStats = Object.entries(palabrasMap).map(([palabra, items]) => ({
      palabra,
      aciertos: items.filter(i => i.correcto).length,
      fallos: items.filter(i => !i.correcto).length
    }))

    palabrasStats.sort((a, b) => b.aciertos - a.aciertos)

    return {
      timeline: filledData,
      palabrasMasAcertadas: palabrasStats.slice(0, 5),
      palabrasMasFalladas: [...palabrasStats].sort((a, b) => b.fallos - a.fallos).slice(0, 5)
    }
  }

  const processAditzakStats = (data, timeRange) => {
    // Timeline con días rellenados
    const today = startOfDay(new Date())
    const days = RANGE_DAYS[timeRange] ?? RANGE_DAYS['7d']
    const filledData = Array.from({ length: days }, (_, i) => {
      const date = format(subDays(today, i), 'yyyy-MM-dd')
      // Asegurarnos de que filtramos correctamente por la fecha local
      const dayData = data.filter(item => {
        const itemDate = format(new Date(item.fecha), 'yyyy-MM-dd')
        return itemDate === date
      })
      
      return {
        date,
        respuestas: dayData.length,
        aciertos: dayData.filter(i => i.correcto).length
      }
    }).reverse()

    // Estadísticas por sistema
    const sistemasMap = {}
    for (const item of data) {
      const key = item.sistema
      if (!sistemasMap[key]) sistemasMap[key] = []
      sistemasMap[key].push(item)
    }
    const sistemasStats = Object.entries(sistemasMap).map(([sistema, items]) => ({
      sistema,
      total: items.length,
      aciertos: items.filter(i => i.correcto).length
    }))

    // Estadísticas por tiempo verbal
    const tiemposMap = {}
    for (const item of data) {
      const key = item.tiempo
      if (!tiemposMap[key]) tiemposMap[key] = []
      tiemposMap[key].push(item)
    }
    const tiemposStats = Object.entries(tiemposMap).map(([tiempo, items]) => ({
      tiempo: getTiempoDisplayName(tiempo),
      total: items.length,
      aciertos: items.filter(i => i.correcto).length
    }))

    return {
      timeline: filledData,
      sistemasStats,
      tiemposStats
    }
  }

  const processHiztegleStats = (data, timeRange) => {
    const today = startOfDay(new Date())
    const days = RANGE_DAYS[timeRange] ?? RANGE_DAYS['7d']
    const timeline = Array.from({ length: days }, (_, i) => {
      const date = format(subDays(today, i), 'yyyy-MM-dd')
      const dayData = data.filter(item => format(new Date(item.fecha), 'yyyy-MM-dd') === date)
      return {
        date,
        respuestas: dayData.length,
        aciertos: dayData.filter(item => item.correcto).length
      }
    }).reverse()

    return {
      timeline,
      partidas: data.length,
      aciertos: data.filter(item => item.correcto).length,
      intentosMedios: data.length
        ? Math.round((data.reduce((sum, item) => sum + (item.intentos || 0), 0) / data.length) * 10) / 10
        : 0
    }
  }

  const getLearningOverview = async (dailyGoal = 10) => {
    const dbInstance = db.value || await initDB()
    const [sinonimos, aditzak, hiztegle] = await Promise.all([
      getAllStoreStats(dbInstance, 'sinonimos'),
      getAllStoreStats(dbInstance, 'aditzak'),
      getAllStoreStats(dbInstance, 'hiztegle')
    ])
    const allAttempts = [
      ...sinonimos.map(item => ({ ...item, activity: 'Sinonimoak', route: '/sinonimoak-jokoa' })),
      ...aditzak.map(item => ({ ...item, activity: 'Aditzak', route: '/aditzak' })),
      ...hiztegle.map(item => ({ ...item, activity: 'Hiztegle', route: '/hiztegle' }))
    ]
    const today = startOfDay(new Date())
    const dateKey = date => format(new Date(date), 'yyyy-MM-dd')
    const attemptsByDate = new Map()
    allAttempts.forEach(item => {
      const key = dateKey(item.fecha)
      attemptsByDate.set(key, [...(attemptsByDate.get(key) || []), item])
    })

    const todayKey = format(today, 'yyyy-MM-dd')
    const yesterdayKey = format(subDays(today, 1), 'yyyy-MM-dd')
    let cursor = attemptsByDate.has(todayKey) ? 0 : attemptsByDate.has(yesterdayKey) ? 1 : null
    let streak = 0
    while (cursor !== null && attemptsByDate.has(format(subDays(today, cursor), 'yyyy-MM-dd'))) {
      streak++
      cursor++
    }

    const week = Array.from({ length: 7 }, (_, offset) => {
      const date = subDays(today, 6 - offset)
      const key = format(date, 'yyyy-MM-dd')
      const attempts = attemptsByDate.get(key) || []
      return {
        date: key,
        day: format(date, 'EEEEE').toUpperCase(),
        attempts: attempts.length,
        correct: attempts.filter(item => item.correcto).length,
        active: attempts.length > 0
      }
    })
    const currentWeek = week.flatMap(day => attemptsByDate.get(day.date) || [])
    const previousWeek = Array.from({ length: 7 }, (_, offset) => {
      const key = format(subDays(today, 13 - offset), 'yyyy-MM-dd')
      return attemptsByDate.get(key) || []
    }).flat()
    const accuracy = items => items.length
      ? Math.round((items.filter(item => item.correcto).length / items.length) * 100)
      : null
    const currentAccuracy = accuracy(currentWeek)
    const previousAccuracy = accuracy(previousWeek)
    const sortedAttempts = [...allAttempts].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

    const recentCutoff = subDays(today, 29)
    const activityStats = [
      { title: 'Sinonimoak', route: '/sinonimoak-jokoa', items: sinonimos },
      { title: 'Aditzak', route: '/aditzak', items: aditzak },
      { title: 'Hiztegle', route: '/hiztegle', items: hiztegle }
    ].map(activity => ({
      ...activity,
      attempts: activity.items.filter(item => new Date(item.fecha) >= recentCutoff).length,
      accuracy: accuracy(activity.items.filter(item => new Date(item.fecha) >= recentCutoff))
    }))
    const practiced = activityStats.filter(activity => activity.attempts > 0)
    const recommended = practiced.length
      ? [...practiced].sort((a, b) => (a.accuracy ?? 100) - (b.accuracy ?? 100))[0]
      : activityStats[0]
    const todayAttempts = attemptsByDate.get(todayKey)?.length || 0

    return {
      streak,
      dailyGoal,
      todayAttempts,
      goalProgress: Math.min(100, Math.round((todayAttempts / dailyGoal) * 100)),
      activeDays: week.filter(day => day.active).length,
      week,
      weeklyAttempts: currentWeek.length,
      accuracy: currentAccuracy,
      accuracyChange: currentAccuracy !== null && previousAccuracy !== null
        ? currentAccuracy - previousAccuracy
        : null,
      recommendation: {
        ...recommended,
        reason: recommended.attempts
          ? `${recommended.accuracy}% asmatu dituzu azken 30 egunetan`
          : 'Hasi gaurko lehen erronka'
      },
      continueRoute: sortedAttempts[0]?.route || '/sinonimoak-jokoa'
    }
  }

  return {
    initDB,
    saveSinonimoAttempt,
    saveAditzakAttempt,
    saveHiztegleAttempt,
    getStats,
    getLearningOverview,
    clearStats
  }
}
