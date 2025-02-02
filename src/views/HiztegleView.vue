# HiztegleView.vue
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import HiztegleDefinition from '@/components/Hiztegle/HiztegleDefinition.vue'
import KeyboardInput from '@/components/Hiztegle/KeyboardInput.vue'
import { RefreshCw, Languages, BookOpen } from 'lucide-vue-next'
import hiztegiaData from '@/data/hiztegia.json'

const gameState = ref('initial')
const currentWord = ref('')
const timeLeft = ref(5)
const attempts = ref([])
const currentAttempt = ref('')
const letterStates = ref({})
const statusMessages = ref('')
const isGameOver = ref(false)
const showDefinition = ref(false)
const definitionTimeLeft = ref(5) // New ref for modal timer
const hints = ref(new Set())
const showTranslation = ref(false)
const translationTimeLeft = ref(5)
const activeContent = ref('definition') // 'definition' or 'translation'
let translationTimer = null
let timer = null
let definitionTimer = null // New timer for modal

// Gestión de palabras usadas
const USED_WORDS_KEY = 'hiztegle_used_words'
const MAX_WORDS_HISTORY = 50

function getUsedWords() {
  const storedWords = localStorage.getItem(USED_WORDS_KEY)
  return storedWords ? JSON.parse(storedWords) : []
}

function addToUsedWords(word) {
  let usedWords = getUsedWords()
  usedWords.push({
    word: word,
    date: new Date().toISOString()
  })
  
  if (usedWords.length > MAX_WORDS_HISTORY) {
    usedWords = usedWords.slice(-MAX_WORDS_HISTORY)
  }
  
  localStorage.setItem(USED_WORDS_KEY, JSON.stringify(usedWords))
}

function selectRandomWord() {
  const usedWords = getUsedWords()
  const recentWords = new Set(usedWords.map(entry => entry.word))
  const availableWords = hiztegiaData.filter(word => !recentWords.has(word))
  
  if (availableWords.length === 0) {
    localStorage.removeItem(USED_WORDS_KEY)
    currentWord.value = hiztegiaData[Math.floor(Math.random() * hiztegiaData.length)]
  } else {
    currentWord.value = availableWords[Math.floor(Math.random() * availableWords.length)]
  }
  
  addToUsedWords(currentWord.value)
}

function startGame() {
  selectRandomWord()
  gameState.value = 'definition'
  timeLeft.value = 5
  attempts.value = []
  currentAttempt.value = ''
  letterStates.value = {}
  statusMessages.value = ''
  isGameOver.value = false
  showDefinition.value = false
  hints.value = new Set()
  definitionTimeLeft.value = 5 // Reset definition timer
  startTimer()
}

function startDefinitionTimer() {
  if (definitionTimer) clearInterval(definitionTimer)
  
  definitionTimeLeft.value = 5
  definitionTimer = setInterval(() => {
    if (definitionTimeLeft.value > 0) {
      definitionTimeLeft.value--
    } else {
      clearInterval(definitionTimer)
      showDefinition.value = false
    }
  }, 1000)
}

function toggleDefinition() {
  if (showDefinition.value && activeContent.value === 'definition') {
    showDefinition.value = false
  } else {
    showDefinition.value = true
    activeContent.value = 'definition'
    startDefinitionTimer()
  }
}

function toggleTranslation() {
  if (showDefinition.value && activeContent.value === 'translation') {
    showDefinition.value = false
  } else {
    showDefinition.value = true
    activeContent.value = 'translation'
    startDefinitionTimer()
  }
}

// Add watch to clean up definition timer when modal is closed
watch(showDefinition, (newValue) => {
  if (!newValue) {
    if (definitionTimer) {
      clearInterval(definitionTimer)
    }
  }
})

function startTimer() {
  if (timer) clearInterval(timer)
  
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer)
      if (gameState.value === 'definition') {
        gameState.value = 'game'
      }
    }
  }, 1000)
}

