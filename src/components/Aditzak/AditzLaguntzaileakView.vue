<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useTheme } from '@/composables/useTheme'
import HitanoSelector from './HitanoSelector.vue'
import GameArea from './GameArea.vue'
import GameOverlay from '@/components/Aditzak/GameOverlay.vue'
import SystemSelectors from '@/components/Aditzak/SystemSelectors.vue'
import TimeSelectors from '@/components/Aditzak/TimeSelectors.vue'
import aditzakJsonData from '@/data/aditzak.json'
import esaldiakJsonData from '@/data/esaldiak.json'
import { Settings } from 'lucide-vue-next'
import MobileSettingsModal from './MobileSettingsModal.vue'
import {
  selectValidPhrase,
  composePhrase,
  conjugacionExists,
  obtenerConjugacion,
  SISTEMA_NAMES,
  TIEMPO_NAMES
} from '@/utils.js'

const showMobileSettings = ref(false)
const hitanoEnabled = ref(false)
// const { setTheme } = useTheme()

// watch(hitanoEnabled, (newValue) => {
//   setTheme(newValue ? 'hitano' : 'default')
// }, { immediate: true })

const emit = defineEmits(['theme-change'])

watch(hitanoEnabled, (newValue) => {
  emit('theme-change', newValue ? 'hitano' : 'default')
})

const sistemas = ref([
  { id: 'nor', name: SISTEMA_NAMES['nor'], active: true },
  { id: 'nor-nori', name: SISTEMA_NAMES['nor-nori'], active: true },
  { id: 'nor-nork', name: SISTEMA_NAMES['nor-nork'], active: true },
  { id: 'nor-nori-nork', name: SISTEMA_NAMES['nor-nori-nork'], active: true }
])

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

const gameState = ref({
  currentPhrase: '',
  selectedSistema: '',
  selectedTime: '',
  correctAnswer: '',
  intentos: 0,
  respuestasIncorrectas: [],
  showOverlay: false,
  overlayMessage: '',
  isCorrect: false,
  aukerakMessage: 'Hiru aukera dituzu',
  frasesUsadas: [],
  currentSubject: null,
  currentObject: null,
  hitanoEnabled: false
})

const aditzakData = ref(null)
const esaldiak = ref(null)

const sistemasActivos = computed(() => {
  return sistemas.value.filter(s => s.active).map(s => s.id)
})

const tiemposActivos = computed(() => {
  return tiempos.value.filter(t => t.active).map(t => t.id)
})

const gruposActivos = computed(() => {
  if (!aditzakData.value || sistemasActivos.value.length === 0) return []
  return aditzakData.value.filter(grupo => sistemasActivos.value.includes(grupo.sistema))
})

// Función para filtrar conjugaciones de hitano
function filterHitanoConjugations(conjugations) {
  if (hitanoEnabled.value) return conjugations

  // Filtrar las conjugaciones que contengan HI, HIK, o HIRI cuando hitano está desactivado
  return conjugations.filter(conj => {
    const hitanoPatterns = ['HI', 'HIK', 'HIRI']
    return !hitanoPatterns.some(pattern => 
      conj.selectedSubject?.includes(pattern) || 
      conj.selectedObject?.includes(pattern)
    )
  })
}

function handleHitanoChange(enabled) {
  hitanoEnabled.value = enabled
  // Reiniciar el juego para aplicar el filtro de hitano
  cargarJuegoAditzak()
}

