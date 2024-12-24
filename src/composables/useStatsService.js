// composables/useStatsService.js
import { ref } from 'vue'
import { format, subDays, startOfDay } from 'date-fns'
import _ from 'lodash'
import { getTiempoDisplayName } from '@/utils'

export function useStatsService() {
  const db = ref(null)
  
  const initDB = async () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('euskeraStats', 1)
      
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
      }
    })
  }

  const saveSinonimoAttempt = async (palabra, correcto) => {
    const dbInstance = db.value || await initDB()
    const tx = dbInstance.transaction('sinonimos', 'readwrite')
    const store = tx.objectStore('sinonimos')
    
    await store.add({
      fecha: new Date(),
      palabra,
      correcto
    })
  }

  const saveAditzakAttempt = async (sistema, tiempo, correcto) => {
    const dbInstance = db.value || await initDB()
    const tx = dbInstance.transaction('aditzak', 'readwrite')
    const store = tx.objectStore('aditzak')
    
    await store.add({
      fecha: new Date(),
      sistema,
      tiempo,
      correcto
    })
  }

  const getStats = async (timeRange = '7d') => {
    const dbInstance = db.value || await initDB()
    
    // Calcular fecha inicio según el rango
    const startDate = new Date()
    switch (timeRange) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(startDate.getDate() - 30)
        break
      case '90d':
        startDate.setDate(startDate.getDate() - 90)
        break
    }

    // Obtener datos
    const [sinonimosData, aditzakData] = await Promise.all([
      getAllSinonimoStats(dbInstance, startDate),
      getAllAditzakStats(dbInstance, startDate)
    ])

    return {
      sinonimos: processSinonimoStats(sinonimosData),
      aditzak: processAditzakStats(aditzakData)
    }
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

  const processSinonimoStats = (data) => {
    // Rellenar días sin datos con ceros
    const today = startOfDay(new Date())
    const filledData = Array.from({ length: 7 }, (_, i) => {
      const date = format(subDays(today, i), 'yyyy-MM-dd')
      const dayData = data.filter(item => 
        format(item.fecha, 'yyyy-MM-dd') === date
      )
      
      return {
        date,
        respuestas: dayData.length,
        aciertos: dayData.filter(i => i.correcto).length
      }
    }).reverse()

    // Palabras más acertadas/falladas
    const palabrasStats = _.chain(data)
      .groupBy('palabra')
      .map((items, palabra) => ({
        palabra,
        aciertos: items.filter(i => i.correcto).length,
        fallos: items.filter(i => !i.correcto).length
      }))
      .value()

    return {
      timeline: filledData,
      palabrasMasAcertadas: _.orderBy(palabrasStats, ['aciertos'], ['desc']).slice(0, 5),
      palabrasMasFalladas: _.orderBy(palabrasStats, ['fallos'], ['desc']).slice(0, 5)
    }
  }

  const processAditzakStats = (data) => {
    // Timeline con días rellenados
    const today = startOfDay(new Date())
    const filledData = Array.from({ length: 7 }, (_, i) => {
      const date = format(subDays(today, i), 'yyyy-MM-dd')
      const dayData = data.filter(item => 
        format(item.fecha, 'yyyy-MM-dd') === date
      )
      
      return {
        date,
        respuestas: dayData.length,
        aciertos: dayData.filter(i => i.correcto).length
      }
    }).reverse()

    // Estadísticas por sistema
    const sistemasStats = _.chain(data)
      .groupBy('sistema')
      .map((items, sistema) => ({
        sistema,
        total: items.length,
        aciertos: items.filter(i => i.correcto).length
      }))
      .value()

    // Estadísticas por tiempo verbal
    const tiemposStats = _.chain(data)
      .groupBy('tiempo')
      .map((items, tiempo) => ({
        tiempo: getTiempoDisplayName(tiempo),
        total: items.length,
        aciertos: items.filter(i => i.correcto).length
      }))
      .value()

    return {
      timeline: filledData,
      sistemasStats,
      tiemposStats
    }
  }

  return {
    initDB,
    saveSinonimoAttempt,
    saveAditzakAttempt,
    getStats
  }
}