<script setup>
import { ref, computed } from 'vue'
import { ChevronRight, Lightbulb, RefreshCw } from 'lucide-vue-next';
import {
  selectValidPhrase,
  composePhrase,
  conjugacionExists,
  obtenerConjugacion,
  obtenerSistemaData
} from '@/utils.js'

const props = defineProps({
  sistema: {
    type: String,
    required: true
  },
  tiempo: {
    type: String,
    required: true
  },
  currentSubject: {
    type: String,
    required: true
  },
  currentObject: {
    type: String,
    required: true
  },
  hints: {
    type: Object,
    required: true
  },
  sistemas: {
    type: Array,
    required: true,
    validator: (value) => {
      return Array.isArray(value) && value.every(sistema => 
        typeof sistema === 'object' && 
        'id' in sistema && 
        'active' in sistema
      )
    }
  }
})

const emit = defineEmits(['hint-used'])

const activeSystemCount = computed(() => {
  return props.sistemas.filter(sistema => sistema.active).length
})

const canShowPista1 = computed(() => !props.hints.pista1.used && activeSystemCount.value >= 2)
const canShowPista2 = computed(() => !props.hints.pista2.used && activeSystemCount.value >= 3 && props.hints.pista1.used)
const canShowSuperPista = computed(() => !props.hints.superPista.used)
const canShowMegaPista = computed(() => !props.hints.megaPista.used)

function createHintPhrase(systemId, isSuperpista = false, retryCount = 0) {
  try {
    // Evitar bucles infinitos
    if (retryCount > 10) {
      throw new Error('Demasiados intentos de generar pista')
    }

    // Para superPista usamos el mismo sistema, para otras pistas uno diferente
    const systemData = obtenerSistemaData(systemId)
    
    // Obtener una frase válida
    const phraseData = selectValidPhrase(systemId, props.tiempo)
    if (!phraseData) {
      if (isSuperpista) {
    // Si la frase actual tiene objeto, verificamos que ambos sean diferentes
    if (props.currentObject) {
        if (phraseData.selectedSubject === props.currentSubject || 
            phraseData.selectedObject === props.currentObject) {
            return createHintPhrase(systemId, isSuperpista, retryCount + 1)
        }
    } 
    // Si la frase actual no tiene objeto, solo verificamos el sujeto
    else if (phraseData.selectedSubject === props.currentSubject) {
        return createHintPhrase(systemId, isSuperpista, retryCount + 1)
    }
}
      // Para pistas normales, intentar con otro sistema
      const availableSystems = props.sistemas.filter(s => 
        s.active && s.id !== props.sistema && 
        (!props.hints.pista1.sistema || s.id !== props.hints.pista1.sistema)
      )
      if (availableSystems.length === 0) {
        throw new Error('No hay sistemas disponibles para generar pista')
      }
      const newSystem = availableSystems[Math.floor(Math.random() * availableSystems.length)]
      return createHintPhrase(newSystem.id, isSuperpista, retryCount + 1)
    }

    // Para superPista, verificar que no usamos el mismo sujeto/objeto
    if (isSuperpista && 
        (phraseData.selectedSubject === props.currentSubject || 
         phraseData.selectedObject === props.currentObject)) {
      return createHintPhrase(systemId, isSuperpista, retryCount + 1)
    }

    // Componer la frase
    const composedPhrase = composePhrase(phraseData, systemId, props.tiempo)
    
    // Obtener la conjugación
    const conjugacion = obtenerConjugacion(
      { [systemId]: systemData },
      props.tiempo,
      phraseData.selectedSubject,
      phraseData.selectedObject,
      phraseData.variables?.number || 'Sing'
    )

    if (!conjugacion) {
      return createHintPhrase(systemId, isSuperpista, retryCount + 1)
    }

    return {
      frase: `${composedPhrase} ${conjugacion}`.trim(),
      sistema: systemId,
      tiempo: props.tiempo
    }

  } catch (error) {
    console.error('Error al crear pista:', error)
    return {
      frase: `Error: ${error.message}`,
      sistema: systemId,
      tiempo: props.tiempo
    }
  }
}

