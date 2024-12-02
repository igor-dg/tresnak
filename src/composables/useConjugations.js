import norConjugations from '@/data/nor-conjugations.json'

export function useConjugations() {
  const getMegaPistaContent = (sistema, tiempo) => {
    // Si es sistema NOR, devolver el contenido textual
    if (sistema === 'NOR') {
      return {
        type: 'text',
        content: norConjugations[tiempo]
      }
    }
    
    // Para otros sistemas, devolver la ruta de la imagen
    return {
      type: 'image',
      content: `/img/${sistema.toLowerCase()}_${tiempo}.png`
    }
  }

  const isTextualMegaPista = (sistema) => {
    return sistema === 'NOR'
  }

  return {
    getMegaPistaContent,
    isTextualMegaPista
  }
}