function cargarJuegoAditzak(retryCount = 0) {
  try {
    // Validación inicial de sistemas y tiempos activos
    if (sistemasActivos.value.length === 0 || tiemposActivos.value.length === 0) {
      sistemas.value[0].active = true
      return
    }

    // Evitar bucles infinitos de retry
    if (retryCount > 10) {
      console.error('Demasiados intentos de cargar el juego')
      return
    }

    // Seleccionar sistema y tiempo aleatorios
    const grupoAleatorio = gruposActivos.value[Math.floor(Math.random() * gruposActivos.value.length)]
    const tiempoAleatorio = tiemposActivos.value[Math.floor(Math.random() * tiemposActivos.value.length)]

    // Obtener frase válida con sujeto/objeto
    const phraseData = selectValidPhrase(grupoAleatorio.sistema, tiempoAleatorio)
    if (!phraseData) {
      console.warn(`No se encontraron combinaciones válidas para ${grupoAleatorio.sistema}, intentando otro sistema`)
      return cargarJuegoAditzak(retryCount + 1)
    }

    

    // Filtrar conjugaciones de hitano si es necesario
    if (!hitanoEnabled.value && phraseData) {
      const hitanoPatterns = ['HI', 'HIK', 'HIRI']
      if (hitanoPatterns.some(pattern => 
        phraseData.selectedSubject?.includes(pattern) || 
        phraseData.selectedObject?.includes(pattern)
      )) {
        return cargarJuegoAditzak(retryCount + 1)
      }
    }

    // Verificar que la conjugación existe
    if (!conjugacionExists(
      grupoAleatorio.sistema,
      tiempoAleatorio,
      phraseData.selectedSubject,
      phraseData.selectedObject,
      phraseData.variables?.number || 'Sing'
    )) {
      console.warn('Conjugación no encontrada, intentando otra combinación')
      return cargarJuegoAditzak(retryCount + 1)
    }

    // Componer la frase
    const composedPhrase = composePhrase(phraseData, grupoAleatorio.sistema, tiempoAleatorio)

    // Obtener conjugación
    const conjugacionCorrecta = obtenerConjugacion(
      { [grupoAleatorio.sistema]: grupoAleatorio },
      tiempoAleatorio,
      phraseData.selectedSubject,
      phraseData.selectedObject,
      phraseData.variables?.number || 'Sing'
    )

    if (!conjugacionCorrecta) {
      throw new Error('No se pudo obtener la conjugación correcta')
    }

    console.log('Debug auxiliar:', {
      auxiliar: conjugacionCorrecta
    })

    // Actualizar estado del juego
    gameState.value = {
      ...gameState.value,
      currentPhrase: composedPhrase,
      selectedSistema: grupoAleatorio.sistema,
      selectedTime: tiempoAleatorio,
      correctAnswer: conjugacionCorrecta,
      intentos: 0,
      respuestasIncorrectas: [],
      currentSubject: phraseData.selectedSubject,
      currentObject: phraseData.selectedObject,
      showOverlay: false,
      isCorrect: false,
      aukerakMessage: 'Hiru aukera dituzu'
    }
  } catch (error) {
    console.error('Error al cargar el juego:', error)
    return cargarJuegoAditzak(retryCount + 1)
  }
}

function handleAnswer(answer) {
  const cleanAnswer = answer.replace(/\(|\)/g, '')
  const cleanCorrect = gameState.value.correctAnswer.replace(/\(|\)/g, '')

  if (cleanAnswer.toLowerCase() === cleanCorrect.toLowerCase()) {
    handleCorrectAnswer()
  } else {
    handleIncorrectAnswer(answer)
  }
}

function handleCorrectAnswer() {
  const mensajesAcierto = ["Oso ondo!", "Primeran!", "Ederki!", "Bikain!", "Jarraitu honela!"]
  
  gameState.value = {
    ...gameState.value,
    isCorrect: true,
    showOverlay: true,
    overlayMessage: mensajesAcierto[Math.floor(Math.random() * mensajesAcierto.length)]
  }
}

function handleIncorrectAnswer(answer) {
  gameState.value.intentos++
  gameState.value.respuestasIncorrectas.push({
    numero: gameState.value.intentos,
    respuesta: answer
  })

  if (gameState.value.intentos === 1) {
    gameState.value.aukerakMessage = "Bi aukera dituzu"
  } else if (gameState.value.intentos === 2) {
    gameState.value.aukerakMessage = "Azken aukera duzu"
  } else {
    gameState.value = {
      ...gameState.value,
      isCorrect: false,
      showOverlay: true,
      overlayMessage: `Aukera zuzena: ${gameState.value.correctAnswer}`
    }
  }
}

function handleOverlayClose() {
  gameState.value.showOverlay = false
  cargarJuegoAditzak()
}

function handleSystemUpdate(newSistemas) {
  sistemas.value = newSistemas
  cargarJuegoAditzak()
}

