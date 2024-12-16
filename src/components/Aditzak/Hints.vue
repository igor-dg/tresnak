<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronRight, Lightbulb, RefreshCw } from 'lucide-vue-next';
import HintOverlay from './HintOverlay.vue'
import norConjugations from '@/data/nor-conjugations.json'
import {
  selectValidPhrase,
  composePhrase,
  conjugacionExists,
  obtenerConjugacion,
  obtenerSistemaData,
  TIEMPO_NAMES
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

const tiempos = ref([
  { id: 'orain', name: TIEMPO_NAMES['orain'], active: true },
  { id: 'lehen', name: TIEMPO_NAMES['lehen'], active: true },
  { id: 'bal_hip', name: TIEMPO_NAMES['bal_hip'], active: true },
  { id: 'ond_or', name: TIEMPO_NAMES['ond_or'], active: true },
  { id: 'ond_leh', name: TIEMPO_NAMES['ond_leh'], active: true },
  { id: 'ahal_or', name: TIEMPO_NAMES['ahal_or'], active: true },
  { id: 'ahal_leh', name: TIEMPO_NAMES['ahal_leh'], active: true },
  { id: 'ahal_hip', name: TIEMPO_NAMES['ahal_hip'], active: true },
  { id: 'subj_or', name: TIEMPO_NAMES['subj_or'], active: true },
  { id: 'subj_leh', name: TIEMPO_NAMES['subj_leh'], active: true },
  { id: 'agintera', name: TIEMPO_NAMES['agintera'], active: true }
])

const emit = defineEmits(['hint-used'])

const isMobile = ref(false)

const basePath = computed(() => {
  return import.meta.env.PROD ? '/tresnak/v2/img/' : '/img/'
})

const activeSystemCount = computed(() => {
  return props.sistemas.filter(sistema => sistema.active).length
})

const canShowPista1 = computed(() => !props.hints.pista1.used && activeSystemCount.value >= 2)
const canShowPista2 = computed(() => !props.hints.pista2.used && activeSystemCount.value >= 3 && props.hints.pista1.used)
const canShowSuperPista = computed(() => !props.hints.superPista.used)
const canShowMegaPista = computed(() => !props.hints.megaPista.used)

// Compute si la pista ya existe y se puede mostrar
const canDisplayPista1 = computed(() => props.hints.pista1.frase && activeSystemCount.value >= 2)
const canDisplayPista2 = computed(() => props.hints.pista2.frase && activeSystemCount.value >= 3)
const canDisplaySuperPista = computed(() => props.hints.superPista.frase)
const canDisplayMegaPista = computed(() => props.hints.megaPista.imagen)

// Estados para los overlays móviles
const showMobilePista1 = ref(false)
const showMobilePista2 = ref(false)
const showMobileSuperPista = ref(false)
const showMobileMegaPista = ref(false)

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

// Add a function to get the tiempo display name
function getTiempoDisplayName(tiempoId) {
  return TIEMPO_NAMES[tiempoId] || tiempoId
}

function showHint(type) {
  try {
    if (type === 'megaPista') {
      if (props.sistema.toLowerCase() === 'nor') {
        const conjugationData = norConjugations[props.tiempo]
        
        if (!conjugationData) {
          throw new Error(`No se encontraron conjugaciones para ${props.tiempo}`)
        }

        const subjects = ['ni', 'hi', 'hura', 'gu', 'zu', 'zuek', 'haiek']
        const conjugationList = conjugationData.conjugations.map((conj, index) => {
          return `${subjects[index]}: ${conj}`
        })

        emit('hint-used', {
          type,
          data: {
            isNorSystem: true,
            conjugations: conjugationList
          }
        })
        return
      }
      
      // Original image behavior for other systems
      emit('hint-used', {
        type,
        data: {
          imagen: `${basePath.value}${props.sistema.toLowerCase()}_${props.tiempo}.png`
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

function handleHintClick(type) {
  // Si la pista aún no se ha generado, generarla
  if ((type === 'pista1' && canShowPista1.value) ||
      (type === 'pista2' && canShowPista2.value) ||
      (type === 'superPista' && canShowSuperPista.value) ||
      (type === 'megaPista' && canShowMegaPista.value)) {
    showHint(type)
  }
  
  // Mostrar el overlay correspondiente
  switch(type) {
    case 'pista1':
      showMobilePista1.value = true
      break
    case 'pista2':
      showMobilePista2.value = true
      break
    case 'superPista':
      showMobileSuperPista.value = true
      break
    case 'megaPista':
      showMobileMegaPista.value = true
      break
  }
}

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.matchMedia('(max-width: 768px)').matches
  }
  
  // Comprobación inicial
  checkMobile()
  
  // Listener para cambios de tamaño
  window.addEventListener('resize', checkMobile)
  
  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
})
</script>

<template>
  <div class="w-full">
    <!-- Botones de Pistas -->
    <div class="flex flex-wrap justify-center gap-3">
      <button 
        v-if="activeSystemCount >= 2"
        :disabled="isMobile ? (!canShowPista1 && !canDisplayPista1) : !canShowPista1"
        @click="handleHintClick('pista1')"
        class="p-3 rounded-full text-white shadow-lg backdrop-blur-sm transition-all duration-200
               bg-gradient-to-r from-purple-400 to-purple-500
               hover:shadow-xl hover:scale-105 
               disabled:opacity-50 disabled:cursor-not-allowed
               active:scale-95"
      >
        <Lightbulb class="w-5 h-5" />
      </button>

      <button 
        v-if="activeSystemCount >= 3"
        :disabled="isMobile ? (!canShowPista2 && !canDisplayPista2) : !canShowPista2"
        @click="handleHintClick('pista2')"
        class="p-3 rounded-full text-white shadow-lg backdrop-blur-sm transition-all duration-200
               bg-gradient-to-r from-purple-400 to-purple-500
               hover:shadow-xl hover:scale-105 
               disabled:opacity-50 disabled:cursor-not-allowed
               active:scale-95"
      >
        <Lightbulb class="w-5 h-5" />
      </button>

      <button 
        :disabled="isMobile ? (!canShowSuperPista && !canDisplaySuperPista) : !canShowSuperPista"
        @click="handleHintClick('superPista')"
        class="p-3 rounded-full text-white shadow-lg backdrop-blur-sm transition-all duration-200
               bg-gradient-to-r from-amber-400 to-amber-500
               hover:shadow-xl hover:scale-105 
               disabled:opacity-50 disabled:cursor-not-allowed
               active:scale-95"
      >
        <Lightbulb class="w-5 h-5" />
      </button>

      <button 
        :disabled="isMobile ? (!canShowMegaPista && !canDisplayMegaPista) : !canShowMegaPista"
        @click="handleHintClick('megaPista')"
        class="p-3 rounded-full text-white shadow-lg backdrop-blur-sm transition-all duration-200
               bg-gradient-to-r from-red-400 to-red-500
               hover:shadow-xl hover:scale-105 
               disabled:opacity-50 disabled:cursor-not-allowed
               active:scale-95"
      >
        <Lightbulb class="w-5 h-5" />
      </button>
    </div>

    <!-- Overlays para todas las pantallas -->
    <HintOverlay
      v-if="hints.pista1.frase"
      :is-open="showMobilePista1"
      title="1. Pista"
      :hint="hints.pista1"
      @close="showMobilePista1 = false"
    />

    <HintOverlay
      v-if="hints.pista2.frase"
      :is-open="showMobilePista2"
      title="2. Pista"
      :hint="hints.pista2"
      @close="showMobilePista2 = false"
    />

    <HintOverlay
      v-if="hints.superPista.frase"
      :is-open="showMobileSuperPista"
      title="Superpista"
      :hint="hints.superPista"
      @close="showMobileSuperPista = false"
    />

    <HintOverlay
      v-if="hints.megaPista.imagen || hints.megaPista.isNorSystem"
      :is-open="showMobileMegaPista"
      title="Megapista"
      :hint="hints.megaPista"
      @close="showMobileMegaPista = false"
    />
  </div>
</template>

<style scoped>
.hint-button {
  @apply p-3 rounded-full text-white transition-all duration-200 
         shadow-lg backdrop-blur-sm
         disabled:opacity-50 disabled:cursor-not-allowed
         hover:shadow-xl hover:scale-105 
         active:scale-95;
}

.hint-card {
  @apply backdrop-blur-md rounded-xl p-4 shadow-lg
         border border-white/10;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>