function skipWord() {
  statusMessages.value = `Hitza ${currentWord.value} zen.`
  setTimeout(() => {
    startGame()
  }, 2000)
}

const isCheckingWord = ref(false)

async function checkWordExists(word) {
  try {
    const response = await fetch(`https://idg.eus/tresnak/itzultzaile.php?hitza=${encodeURIComponent(word)}`)
    if (!response.ok) return false
    const data = await response.text()
    return data && data.trim().length > 0
  } catch (error) {
    console.error('Error checking word:', error)
    return false
  }
}

async function handleAttempt() {
  if (!currentAttempt.value || currentAttempt.value.length !== currentWord.value.length) {
    statusMessages.value = 'Hitza osatu behar duzu!'
    return
  }

  const attempt = currentAttempt.value.toUpperCase()
  
  if (isCheckingWord.value) return
  
  isCheckingWord.value = true
  statusMessages.value = 'Hitza egiaztatzen...'
  
  try {
    const exists = await checkWordExists(attempt)
    
    if (!exists) {
      statusMessages.value = 'Hitz hori ez da existitzen!'
      return
    }
    
    statusMessages.value = ''
    
    const letterFrequency = {}
    currentWord.value.split('').forEach(letter => {
      letterFrequency[letter] = (letterFrequency[letter] || 0) + 1
    })

    const result = attempt.split('').map((letter, index) => {
      if (letter === currentWord.value[index]) {
        letterFrequency[letter]--
        return {
          letter,
          status: 'correct'
        }
      }
      return { letter, status: null }
    })

    result.forEach((res, index) => {
      if (res.status === null) {
        if (letterFrequency[res.letter] > 0) {
          res.status = 'present'
          letterFrequency[res.letter]--
        } else {
          res.status = 'absent'
        }
      }
    })

    result.forEach(({letter, status}) => {
      const currentStatus = letterStates.value[letter]
      if (
        !currentStatus || 
        (currentStatus === 'absent' && status !== 'absent') ||
        (currentStatus === 'present' && status === 'correct')
      ) {
        letterStates.value[letter] = status
      }
    })

    attempts.value.push(result)
    currentAttempt.value = ''

    if (attempt === currentWord.value) {
      gameState.value = 'complete'
      isGameOver.value = true
      statusMessages.value = '🎉 Zorionak! Asmatu duzu!'
    } else if (attempts.value.length >= 6) {
      gameState.value = 'complete'
      isGameOver.value = true
      statusMessages.value = `Game Over! Hitza ${currentWord.value} zen.`
    }
  } finally {
    isCheckingWord.value = false
  }
}

function handleKeyPress(key) {
  if (gameState.value !== 'game' || isGameOver.value) return
  
  if (key === '⌫') {
    currentAttempt.value = currentAttempt.value.slice(0, -1)
    statusMessages.value = ''
  } else if (key === 'ENTER') {
    handleAttempt()
  } else if (currentAttempt.value.length < currentWord.value.length) {
    currentAttempt.value += key
  }
}

function revealHint() {
  // Encontrar posiciones correctas actuales basadas en los intentos
  const correctPositions = new Set()
  attempts.value.forEach(attempt => {
    attempt.forEach((letter, index) => {
      if (letter.status === 'correct') {
        correctPositions.add(index)
      }
    })
  })
  
  // Encontrar posiciones disponibles (no reveladas ni ya correctas)
  const availablePositions = []
  for (let i = 0; i < currentWord.value.length; i++) {
    if (!hints.value.has(i) && !correctPositions.has(i)) {
      availablePositions.push(i)
    }
  }
  
  // Si hay posiciones disponibles, revelar una aleatoria
  if (availablePositions.length > 0) {
    const randomIndex = availablePositions[Math.floor(Math.random() * availablePositions.length)]
    hints.value.add(randomIndex)
  }
}

