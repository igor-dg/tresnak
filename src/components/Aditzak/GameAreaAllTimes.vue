<script setup>
import { ref, watch } from 'vue'
import { RefreshCw, Lightbulb, ChartLine } from 'lucide-vue-next'
import { getSistemaDisplayName, composePhrase } from '@/utils'
import HintOverlay from './HintOverlay.vue'
import norConjugations from '@/data/nor-conjugations.json'
import { useConjugations } from '@/composables/useConjugations'
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
  },
  tiempos: {
    type: Array,
    required: true
  }
})

const answers = ref({})
const results = ref({})
const megaPistas = ref({})
const showMegaPistaOverlay = ref(false)
const currentMegaPista = ref(null)

const basePath = `${import.meta.env.BASE_URL}img/`

// Initialize answers object with active times
watch(() => props.tiempos, (newTiempos) => {
  const newAnswers = {}
  newTiempos.forEach(tiempo => {
    if (tiempo.active) {
      newAnswers[tiempo.id] = ''
    }
  })
  answers.value = newAnswers
  megaPistas.value = {} // Reset megaPistas when times change
}, { immediate: true })

const { saveAditzakAttempt } = useStatsService()

const handleInputBlur = async (tiempo) => {
  if (!answers.value[tiempo]) {
    results.value[tiempo] = null
    return
  }

  const cleanAnswer = answers.value[tiempo].trim().replace(/\(|\)/g, '').toLowerCase()
  const correctAnswer = props.gameState.correctAnswers[tiempo]
  const cleanCorrect = correctAnswer?.replace(/\(|\)/g, '').toLowerCase()

  const isCorrect = cleanAnswer === cleanCorrect
  
  // Guardar estadística
  await saveAditzakAttempt(
    props.gameState.selectedSistema,
    tiempo,
    isCorrect
  )

  results.value = {
    ...results.value,
    [tiempo]: isCorrect ? 'zuzena' : 'okerra'
  }
}

const { getMegaPistaContent, isTextualMegaPista, isTableMegaPista } = useConjugations()

const handleMegaPista = (tiempo) => {
  const sistema = props.gameState.selectedSistema
  
  const content = getMegaPistaContent(sistema, tiempo)

  switch(content.type) {
    case 'text':
  const norPersons = ['ni', 'hi', 'hura', 'gu', 'zu', 'zuek', 'haiek']
  const conjugations = norConjugations[tiempo]?.conjugations || []
  
  currentMegaPista.value = {
    isNorSystem: true,
    currentNor: props.gameState.currentSubject,
    tiempo: tiempo,
    conjugations: conjugations.map((conj, index) => ({
      person: norPersons[index],
      conjugation: conj
    }))
  }
  break;
    case 'table':
      // Aquí necesitamos diferenciar entre nor-nork y nor-nori
      if (sistema.toUpperCase() === 'NOR-NORK') {
        currentMegaPista.value = {
          isNorNorkSystem: true,
          currentNor: props.gameState.currentSubject,
          currentNork: props.gameState.currentObject,
          tiempo: tiempo,
          conjugations: content.content
        }
      } else if (sistema.toUpperCase() === 'NOR-NORI') {
        currentMegaPista.value = {
          isNorNoriSystem: true, // Nueva propiedad para nor-nori
          currentNor: props.gameState.currentSubject,
          currentNori: props.gameState.currentObject, // Asumiendo que currentObject contiene el nori
          tiempo: tiempo,
          conjugations: content.content
        }
      } else if (sistema.toUpperCase() === 'NOR-NORI-NORK') {
        currentMegaPista.value = {
          isNorNoriNorkSystem: true,
          currentNumber: props.gameState.currentNumber || 'Sing',
          currentNork: props.gameState.currentSubject,  // NORK es el sujeto
          currentNori: props.gameState.currentObject,   // NORI es el objeto indirecto
          tiempo: tiempo,
          conjugations: content.content
        }
      }

      break
    case 'image':
      currentMegaPista.value = {
        imagen: content.content
      }
      break
  }


  megaPistas.value[tiempo] = currentMegaPista.value
  showMegaPistaOverlay.value = true
}

