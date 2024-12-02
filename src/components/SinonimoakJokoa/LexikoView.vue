<script setup>
import { ref, onMounted } from 'vue'
import GameArea from './LexikoGameArea.vue'
import GameOverlay from './LexikoGameOverlay.vue'
import lexikoData from '@/data/lexiko.json'
import LexikoWordList from './LexikoWordList.vue'
import WordDefinition from '@/components/Hiztegia/WordDefinition.vue'

// Estado inicial por defecto
const DEFAULT_GAME_STATE = {
  currentGroup: null,
  selectedWord: '',
  remainingGroups: [],
  answers: [],
  showOverlay: false,
  correctAnswers: [],
  incorrectAnswers: [],
  missingAnswers: [],
  showingDefinition: false
}

const gameState = ref({ ...DEFAULT_GAME_STATE })

// Función para normalizar una palabra
function normalizeWord(word) {
  if (!word) return ''
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

// Función para normalizar un grupo completo
function normalizeGroup(group) {
  return {
    ...group,
    grupo: group.grupo.map(word => normalizeWord(word))
  }
}

// Normalizar todos los datos al inicio
const normalizedLexikoData = lexikoData.map(group => normalizeGroup(group))

function initializeGameWithWord(word) {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  const group = normalizedLexikoData.find(g => 
    g.grupo.includes(normalizeWord(word))
  )
  
  if (group) {
    const newState = {
      ...DEFAULT_GAME_STATE,
      currentGroup: group,
      selectedWord: normalizeWord(word),
      answers: Array(group.grupo.length - 1).fill(''),
      remainingGroups: gameState.value.remainingGroups
    }
    gameState.value = newState
  }
}

function handleDefinitionChange(isOpen) {
  if (gameState.value) {
    gameState.value.showingDefinition = isOpen
  }
}

function initializeGame() {
  let updatedRemainingGroups = [...gameState.value.remainingGroups]
  
  // Reiniciar los grupos si están vacíos
  if (updatedRemainingGroups.length === 0) {
    updatedRemainingGroups = [...normalizedLexikoData]
  }

  const randomIndex = Math.floor(Math.random() * updatedRemainingGroups.length)
  const selectedGroup = updatedRemainingGroups[randomIndex]
  updatedRemainingGroups.splice(randomIndex, 1)

  const randomWordIndex = Math.floor(Math.random() * selectedGroup.grupo.length)
  const selectedWord = selectedGroup.grupo[randomWordIndex]

  // Crear nuevo estado completo
  const newState = {
    ...DEFAULT_GAME_STATE,
    currentGroup: selectedGroup,
    selectedWord: selectedWord,
    answers: Array(selectedGroup.grupo.length - 1).fill(''),
    remainingGroups: updatedRemainingGroups
  }
  
  gameState.value = newState
}

function updateAnswers(newAnswers) {
  if (gameState.value && Array.isArray(newAnswers)) {
    gameState.value.answers = [...newAnswers]
  }
}

function handleSubmit(answers) {
  if (!gameState.value?.currentGroup) return
  
  const currentGroup = gameState.value.currentGroup
  const synonyms = currentGroup.grupo.filter(word => word !== gameState.value.selectedWord)
  
  const correctAnswers = []
  const incorrectAnswers = []
  const missingAnswers = [...synonyms]

  if (Array.isArray(answers)) {
    answers.forEach(answer => {
      if (answer?.trim?.() === '') return
      
      const normalizedAnswer = normalizeWord(answer)
      if (synonyms.includes(normalizedAnswer)) {
        correctAnswers.push(normalizedAnswer)
        const index = missingAnswers.indexOf(normalizedAnswer)
        if (index > -1) {
          missingAnswers.splice(index, 1)
        }
      } else {
        incorrectAnswers.push(normalizedAnswer)
      }
    })
  }

  gameState.value = {
    ...gameState.value,
    showOverlay: true,
    correctAnswers,
    incorrectAnswers,
    missingAnswers,
  }
}

function handleNextGame() {
  initializeGame()
}

function handleOverlayClose() {
  // Asegurarnos de que el estado está limpio antes de iniciar el siguiente juego
  gameState.value = { ...DEFAULT_GAME_STATE, remainingGroups: gameState.value.remainingGroups }
  handleNextGame()
}

onMounted(() => {
  gameState.value = { ...DEFAULT_GAME_STATE, remainingGroups: [...normalizedLexikoData] }
  initializeGame()
})
</script>

<template>
  <div class="min-h-screen relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative">
        <GameArea
          v-if="gameState.currentGroup"
          :selected-word="gameState.selectedWord"
          :answer-count="gameState.currentGroup.grupo.length - 1"
          v-model:answers="gameState.answers"
          @submit="handleSubmit"
          @next="handleNextGame"
          @definition-change="handleDefinitionChange"
        />

        <GameOverlay
          v-if="gameState.showOverlay"
          :correct-answers="gameState.correctAnswers"
          :incorrect-answers="gameState.incorrectAnswers"
          :missing-answers="gameState.missingAnswers"
          @next="handleNextGame"
          @close="handleOverlayClose"
        />

        <LexikoWordList
          :words="normalizedLexikoData"
          @select-word="initializeGameWithWord"
          :class="{ 'opacity-25': gameState.showingDefinition }"
        />
      </div>
    </div>

    <WordDefinition
      v-model:isOpen="gameState.showingDefinition"
      :word="gameState.selectedWord"
      @update:isOpen="handleDefinitionChange"
      class="z-50"
    />
  </div>
</template>