onMounted(() => {
  gameState.value = 'initial'
  const usedWords = getUsedWords()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const filteredWords = usedWords.filter(entry => {
    const entryDate = new Date(entry.date)
    return entryDate > sevenDaysAgo
  })
  
  localStorage.setItem(USED_WORDS_KEY, JSON.stringify(filteredWords))
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (definitionTimer) clearInterval(definitionTimer)
})
</script>

<template>
  <div class="min-h-screen mx-auto py-12 px-4 sm:px-6 xl:px-12">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-white mb-6">
        Hiztegle
      </h1>
      <p class="text-lg text-orange-100">
        Ikusi definizioa eta asmatu hitza!
      </p>
    </header>

    <div class="max-w-2xl mx-auto mb-24">
      <!-- Estado inicial -->
      <div v-if="gameState === 'initial'" class="text-center">
        <button
          @click="startGame"
          class="bg-white text-orange-500 rounded-full py-4 px-8 text-xl font-semibold
                 hover:bg-orange-100 transition-all duration-300 shadow-lg"
        >
          Hasi jolasten
        </button>
      </div>

      <!-- Fase de definición inicial -->
      <div v-else-if="gameState === 'definition'" 
     class="bg-orange-100/30 backdrop-blur-md text-black rounded-3xl p-8 shadow-lg">
  <HiztegleDefinition 
    :word="currentWord"
    :time-left="timeLeft"
    content-type="definition"
  />
</div>

      <!-- Fase de juego -->
      <div v-else-if="gameState === 'game' || gameState === 'complete'" 
           class="space-y-8">
        
        <!-- Definición flotante -->
        <Transition name="fade">
    <div v-if="showDefinition && gameState === 'game'"
         class="fixed inset-x-4 top-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-50">
      <div class="bg-orange-100/95 text-black backdrop-blur-sm rounded-3xl p-6 shadow-lg">
        <HiztegleDefinition 
          :word="currentWord"
          :hide-timer="false"
          :time-left="definitionTimeLeft"
          :content-type="activeContent"
        />
      </div>
    </div>
  </Transition>

        <!-- Botones de acción -->
        <div class="flex justify-center gap-4">
          <button
      v-if="gameState === 'game'"
      @click="toggleDefinition"
      class="bg-orange-100 text-orange-800 rounded-full p-3 hover:bg-orange-200 transition-colors shadow-md"
      :title="showDefinition && activeContent === 'definition' ? 'Ezkutatu definizioa' : 'Ikusi definizioa'"
    >
      <BookOpen class="w-5 h-5" />
    </button>
    
    <button
      v-if="gameState === 'game'"
      @click="toggleTranslation"
      class="bg-orange-100 text-orange-800 rounded-full p-3 hover:bg-orange-200 transition-colors shadow-md flex items-center gap-1"
      :title="showDefinition && activeContent === 'translation' ? 'Ezkutatu itzulpena' : 'Ikusi itzulpena'"
    >
      <Languages class="w-5 h-5" />
      <span class="text-sm font-medium">eus>es</span>
    </button>
          
          <button
            v-if="gameState === 'game'"
            @click="skipWord"
            class="bg-orange-100 text-orange-800 rounded-full p-3 hover:bg-orange-200 transition-colors shadow-md"
            title="Aldatu hitza"
          >
            <RefreshCw class="w-5 h-5" />
          </button>

          <button
    v-if="gameState === 'game'"
    @click="revealHint"
    class="bg-blue-100 text-blue-800 rounded-full p-3 hover:bg-blue-200 transition-colors shadow-md"
    title="Erakutsi letra bat"
  >
    <!-- Puedes usar un icono de bombilla o similar -->
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
    </svg>
  </button>
        </div>

        <!-- Grid de intentos -->
        <div class="grid gap-2 mb-16" 
     :class="{
       'max-w-[280px] mx-auto': currentWord.length <= 6,
       'w-full': currentWord.length > 6
     }">
  <!-- Intentos realizados -->
  <div v-for="(attempt, index) in attempts" 
       :key="index"
       class="grid gap-2"
       :style="{ gridTemplateColumns: `repeat(${currentWord.length}, minmax(0, 1fr))` }"
  >
    <div v-for="(letter, letterIndex) in attempt" 
         :key="letterIndex"
         class="w-full aspect-square flex items-center justify-center rounded-xl text-white font-bold text-2xl
                transition-all duration-300 border-2"
         :class="{
           'bg-green-500 border-green-600': letter.status === 'correct',
           'bg-yellow-500 border-yellow-600': letter.status === 'present',
           'bg-gray-400 border-gray-500': letter.status === 'absent'
         }"
    >
      {{ letter.letter }}
    </div>
  </div>

  <!-- Intento actual -->
  <div v-if="gameState === 'game'"
       class="grid gap-2"
       :style="{ gridTemplateColumns: `repeat(${currentWord.length}, minmax(0, 1fr))` }"
  >
    <div v-for="i in currentWord.length" 
         :key="i"
         class="w-full aspect-square flex items-center justify-center rounded-xl 
                bg-white/20 border-2 border-white/30 text-white font-bold text-2xl"
    >
      {{ currentAttempt[i - 1] || '' }}
    </div>
  </div>

  <!-- Espacios vacíos restantes -->
  <div v-for="row in (6 - attempts.length - (gameState === 'game' ? 1 : 0))" 
       :key="`empty-${row}`"
       class="grid gap-2"
       :style="{ gridTemplateColumns: `repeat(${currentWord.length}, minmax(0, 1fr))` }"
  >
  <div v-for="col in currentWord.length" 
         :key="`empty-${row}-${col}`"
         class="w-full aspect-square flex items-center justify-center rounded-xl border-2"
         :class="[
           hints.has(col - 1) 
             ? 'bg-blue-400/20 border-blue-400/40 text-blue-200' 
             : 'bg-white/10 border-white/20'
         ]"
    >
      {{ hints.has(col - 1) ? currentWord[col - 1] : '' }}
    </div>
  </div>
