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
  <div class="w-full max-w-md mx-auto space-y-6">
    <!-- Game Info -->
    <div class="flex justify-between items-center">
      <div class="space-y-1">
        <div class="text-sm text-[var(--text-secondary)]">Sistema:</div>
        <div class="label-chip">
          {{ getSistemaDisplayName(gameState.selectedSistema) }}
        </div>
      </div>
      <div class="space-y-1">
        <div class="text-sm text-[var(--text-secondary)]">Denbora:</div>
        <div class="text-sm font-semibold text-white bg-[var(--accent-primary)] rounded-md px-3 py-1 inline-block">
          {{ getTiempoDisplayName(gameState.selectedTime) }}
        </div>
      </div>
    </div>

    <!-- Attempts Left -->
    <div class="text-center">
      <span class="text-[var(--text-secondary)] text-sm">{{ gameState.aukerakMessage }}</span>
      <div class="flex justify-center gap-2 mt-2">
        <div
          v-for="i in 3"
          :key="i"
          :class="{
            'w-3 h-3 rounded-full transition-all border border-[var(--border-strong)]': true,
            'bg-[var(--accent-primary)] scale-100': i <= gameState.intentos,
            'bg-white scale-110': i === gameState.intentos + 1,
            'bg-[var(--bg-soft)]': i > gameState.intentos + 1
          }"
        >
      </div>
      </div>
    </div>

    <!-- Question -->
    <div class="text-2xl font-bold text-center text-[var(--text-primary)]">
      {{ gameState.currentPhrase }}...
    </div>

    <!-- Input Area -->
    <form @submit.prevent="handleAnswer" class="relative">
      <input
        type="text"
        v-model="userAnswer"
        class="input text-center text-lg py-4"
        :style="{ color: 'var(--text-primary)'}"
        placeholder="Idatzi zure erantzuna"
      />
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
        @click="handleAnswer"
        class="flex-1 btn-primary rounded-md py-3 px-4 text-lg"
      >
        <ArrowRight class="w-6 h-6" />
        Baieztatu
      </button>

      <button
        @click="nextQuestion"
        title="Aldatu esaldia"
        class="btn-secondary rounded-md py-3 px-4"
      >
        <RefreshCw class="w-5 h-5" />
      </button>

      <button
        @click="goToStats"
        title="Estatistikak"
        class="btn-secondary rounded-md py-3 px-4"
      >
        <ChartLine class="w-5 h-5" />
      </button>
    </div>
    
  </div>
</template>
