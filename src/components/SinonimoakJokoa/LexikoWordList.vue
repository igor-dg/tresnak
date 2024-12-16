<!-- LexikoWordList.vue -->
<script setup>
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'

const props = defineProps({
  words: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['selectWord'])
const searchTerm = ref('')

// Ordenar todas las palabras alfabéticamente y eliminar duplicados
const allWords = computed(() => {
  const wordSet = new Set(props.words.flatMap(group => group.grupo))
  return [...wordSet].sort((a, b) => 
    a.localeCompare(b, 'eu', { sensitivity: 'base' })
  )
})

// Filtrar palabras basado en el término de búsqueda
const filteredWords = computed(() => 
  allWords.value.filter(word =>
    word.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)
</script>

<template>
  <div class="mt-8 bg-[var(--bg-card)] backdrop-blur-lg rounded-3xl p-6 shadow-lg">
    <h2 class="text-xl font-medium text-[var(--text-primary)] mb-4">Hitz guztiak</h2>
    
    <!-- Barra de búsqueda -->
    <div class="relative mb-4"
    :class="{
        'ring-2 ring-amber-400 shadow-lg': isInputFocused,
        'shadow': !isInputFocused
      }"
      >
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 size-5" />
      <input
        type="text"
        placeholder="Bilatu hitza..."
        v-model="searchTerm"
        class="w-full pl-10 pr-4 py-2 bg-white/40 rounded-xl px-6 text-lg text-left focus:outline-none focus:ring-2 focus:ring-amber-300 outline-none transition-all"
        :style="{ color: 'var(--text-primary)'}"
      />
    </div>

    <!-- Lista de palabras -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      <button
        v-for="word in filteredWords"
        :key="word"
        @click="$emit('selectWord', word)"
        class="text-center px-1 py-2 rounded-xl transition-all duration-200"
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
        {{ word }}
      </button>
    </div>
  </div>
</template>
<style scoped>
input::placeholder {
  color: var(--text-secondary);
}
</style>