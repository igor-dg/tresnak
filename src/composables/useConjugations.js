// src/composables/useConjugations.js
import norConjugations from '@/data/nor-conjugations.json'
import { norNorkSystem } from '@/data/conjugations/nor-nork'
import { norNoriSystem } from '@/data/conjugations/nor-nori'
import { norNoriNorkSystem } from '@/data/conjugations/nor-nori-nork'

export function useConjugations() {
  const getMegaPistaContent = (sistema, tiempo) => {
    // Normalizar el sistema a mayúsculas para comparación consistente
    const normalizedSistema = sistema.toUpperCase()
    
    console.log('Sistema:', normalizedSistema) // Para debug
    
    // Si es sistema NOR
    if (normalizedSistema === 'NOR') {
      return {
        type: 'text',
        content: norConjugations[tiempo]
      }
    }

    // Si es NOR-NORK
    if (normalizedSistema === 'NOR-NORK') {
      return {
        type: 'table',
        content: norNorkSystem.conjugations[tiempo] || norNorkSystem.conjugations['orain']
      }
    }

    // Si es NOR-NORI
    if (normalizedSistema === 'NOR-NORI') {
      return {
        type: 'table',
        content: norNoriSystem.conjugations[tiempo] || norNoriSystem.conjugations['orain']
      }
    }

    if (normalizedSistema === 'NOR-NORI-NORK') {
      return {
        type: 'table',
        content: norNoriNorkSystem.conjugations[tiempo] || norNoriNorkSystem.conjugations['orain']
      }
    }

    // Para otros sistemas
    return {
      type: 'image',
      content: `/img/${sistema.toLowerCase()}_${tiempo}.png`
    }
  }

  const isTextualMegaPista = (sistema) => {
    return sistema.toUpperCase() === 'NOR'
  }

  const isTableMegaPista = (sistema) => {
    const normalizedSistema = sistema.toUpperCase()
    return normalizedSistema === 'NOR-NORK' || normalizedSistema === 'NOR-NORI' || normalizedSistema === 'NOR-NORI-NORK'
  }

  // Método para verificar combinaciones inválidas para ambos sistemas
  const isInvalidCombination = (sistema, nor, nork = null, nori = null) => {
    const normalizedSistema = sistema.toUpperCase()
    
    if (normalizedSistema === 'NOR-NORK' && nork) {
      return norNorkSystem.invalidCombinations.some(
        combo => 
          combo.nor.toUpperCase() === nor.toUpperCase() && 
          combo.nork.toUpperCase() === nork.toUpperCase()
      )
    }

    if (normalizedSistema === 'NOR-NORI' && nori) {
      return norNoriSystem.invalidCombinations.some(
        combo => 
          combo.nor.toUpperCase() === nor.toUpperCase() && 
          combo.nori.toUpperCase() === nori.toUpperCase()
      )
    }

    if (normalizedSistema === 'NOR-NORI-NORK' && nori && nork) {
      return norNoriNorkSystem.invalidCombinations.some(
        combo => 
          combo.nor.toUpperCase() === nor.toUpperCase() && 
          (combo.nori === '*' || combo.nori.toUpperCase() === nori.toUpperCase()) &&
          (combo.nork === '*' || combo.nork.toUpperCase() === nork.toUpperCase())
      )
    }

    return false
  }

  return {
    getMegaPistaContent,
    isTextualMegaPista,
    isTableMegaPista,
    isInvalidCombination
  }
}