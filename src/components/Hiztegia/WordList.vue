<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  words: {
    type: Array,
    required: true
  },
  searchTerm: {
    type: String,
    default: ''
  },
  activeScrollLetter: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['word-click'])

// Computed para filtrar y organizar palabras
const organizedWords = computed(() => {
  return props.words.reduce((acc, word) => {
    if (props.searchTerm && !word.toLowerCase().includes(props.searchTerm.toLowerCase())) {
      return acc
    }
    
    const firstLetter = word[0].toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(word)
    return acc
  }, {})
})

// Watch para manejar el scroll cuando cambia la letra activa
watch(() => props.activeScrollLetter, (letter) => {
  if (letter) {
    scrollToLetter(letter)
  }
})

const scrollToLetter = (letter) => {
  const element = document.getElementById(`block-${letter}`);
  if (element) {
    const topPosition = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: topPosition - 80,
      behavior: 'smooth'
    });
  }
};

</script>

<template>
    <div class="space-y-8 pb-16 md:pb-0"> <!-- Añadir padding bottom para móvil -->
      <!-- Mensaje cuando no hay resultados -->
      <div v-if="Object.keys(organizedWords).length === 0" 
           class="text-center py-12">
        <p class="text-[var(--text-muted)] text-lg">
          Ez da hitzik aurkitu
        </p>
      </div>
  
      <!-- Lista de palabras organizadas por letra -->
      <div v-for="(words, letter) in organizedWords" 
           :key="letter" 
           class="space-y-4">
        <!-- Cabecera de sección -->
        <div :id="`letter-section-${letter}`"
             class="sticky top-0 bg-[var(--accent-primary)] z-10 py-2 px-4 rounded-md shadow-sm">
             
          <h2 class="text-2xl font-bold text-white">{{ letter }}</h2>
          
        </div>
  
        <!-- Grid de palabras -->
        <div :id="'block-' + letter" class="letter-block">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            v-for="word in words"
            :key="word"
            @click="$emit('word-click', word)"
            class="text-center px-2 py-3 rounded-md transition-all duration-200 border bg-[var(--bg-card)] border-[var(--border-card)] hover:bg-[var(--bg-page)] hover:border-[var(--border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
          >
            <span class="text-lg text-[var(--text-primary)]">{{ word }}</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.sticky {
  position: sticky;
  top: 1rem;
}

@media (max-width: 768px) {
  .sticky {
    top: 0.5rem;
  }
}
</style>
