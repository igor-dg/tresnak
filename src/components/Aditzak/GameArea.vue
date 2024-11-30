<script setup>
import { ref, watch } from 'vue'
import { ChevronRight, RefreshCw } from 'lucide-vue-next'
import Hints from './Hints.vue'
import { getSistemaDisplayName, getTiempoDisplayName } from '@/utils'

const props = defineProps({
  gameState: {
    type: Object,
    required: true
  },
  sistemas: {
    type: Array,
    required: true,
  }
})

// userAnswer ref-a gehitu
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

// Emits definitu
const emit = defineEmits(['answer-submitted', 'restart-game'])
</script>

<template>
  <div class="w-full max-w-2xl px-4 mx-auto">
    <div class="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg">
      <!-- Sistema y Tiempo -->
      <div class="text-center text-gray-600 space-y-1">
        <div><span class="font-medium">Sistema:</span> {{ getSistemaDisplayName(gameState.selectedSistema) }}</div>
        <div><span class="font-medium">Denbora:</span> {{ getTiempoDisplayName(gameState.selectedTime) }}</div>
      </div>

      <!-- Mensaje de Intentos -->
      <div class="text-center mt-4">
        <span 
          class="inline-block px-4 py-1.5 rounded-full font-medium"
          :class="{
            'bg-green-100 text-green-800': gameState.intentos === 0,
            'bg-yellow-100 text-yellow-800': gameState.intentos === 1,
            'bg-red-100 text-red-800': gameState.intentos === 2
          }"
        >
          {{ gameState.aukerakMessage }}
        </span>
      </div>

      <!-- Frase Principal -->
      <div class="min-h-[6rem] flex items-center justify-center">
        <p class="text-2xl font-medium text-gray-800 mb-6 text-center">
          {{ gameState.currentPhrase }}...
        </p>
      </div>
      
      <!-- Formulario de Respuesta -->
      <form @submit.prevent="submitAnswer" class="space-y-4">
        <div class="relative">
          <input
            type="text"
            v-model="userAnswer"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            placeholder="Idatzi zure erantzuna"
          />
          <button
            type="submit"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ChevronRight class="size-5" />
          </button>
        </div>
      </form>

      <!-- Respuestas Incorrectas -->
      <div class="mt-6 space-y-2">
        <div 
          v-for="(intento, index) in gameState.respuestasIncorrectas" 
          :key="index"
          class="text-center text-red-600"
        >
          {{ getIntentoText(intento.numero) }} aukera: {{ intento.respuesta }} - okerra
        </div>
      </div>

      <!-- Hints Component -->
      <Hints
        :sistema="gameState.selectedSistema"
        :tiempo="gameState.selectedTime"
        :current-subject="gameState.subject || ''"
        :current-object="gameState.object || ''"
        :hints="hints"
        :sistemas="sistemas"
        @hint-used="handleHintUsed"
        class="mt-6"
      />

      <!-- Botón de Siguiente -->
      <div class="mt-6 flex justify-end">
        <button
          @click="nextQuestion"
          class="p-3 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors flex items-center gap-2"
        >
          <RefreshCw class="size-5" />
          <span>Hurrengoa</span>
        </button>
      </div>
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