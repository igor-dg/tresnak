<script setup>
import { ref, watch } from 'vue'
import Hints from './Hints.vue'

const props = defineProps({
  gameState: {
    type: Object,
    required: true
  },
  sistemas: {
    type: Array,
    required: true
  },
  tiempos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:gameState', 'answer-submitted', 'restart-game'])

const userAnswer = ref('')
const hints = ref({
  pista1: { used: false, frase: '', sistema: '', tiempo: '' },
  pista2: { used: false, frase: '', sistema: '', tiempo: '' },
  superPista: { used: false, frase: '', sistema: '', tiempo: '' },
  megaPista: { used: false, imagen: '' }
})

// Add watcher to reset hints when currentPhrase changes
watch(() => props.gameState.currentPhrase, () => {
  resetHints()
})

function submitAnswer() {
  emit('answer-submitted', userAnswer.value)
  userAnswer.value = ''
}

function nextQuestion() {
  resetHints()
  emit('restart-game')
}

function resetHints() {
  hints.value = {
    pista1: { used: false, frase: '', sistema: '', tiempo: '' },
    pista2: { used: false, frase: '', sistema: '', tiempo: '' },
    superPista: { used: false, frase: '', sistema: '', tiempo: '' },
    megaPista: { used: false, imagen: '' }
  }
}

function handleHintUsed(hintData) {
  const { type, data } = hintData
  hints.value[type] = { ...data, used: true }
}

function getIntentoText(intento) {
  const textos = ["Lehenengo", "Bigarren", "Hirugarren"]
  return textos[intento - 1]
}
</script>

<template>
    <div class="card">
      <div class="card-body">
        <p class="text-center">
          <strong>Sistema:</strong> {{ gameState.selectedSistema }} | 
          <strong>Denbora:</strong> {{ gameState.selectedTime }}
        </p>
  
        <div class="form-group d-flex justify-content-center align-items-center">
          <h2 class="mb-0">{{ gameState.currentPhrase }}... </h2>
          <input 
            type="text" 
            v-model="userAnswer"
            class="form-control form-control-lg ml-2" 
            placeholder="Idatzi zure erantzuna"
            style="max-width: 300px;"
            @keyup.enter="submitAnswer"
          >
        </div>
  
        <div 
          v-for="(intento, index) in gameState.respuestasIncorrectas" 
          :key="index" 
          class="mb-2"
        >
          <p class="text-center my-4">
            {{ getIntentoText(intento.numero) }} aukera: {{ intento.respuesta }} - okerra
          </p>
        </div>
  
        <h3 class="card-title text-center mb-4">{{ gameState.aukerakMessage }}</h3>
  
        <div class="text-center mt-3">
          <button class="btn btn-primary btn-lg mr-2" @click="submitAnswer">Baieztatu</button>
          <button class="btn btn-secondary btn-lg" @click="nextQuestion">Hurrengoa</button>
        </div>
  
        <Hints
    :sistema="gameState.selectedSistema"
    :tiempo="gameState.selectedTime"
    :currentSubject="gameState.currentSubject"
    :currentObject="gameState.currentObject"
    :hints="hints"
    @hint-used="handleHintUsed"
  />
      </div>
    </div>
  </template>
  
  <style scoped>
  .form-control {
    margin-left: 1rem;
  }
  
  .btn {
    margin: 0 0.5rem;
  }
  </style>