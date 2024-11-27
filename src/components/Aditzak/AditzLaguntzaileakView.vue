<script setup>
import { ref, computed, onMounted } from 'vue'
import SystemSelectors from '@/components/Aditzak/SystemSelectors.vue'
import TimeSelectors from '@/components/Aditzak/TimeSelectors.vue'
import GameArea from '@/components/Aditzak/GameArea.vue'
import GameOverlay from '@/components/Aditzak/GameOverlay.vue'
import aditzakJsonData from '@/data/aditzak.json'
import esaldiakJsonData from '@/data/esaldiak.json'
import {
  seleccionarSujeto,
  seleccionarObjeto,
  aplicarReglasFrase,
  obtenerConjugacionSujeto,
  obtenerConjugacionObjeto,
  obtenerConjugacion
} from '@/utils.js'

const sistemas = ref([
  { id: 'nor', name: 'NOR', active: true },
  { id: 'nor-nori', name: 'NOR-NORI', active: true },
  { id: 'nor-nork', name: 'NOR-NORK', active: true },
  { id: 'nor-nori-nork', name: 'NOR-NORI-NORK', active: true }
])

const tiempos = ref([
  { id: 'orain', name: 'ORAINALDIA', active: true },
  { id: 'lehen', name: 'LEHENALDIA', active: true },
  { id: 'bal_hip', name: 'BALDINTZA HIPOTETIKOA', active: true },
  { id: 'ond_or', name: 'ONDORIOA ORAINALDIAN', active: true },
  { id: 'ond_leh', name: 'ONDORIOA LEHENALDIAN', active: true },
  { id: 'ahal_or', name: 'AHALERA ORAINALDIAN', active: true },
  { id: 'ahal_leh', name: 'AHALERA LEHENALDIAN', active: true },
  { id: 'ahal_hip', name: 'AHALERA HIPOTETIKOA', active: true },
  { id: 'subj_or', name: 'SUBJUNTIBOA ORAINALDIAN', active: true },
  { id: 'subj_leh', name: 'SUBJUNTIBOA LEHENALDIAN', active: true },
  { id: 'agintera', name: 'AGINTERA', active: true }
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
  frasesUsadas: []
})

const aditzakData = ref(null) // Aquí cargarás tus datos
const esaldiak = ref(null) // Aquí cargarás tus datos

const sistemasActivos = computed(() => {
  return sistemas.value.filter(s => s.active).map(s => s.id)
})

const tiemposActivos = computed(() => {
  return tiempos.value.filter(t => t.active).map(t => t.id)
})

const gruposActivos = computed(() => {
  if (!aditzakData.value || sistemasActivos.value.length === 0) return []
  
  // Filtrar por sistemas activos
  return aditzakData.value.filter(grupo => sistemasActivos.value.includes(grupo.sistema))
})

function cargarJuegoAditzak() {
  if (sistemasActivos.value.length === 0 || tiemposActivos.value.length === 0) {
    sistemas.value[0].active = true
    return
  }

  const grupoAleatorio = gruposActivos.value[Math.floor(Math.random() * gruposActivos.value.length)]
  const tiempoAleatorio = tiemposActivos.value[Math.floor(Math.random() * tiemposActivos.value.length)]
  
  const frasesSistema = esaldiak.value.find(sistema => sistema.id === grupoAleatorio.sistema)?.frases || []
  const fraseAleatoria = frasesSistema[Math.floor(Math.random() * frasesSistema.length)]
  
  if (!fraseAleatoria) return
  
  // Manejar sujeto y objeto
  let fraseConjugada = fraseAleatoria.phrase
  const variables = fraseAleatoria.variables || {}
  
  // Sujeto
  const subject = variables.subject_fixed || seleccionarSujeto(grupoAleatorio.sistema)
  const subject_conj = variables.subject_conjugation || obtenerConjugacionSujeto(subject)
  fraseConjugada = fraseConjugada.replace('{subject}', subject)
  
  // Get object if needed
  let object = null
  let object_conj = null
  if (fraseConjugada.includes('{object}')) {
    object = variables.object_fixed || seleccionarObjeto(grupoAleatorio.sistema, subject)
    object_conj = variables.object_conjugation || obtenerConjugacionObjeto(object)
    fraseConjugada = fraseConjugada.replace('{object}', object)
  }
  
  fraseConjugada = aplicarReglasFrase(fraseConjugada, tiempoAleatorio)
  
  const numero = variables.number || 'Sing'
  const conjugacionCorrecta = obtenerConjugacion(grupoAleatorio, tiempoAleatorio, subject_conj, object_conj, numero)
  
  gameState.value = {
    ...gameState.value,
    currentPhrase: fraseConjugada,
    selectedSistema: grupoAleatorio.sistema,
    selectedTime: tiempoAleatorio, 
    correctAnswer: conjugacionCorrecta,
    intentos: 0,
    respuestasIncorrectas: [],
    currentSubject: subject,
    currentObject: object
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
  cargarJuegoAditzak() // Reiniciar el juego seleccionando una nueva frase
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

// Cargar datos iniciales y comenzar el juego
onMounted(async () => {
  // Transformar aditzak
  aditzakData.value = Object.entries(aditzakJsonData.sistema).map(([sistema, conjugaciones]) => ({
    sistema,
    ...conjugaciones
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
  <div class="container mt-4">
    <h1 class="display-4 text-center">Aditz Laguntzaileak Jokoa</h1>
    
    <div class="row">
      <div class="col-md-3 d-none d-sm-block">
        <SystemSelectors
          v-model:sistemas="sistemas"
          @update:sistema="handleSystemUpdate"
        />
        <TimeSelectors
          v-model:tiempos="tiempos"
          @update:tiempo="handleTimeUpdate"
        />
      </div>
      
      <div class="col-md-9">
        <GameArea
          v-model:gameState="gameState"
          :sistemas="sistemas"
          :tiempos="tiempos"
          @answer-submitted="handleAnswer"
          @restart-game="handleRestartGame"
        />
      </div>
    </div>

    <GameOverlay
      v-if="gameState.showOverlay"
      :message="gameState.overlayMessage"
      :is-correct="gameState.isCorrect"
      @close="handleOverlayClose"
    />
  </div>
</template>