function showHint(type) {
  try {
    if (type === 'megaPista') {
      emit('hint-used', {
        type,
        data: {
          imagen: `/img/${props.sistema.toLowerCase()}_${props.tiempo}.png`
        }
      })
      return
    }

    // Seleccionar sistema según el tipo de pista
    const availableSystems = props.sistemas.filter(system => {
      if (!system.active) return false
      
      switch(type) {
        case 'pista1':
          return system.id !== props.sistema
        case 'pista2':
          return system.id !== props.sistema && 
                 system.id !== (props.hints.pista1?.sistema || '')
        case 'superPista':
          return system.id === props.sistema
        default:
          return false
      }
    })

    if (availableSystems.length === 0) {
      throw new Error('No hay sistemas disponibles')
    }

    const selectedSystem = availableSystems[Math.floor(Math.random() * availableSystems.length)]
    const hintData = createHintPhrase(
      selectedSystem.id, 
      type === 'superPista'
    )

    emit('hint-used', { type, data: hintData })

  } catch (error) {
    console.error('Error al mostrar pista:', error)
    emit('hint-used', {
      type,
      data: {
        frase: `Error: ${error.message}`,
        sistema: props.sistema,
        tiempo: props.tiempo
      }
    })
  }
}
</script>

<template>
  <div class="w-full">
    <!-- Botones de Pistas -->
    <div class="flex flex-wrap justify-center gap-3 mt-6">
      <button 
        v-if="activeSystemCount >= 2"
        :disabled="!canShowPista1"
        @click="showHint('pista1')"
        class="p-3 rounded-xl transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed
             bg-blue-100 text-blue-700 hover:bg-blue-200
             disabled:hover:bg-blue-100"
    >
      <Lightbulb class="size-5" />
      </button>
      
      <button 
        v-if="activeSystemCount >= 3"
        :disabled="!canShowPista2"
        @click="showHint('pista2')"
        class="p-3 rounded-xl transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed
             bg-blue-100 text-blue-700 hover:bg-blue-200
             disabled:hover:bg-blue-100"
    >
      <Lightbulb class="size-5" />
      </button>
      
      <button 
        :disabled="!canShowSuperPista"
        @click="showHint('superPista')"
        class="p-3 rounded-xl transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed
             bg-amber-100 text-amber-700 hover:bg-amber-200
             disabled:hover:bg-amber-100"
    >
      <Lightbulb class="size-5" />
      </button>
      
      <button 
        :disabled="!canShowMegaPista"
        @click="showHint('megaPista')"
        class="p-3 rounded-xl transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed
             bg-red-100 text-red-700 hover:bg-red-200
             disabled:hover:bg-red-100"
    >
      <Lightbulb class="size-5" />
      </button>
    </div>

    <!-- Contenedor de Pistas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <!-- Pista 1 -->
      <div v-if="hints.pista1.frase"
           class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
        <h5 class="font-bold text-gray-800 mb-3">1. Pista</h5>
        <p class="text-gray-600 mb-3">{{ hints.pista1.frase }}</p>
        <p class="text-sm text-gray-500">
          <span class="font-semibold">Sistema:</span> {{ hints.pista1.sistema }} | 
          <span class="font-semibold">Aldia eta denbora:</span> {{ hints.pista1.tiempo }}
        </p>
      </div>

      <!-- Pista 2 -->
      <div v-if="hints.pista2.frase"
           class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
        <h5 class="font-bold text-gray-800 mb-3">2. Pista</h5>
        <p class="text-gray-600 mb-3">{{ hints.pista2.frase }}</p>
        <p class="text-sm text-gray-500">
          <span class="font-semibold">Sistema:</span> {{ hints.pista2.sistema }} | 
          <span class="font-semibold">Aldia eta denbora:</span> {{ hints.pista2.tiempo }}
        </p>
      </div>

      <!-- Superpista -->
      <div v-if="hints.superPista.frase"
           class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
        <h5 class="font-bold text-gray-800 mb-3">Superpista</h5>
        <p class="text-gray-600 mb-3">{{ hints.superPista.frase }}</p>
        <p class="text-sm text-gray-500">
          <span class="font-semibold">Sistema:</span> {{ hints.superPista.sistema }} | 
          <span class="font-semibold">Aldia eta denbora:</span> {{ hints.superPista.tiempo }}
        </p>
      </div>
    </div>

    <!-- Megapista -->
    <div v-if="hints.megaPista.imagen" class="mt-6">
      <div class="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
        <h5 class="font-bold text-gray-800 mb-3 text-center">Megapista</h5>
        <img 
          :src="hints.megaPista.imagen" 
          alt="Megapista" 
          class="w-full rounded-lg"
        >
      </div>
    </div>
  </div>
</template>