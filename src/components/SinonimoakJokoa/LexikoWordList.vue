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
  <div class="mt-8 card p-6">
    <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-4">Hitz guztiak</h2>
    
    <!-- Barra de búsqueda -->
    <div class="relative mb-4">
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] size-5" />
      <input
        type="text"
        placeholder="Bilatu hitza..."
        v-model="searchTerm"
        class="input pl-10 pr-4 py-2 text-lg text-left"
      />
    </div>

    <!-- Lista de palabras -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      <button
        v-for="word in filteredWords"
        :key="word"
        @click="$emit('selectWord', word)"
        class="text-center px-1 py-2 rounded-md transition-all duration-200 bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-primary)] hover:bg-[var(--accent-primary-soft)] hover:border-[var(--accent-primary)]"
      >
        {{ word }}
      </button>
    </div>
  </div>
</template>
