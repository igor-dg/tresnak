<script setup>
import { ref, watch } from 'vue'
import { ArrowRight, RefreshCw } from 'lucide-vue-next'
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

const userAnswer = ref('')

const hints = ref({
  pista1: { used: false, frase: '', sistema: '', tiempo: '' },
  pista2: { used: false, frase: '', sistema: '', tiempo: '' },
  superPista: { used: false, frase: '', sistema: '', tiempo: '' },
  megaPista: { used: false, imagen: '' }
})

watch(() => props.gameState.currentPhrase, () => {
  resetHints()
})

function submitAnswer() {
  if (!userAnswer.value) return
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

const emit = defineEmits(['answer-submitted', 'restart-game'])
</script>

<template>
  <div class="w-full max-w-md mx-auto bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-lg space-y-8">
    <!-- Game Info -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <div class="text-sm text-amber-700">Sistema:</div>
        <div class="text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-full px-4 py-1 inline-block">
          {{ getSistemaDisplayName(gameState.selectedSistema) }}
        </div>
      </div>
      <div class="space-y-1">
        <div class="text-sm text-amber-700">Denbora:</div>
        <div class="text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full px-4 py-1 inline-block">
          {{ getTiempoDisplayName(gameState.selectedTime) }}
        </div>
      </div>
    </div>

    <!-- Attempts Left -->
    <div class="text-center">
      <span class="text-amber-600 text-sm">{{ gameState.aukerakMessage }}</span>
      <div class="flex justify-center gap-2 mt-2">
        <div
          v-for="i in 3"
          :key="i"
          :class="{
            'w-3 h-3 rounded-full transition-all': true,
            'bg-white scale-100': i <= gameState.intentos,
            'bg-white/50 scale-110': i === gameState.intentos + 1,
            'bg-white/30': i > gameState.intentos + 1
          }"
        >
      </div>
      </div>
    </div>

    <!-- Question -->
    <div class="text-2xl font-bold text-center text-amber-700 drop-shadow-sm">
      {{ gameState.currentPhrase }}...
    </div>

    <!-- Input Area -->
    <form @submit.prevent="submitAnswer" class="relative">
      <input
        type="text"
        v-model="userAnswer"
        class="w-full bg-white/50 rounded-full py-4 px-6 text-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-300"
        :style="{ color: 'var(--text-primary)'}"
        placeholder="Idatzi zure erantzuna"
      />
      <button 
        type="submit"
        :class="{
        'absolute right-2 top-1/2 -translate-y-1/2 transition-all focus:outline-none focus:ring-2 rounded-full p-2': true,
        'bg-gradient-to-r': true,
        'from-[var(--gradient-from)]': true,
        'to-[var(--gradient-to)]': true,
        'hover:from-[var(--gradient-hover-from)]': true,
        'hover:to-[var(--gradient-hover-to)]': true,
        'focus:ring-[var(--gradient-from)]': true
      }"
      >
        <ArrowRight class="w-6 h-6" />
      </button>
    </form>

    <!-- Incorrect Answers -->
    <div v-if="gameState.respuestasIncorrectas.length > 0" class="space-y-2">
      <div 
        v-for="(respuesta, index) in gameState.respuestasIncorrectas" 
        :key="index"
        class="text-center" :style="{ color: 'var(--text-secondary)'}"
      >
        {{ respuesta.respuesta }} - okerra
      </div>
    </div>

    <!-- Hints -->
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

    <!-- Next Button -->
    <button 
      @click="nextQuestion"
      :class="{
        'w-full text-white rounded-full py-3 px-4 flex items-center justify-center gap-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2': true,
        'bg-gradient-to-r': true,
        'from-[var(--gradient-from)]': true,
        'to-[var(--gradient-to)]': true,
        'hover:from-[var(--gradient-hover-from)]': true,
        'hover:to-[var(--gradient-hover-to)]': true,
        'focus:ring-[var(--gradient-from)]': true
      }"
    >
      <RefreshCw class="w-5 h-5" />
      Hurrengoa
    </button>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

input::placeholder {
  color: var(--text-secondary);
}
</style>