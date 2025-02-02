# KeyboardInput.vue
<script setup>
import { computed } from 'vue'

const props = defineProps({
  letterStates: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['key'])

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫', 'ENTER']  // Movido ENTER al final
]

// Letras especiales del euskera
const specialLetters = ['TX', 'TZ', 'TS']

const getKeyClass = computed(() => (key) => {
  const baseClass = 'rounded-lg font-semibold text-sm sm:text-base transition-colors'
  const state = props.letterStates[key]
  
  if (key === 'ENTER') {
    return `${baseClass} bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-4 w-20 sm:w-24` // Tecla ENTER más ancha
  }
  if (key === '⌫') {
    return `${baseClass} bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-4`
  }
  
  switch (state) {
    case 'correct':
      return `${baseClass} bg-green-500 text-white`
    case 'present':
      return `${baseClass} bg-yellow-500 text-white`
    case 'absent':
      return `${baseClass} bg-gray-400 text-white`
    default:
      return `${baseClass} bg-gray-200 hover:bg-gray-300 text-gray-800`
  }
})

function handleKey(key) {
  emit('key', key)
}
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-sm shadow-lg">
    <div class="max-w-2xl mx-auto space-y-2">
      <!-- Botones de letras especiales -->
      <div class="flex justify-center gap-2 mb-2">
        <button
          v-for="letter in specialLetters"
          :key="letter"
          @click="handleKey(letter)"
          class="px-3 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-800 
                 font-semibold transition-colors"
        >
          {{ letter }}
        </button>
      </div>
      
      <!-- Teclado principal -->
      <div v-for="(row, index) in rows" 
           :key="index"
           class="flex justify-center gap-1"
      >
        <button
          v-for="key in row"
          :key="key"
          @click="handleKey(key)"
          :class="[
            'h-12 sm:h-14 flex items-center justify-center',
            getKeyClass(key),
            key === 'ENTER' ? 'flex-grow-0' : 'w-8 sm:w-10'
          ]"
        >
          {{ key }}
        </button>
      </div>
    </div>
  </div>
</template>