function handleTimeUpdate(newTiempos) {
  tiempos.value = newTiempos
  cargarJuegoAditzak()
}

function handleRestartGame() {
  cargarJuegoAditzak()
}

onMounted(async () => {
  // Transformar aditzak
  aditzakData.value = Object.entries(aditzakJsonData.sistema).map(([sistema, conjugaciones]) => ({
    sistema,
    ...conjugaciones,
    [sistema]: conjugaciones
  }))

  // Transformar esaldiak
  esaldiak.value = Object.entries(esaldiakJsonData.sistema).map(([id, frases]) => ({
    id,
    frases
  }))

  cargarJuegoAditzak()
})


</script>

<template>
  <div class="min-h-screen py-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex-1 justify-between items-center mb-8">
        <button 
          class="ezarpenak md:hidden backdrop-blur-card p-2 text-[var(--text-primary)] "
          @click="showMobileSettings = !showMobileSettings"
        >
          <Settings class="h-6 w-6"></Settings>
        </button>
      </div>
      
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Panel de configuración móvil -->
        <!-- <div 
          class="md:hidden slide-in"
          v-show="showMobileSettings"
        >
          <div class="bg-[var(--bg-card)] backdrop-blur-lg rounded-2xl p-6 shadow-lg space-y-6">
            <HitanoSelector v-model:hitanoEnabled="hitanoEnabled" />
            <SystemSelectors 
              v-model:sistemas="sistemas"
              @update:sistema="handleSystemUpdate"
            />
            <TimeSelectors
              v-model:tiempos="tiempos"
              @update:tiempo="handleTimeUpdate"
            />            
          </div>
        </div> -->

        <MobileSettingsModal v-model="showMobileSettings">
      <div class="space-y-6">
        <HitanoSelector v-model:hitanoEnabled="hitanoEnabled" />
        <SystemSelectors 
          v-model:sistemas="sistemas"
          @update:sistema="handleSystemUpdate"
        />
        <TimeSelectors
          v-model:tiempos="tiempos"
          @update:tiempo="handleTimeUpdate"
        />            
      </div>
    </MobileSettingsModal>

        <!-- Panel de configuración desktop izquierdo -->
        <div class="hidden md:block w-64 space-y-6">
          <div class="bg-[var(--bg-card)] backdrop-blur-lg rounded-2xl shadow-lg">
            <HitanoSelector v-model:hitanoEnabled="hitanoEnabled" />
          </div>

          <div class="bg-[var(--bg-card)] backdrop-blur-lg rounded-2xl shadow-lg">
            <SystemSelectors
              v-model:sistemas="sistemas"
              @update:sistema="handleSystemUpdate"
            />
          </div>
        </div>
        
        <!-- Área principal del juego -->
        <div class="flex-1">
          <GameArea
            v-model:gameState="gameState"
            :sistemas="sistemas"
            :tiempos="tiempos"
            @answer-submitted="handleAnswer"
            @restart-game="handleRestartGame"
            class="fade-in"
          />
        </div>

        <!-- Panel de configuración desktop derecho -->
        <div class="hidden md:block w-64">
          <div class="bg-[var(--bg-card)] backdrop-blur-lg rounded-2xl shadow-lg">
            <TimeSelectors
              v-model:tiempos="tiempos"
              @update:tiempo="handleTimeUpdate"
            />
          </div>
        </div>
      </div>

      <!-- Game Overlay -->
      <GameOverlay
        v-if="gameState.showOverlay"
        :message="gameState.overlayMessage"
        :is-correct="gameState.isCorrect"
        :sistema="gameState.selectedSistema"
        :tiempo="gameState.selectedTime"
        :phrase="gameState.currentPhrase"
        :correct-answer="gameState.correctAnswer"
        @close="handleOverlayClose"
        class="fade-in"
      />
    </div>
  </div>
</template>
<style>
.ezarpenak:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}
.ezarpenak {
    background: var(--button-transparent-bg);
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    transition: box-shadow 0.3s ease;
}

.ezarpenak:active {
    box-shadow: inset 8px 8px 16px rgba(0, 0, 0, 0.2), inset -8px -8px 16px rgba(255, 255, 255, 0.2);
}

#app {
  width: 100%;
}

</style>