function getPlaceholder(tiempo) {
  if (!props.gameState?.originalPhrase || 
      !props.gameState?.selectedSistema || 
      !props.gameState?.currentSubject) {
    return `${tiempo.name}...`
  }

  try {
    const phraseData = {
      phrase: props.gameState.originalPhrase,
      variables: props.gameState.variables || {},
      selectedSubject: props.gameState.currentSubject,
      selectedObject: props.gameState.currentObject
    }

    return composePhrase(
      phraseData,
      props.gameState.selectedSistema,
      tiempo.id
    )
  } catch (error) {
    console.warn('Error al componer la frase:', error)
    return `${tiempo.name}...`
  }
}

function nextQuestion() {
  answers.value = Object.fromEntries(
    props.tiempos
      .filter(t => t.active)
      .map(t => [t.id, ''])
  )
  results.value = {}
  megaPistas.value = {}
  emit('restart-game')
}

const emit = defineEmits(['validate-answer', 'restart-game'])

const router = useRouter()

const goToStats = () => {
  router.push({ name: 'estatistikak' })
}
</script>

<template>
  <div class="space-y-8">
    <!-- Game Info -->
    <div class="flex justify-center">
      <div class="space-y-1 text-center">
        <div class="text-sm text-[var(--text-secondary)]">Sistema:</div>
        <div
          v-if="gameState.selectedSistema"
          class="label-chip"
        >
          {{ getSistemaDisplayName(gameState.selectedSistema) }}
        </div>
      </div>
    </div>

    <!-- Next and Stats Buttons -->
    <div class="flex gap-2">
      <button
        @click="nextQuestion"
        title="Aldatu esaldia"
        class="flex-1 btn-primary rounded-md py-3 px-4 text-lg"
      >
        <RefreshCw class="w-5 h-5" />
        Hurrengoa
      </button>

      <button
        @click="goToStats"
        title="Estatistikak"
        class="btn-secondary rounded-md py-3 px-4"
      >
        <ChartLine class="w-5 h-5" />
      </button>
    </div>

    <!-- Input Fields -->
    <div v-if="gameState.currentPhrase" class="space-y-4">
      <div 
        v-for="tiempo in tiempos" 
        :key="tiempo.id"
        v-show="tiempo.active" 
        class="space-y-2"
      >
        <label :for="tiempo.id" class="block text-sm font-medium text-[var(--text-secondary)]">
          {{ tiempo.name }}
        </label>
        <div class="relative flex items-center gap-2">
          <input
            :id="tiempo.id"
            type="text"
            v-model="answers[tiempo.id]"
            @blur="handleInputBlur(tiempo.id)"
            class="input text-lg"
            :placeholder="getPlaceholder(tiempo)"
          />
          <button
            @click="handleMegaPista(tiempo.id)"
            class="p-2.5 rounded-md text-white shadow-sm transition-all duration-200 bg-[var(--accent-warning)] hover:bg-[var(--accent-warning-hover)] active:scale-95"
          >
            <Lightbulb class="w-5 h-5" />
          </button>
          <span
            v-if="results[tiempo.id]"
            :class="{
              'absolute right-12 px-3 py-1 rounded-md text-sm font-medium text-center shrink-0': true,
              'bg-[var(--accent-success)] text-white': results[tiempo.id] === 'zuzena',
              'bg-[var(--accent-danger)] text-white': results[tiempo.id] === 'okerra'
            }"
          >
            {{ results[tiempo.id] }}
          </span>
        </div>
      </div>
    </div>

    <!-- MegaPista Overlay -->
    <HintOverlay
      v-if="currentMegaPista"
      :is-open="showMegaPistaOverlay"
      title="Megapista"
      :hint="currentMegaPista"
      @close="showMegaPistaOverlay = false"
    />
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .input-container {
    gap: 0.5rem;
  }
  
  .input-container input {
    min-width: 0;
    width: 0;
  }
  
  .input-container span {
    min-width: 70px;
  }
}
</style>
