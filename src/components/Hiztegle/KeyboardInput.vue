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
  const baseClass = 'rounded-md font-semibold text-xs sm:text-sm transition-colors border'
  const state = props.letterStates[key]
  
  if (key === 'ENTER') {
    return `${baseClass} bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] border-[var(--accent-primary)] text-white px-3 sm:px-5`
  }
  if (key === '⌫') {
    return `${baseClass} bg-[var(--bg-soft)] hover:bg-[var(--accent-primary-soft)] border-[var(--border-strong)] text-[var(--text-primary)] px-3`
  }
  
  switch (state) {
    case 'correct':
      return `${baseClass} state-correct`
    case 'present':
      return `${baseClass} state-present`
    case 'absent':
      return `${baseClass} state-absent`
    default:
      return `${baseClass} bg-[var(--bg-card)] hover:bg-[var(--accent-primary-soft)] border-[var(--border-strong)] text-[var(--text-primary)]`
  }
})

function handleKey(key) {
  emit('key', key)
}
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-40 px-2 sm:px-4 pt-3 safe-area-bottom bg-[var(--bg-card)] border-t border-[var(--border-card)] shadow-sm">
    <div class="max-w-2xl mx-auto space-y-2">
      <!-- Botones de letras especiales -->
      <div class="flex justify-center gap-2 mb-2">
        <button
          v-for="letter in specialLetters"
          :key="letter"
          @click="handleKey(letter)"
          class="px-3 py-2 rounded-md bg-[var(--bg-soft)] hover:bg-[var(--accent-primary-soft)] border border-[var(--border-card)] text-[var(--text-primary)] font-semibold transition-colors"
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
            'h-11 sm:h-12 flex items-center justify-center',
            getKeyClass(key),
            key === 'ENTER' ? 'w-[4.5rem] sm:w-24' : 'min-w-0 flex-1 max-w-10'
          ]"
        >
          {{ key }}
        </button>
      </div>
    </div>
  </div>
</template>
