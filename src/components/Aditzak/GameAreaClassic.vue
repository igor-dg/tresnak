<script setup>
import { ref, watch } from 'vue'
import { ArrowRight, RefreshCw, ChartLine } from 'lucide-vue-next'
import Hints from './Hints.vue'
import { getSistemaDisplayName, getTiempoDisplayName } from '@/utils'
import { useStatsService } from '@/composables/useStatsService'
import { useRouter } from 'vue-router'



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
  megaPista: { used: false }  // Ya no necesitamos inicializar 'imagen'
})

watch(() => props.gameState.currentPhrase, () => {
  resetHints()
})

function submitAnswer() {
  if (!userAnswer.value) return
  emit('answer-submitted', userAnswer.value)
  userAnswer.value = ''
}

const { saveAditzakAttempt } = useStatsService()

const handleAnswer = async () => {
  if (!userAnswer.value) return
  
  // Asumiendo que props.gameState.selectedTime contiene el tiempo verbal actual
  const tiempo = props.gameState.selectedTime
  const isCorrect = userAnswer.value.toLowerCase().trim() === props.gameState.correctAnswer.toLowerCase().trim()
  
  // Guardar estadística
  await saveAditzakAttempt(
    props.gameState.selectedSistema,
    tiempo,
    isCorrect
  )

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
    megaPista: { used: false }
  }
}

function handleHintUsed(hintData) {
  const { type, data } = hintData
  hints.value[type] = { ...data, used: true }
}

const emit = defineEmits(['answer-submitted', 'restart-game'])

const router = useRouter()

const goToStats = () => {
  router.push({ name: 'estatistikak' })
}
</script>

<template>
  <div class="w-full max-w-md mx-auto bg-transparent rounded-3xl  space-y-8">
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
      <span class="text-amber-700 text-sm">{{ gameState.aukerakMessage }}</span>
      <div class="flex justify-center gap-2 mt-2">
        <div
          v-for="i in 3"
          :key="i"
          :class="{
            'w-3 h-3 rounded-full transition-all': true,
            'bg-white scale-100': i <= gameState.intentos,
            'bg-white/80 scale-110': i === gameState.intentos + 1,
            'bg-white/50': i > gameState.intentos + 1
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
    <!-- <form @submit.prevent="submitAnswer" class="relative">
      <input
        type="text"
        v-model="userAnswer"
        class="w-full bg-white/50 rounded-full py-4 px-6 text-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-300"
        :style="{ color: 'var(--text-primary)'}"
        placeholder="Idatzi zure erantzuna"
      /> -->
      <form @submit.prevent="handleAnswer" class="relative">
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

    <!-- Next and Stats Buttons -->
    <div class="flex gap-2">
      <button 
        @click="nextQuestion"
        title="Aldatu esaldia"
        :class="{
          'flex-1 text-white rounded-full py-3 px-4 flex items-center justify-center gap-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2': true,
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

      <button 
        @click="goToStats"
        title="Estatistikak"
        :class="{
          'text-white rounded-full py-3 px-4 flex items-center justify-center gap-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2': true,
          'bg-gradient-to-r': true,
          'from-[var(--gradient-from)]': true,
          'to-[var(--gradient-to)]': true,
          'hover:from-[var(--gradient-hover-from)]': true,
          'hover:to-[var(--gradient-hover-to)]': true,
          'focus:ring-[var(--gradient-from)]': true
        }"
      >
        <ChartLine class="w-5 h-5" />
      </button>
    </div>
    
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