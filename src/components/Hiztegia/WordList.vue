<script setup>
import { ref, computed, watch } from 'vue'
import { Search } from 'lucide-vue-next'

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

const hoveredWord = ref(null)
</script>

<template>
    <div class="space-y-8 pb-16 md:pb-0"> <!-- Añadir padding bottom para móvil -->
      <!-- Mensaje cuando no hay resultados -->
      <div v-if="Object.keys(organizedWords).length === 0" 
           class="text-center py-12">
        <p class="text-gray-500 text-lg">
          Ez da hitzik aurkitu
        </p>
      </div>
  
      <!-- Lista de palabras organizadas por letra -->
      <div v-for="(words, letter) in organizedWords" 
           :key="letter" 
           class="space-y-4">
        <!-- Cabecera de sección -->
        <div :id="`letter-section-${letter}`"
             class="sticky top-0 bg-gradient-to-r from-rose-500 to-pink-500 z-10 py-2 px-4 rounded-lg shadow-sm">
             
          <h2 class="text-2xl font-bold text-white">{{ letter }}</h2>
          
        </div>
  
        <!-- Grid de palabras -->
        <div :id="'block-' + letter" class="letter-block">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            v-for="word in words"
            :key="word"
            @click="$emit('word-click', word)"
            @mouseenter="hoveredWord = word"
            @mouseleave="hoveredWord = null"
            class="text-center px-2 py-3 rounded-xl transition-all duration-200"
            :class="{
              'bg-indigo-50 shadow-md transform scale-105': hoveredWord === word,
              'bg-white/80 hover:bg-indigo-50': hoveredWord !== word,
              'focus:outline-none focus:ring-2': true,
              'bg-gradient-to-r': true,
              'from-[var(--gradient-from)]': true,
              'to-[var(--gradient-to)]': true,
              'hover:from-[var(--gradient-hover-from)]': true,
              'hover:to-[var(--gradient-hover-to)]': true,
              'focus:ring-[var(--gradient-from)]': true
            }"
          >
            <span class="text-lg text-white">{{ word }}</span>
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

button {
    color: #000;
}

@media (max-width: 768px) {
  .sticky {
    top: 0.5rem;
  }
}
</style>