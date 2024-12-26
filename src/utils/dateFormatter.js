// utils/dateFormatter.js
const MONTHS_EU = {
    '01': 'urtarrila',
    '02': 'otsaila',
    '03': 'martxoa',
    '04': 'apirila',
    '05': 'maiatza',
    '06': 'ekaina',
    '07': 'uztaila',
    '08': 'abuztua',
    '09': 'iraila',
    '10': 'urria',
    '11': 'azaroa',
    '12': 'abendua'
  }
  
  const MONTHS_EU_SHORT = {
    '01': 'urt',
    '02': 'ots',
    '03': 'mar',
    '04': 'api',
    '05': 'mai',
    '06': 'eka',
    '07': 'uzt',
    '08': 'abu',
    '09': 'ira',
    '10': 'urr',
    '11': 'aza',
    '12': 'abe'
  }
  
  export function formatDateEU(date, short = true, includeYear = false) {
    // Si es un número (timestamp), convertirlo a Date
    const d = typeof date === 'number' ? new Date(date) : new Date(date)
    
    // Verificar si es una fecha válida
    if (isNaN(d.getTime())) {
      console.warn('Fecha inválida:', date)
      return ''
    }
    
    const day = d.getDate()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    
    const monthName = short ? MONTHS_EU_SHORT[month] : MONTHS_EU[month]
    
    // Si es hoy, mostrar "Gaur"
    const today = new Date()
    if (d.getDate() === today.getDate() && 
        d.getMonth() === today.getMonth() && 
        d.getFullYear() === today.getFullYear()) {
      return 'Gaur'
    }
    
    return includeYear ? 
      `${year}ko ${monthName}ren ${day}` : 
      `${monthName} ${day}`
  }