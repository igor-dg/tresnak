<script setup>
import { ref } from 'vue'
import GameAreaClassic from './GameAreaClassic.vue'
import GameAreaAllTimes from './GameAreaAllTimes.vue'

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
  },
  initialActiveTab: {
    type: String,
    default: 'allTimes'
  }
})

function onValidateAnswer(data) {
  return emit('validate-answer', data)
}

const activeTab = ref(props.initialActiveTab)

const emit = defineEmits(['answer-submitted', 'restart-game', 'validate-answer'])
</script>

<template>
  <div class="w-full max-w-md mx-auto bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-lg space-y-8">
    <!-- Tab Navigation -->
    <div class="flex space-x-2">
      <!-- Botón 1 -->
      <button
  @click="activeTab = 'allTimes'"
  :class="{
    'flex-1 py-2 px-4 rounded-full transition-all duration-300 bg-transparent': true,
    'bg-gradient-to-r from-amber-500 to-orange-500 text-white focus:outline-none': activeTab === 'allTimes',
    'text-amber-700 bg-transparent border-2 border-amber-500 border-solid hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white focus:outline-none': activeTab !== 'allTimes'
  }"
>
  Denbora guztiak
</button>

<!-- Botón 2 -->
<button
  @click="activeTab = 'classic'"
  :class="{
    'flex-1 py-2 px-4 rounded-full transition-all duration-300 bg-transparent': true,
    'bg-gradient-to-r from-amber-500 to-orange-500 text-white focus:outline-none': activeTab === 'classic',
    'text-amber-700 bg-transparent border-2 border-amber-500 border-solid hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white focus:outline-none': activeTab !== 'classic'
  }"
>
  Aleatorioa
</button>
    </div>

    <!-- Game Components -->
    <GameAreaClassic
      v-if="activeTab === 'classic'"
      :game-state="gameState"
      :sistemas="sistemas"
      @answer-submitted="$emit('answer-submitted', $event)"
      @restart-game="$emit('restart-game')"
    />
    
    <GameAreaAllTimes
  v-else
  :game-state="gameState"
  :sistemas="sistemas"
  :tiempos="tiempos"
  @validate-answer="(data) => $emit('validate-answer', data)"
  @restart-game="$emit('restart-game')"
/>
  </div>
</template>