</div>

        <!-- Mensaje de estado -->
        <p v-if="statusMessages" 
           class="text-center text-xl font-semibold"
           :class="{
             'text-green-400': statusMessages.includes('Zorionak'),
             'text-red-400': statusMessages.includes('Game Over'),
             'text-white': !statusMessages.includes('Zorionak') && !statusMessages.includes('Game Over')
           }"
        >
          {{ statusMessages }}
        </p>

        <!-- Botón de reinicio cuando el juego está completo -->
        <div v-if="gameState === 'complete'" class="text-center">
          <button
            @click="startGame"
            class="bg-white text-orange-500 rounded-full py-3 px-6 text-lg font-semibold
                   hover:bg-orange-100 transition-all duration-300 shadow-lg"
          >
            Berriro jolastu
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="isCheckingWord" 
         class="fixed bottom-24 left-1/2 transform -translate-x-1/2 
                bg-white/90 text-orange-600 px-4 py-2 rounded-full shadow-lg">
      Hitza egiaztatzen...
    </div>

    <!-- Teclado virtual -->
    <KeyboardInput 
      v-if="gameState === 'game'"
      :letter-states="letterStates"
      @key="handleKeyPress"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.definition-content :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0;
}

.definition-content :deep(li) {
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgb(254 215 170); /* orange-200 */
  color: rgb(51, 51, 51); /* Un gris oscuro casi negro */
}

.definition-content :deep(p) {
  color: rgb(51, 51, 51);
}

.definition-content :deep(.azpisarrera) {
  color: rgb(234 88 12); /* orange-600 */
  font-weight: 500;
}

.definition-content :deep(.adibidea) {
  color: rgb(120 113 108); /* stone-500 */
  font-style: italic;
  margin-top: 0.5rem;
}

.definition-content :deep(a) {
  color: rgb(234 88 12); /* orange-600 */
  text-decoration: underline;
}

/* Para cualquier otro texto que pueda estar sin estilo específico */
.definition-content :deep(*) {
  color: rgb(51, 51, 51);
}
</style>