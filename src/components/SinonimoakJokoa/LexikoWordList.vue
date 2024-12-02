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
    <h2 class="text-xl font-medium text-gray-800 mb-4">Hitz guztiak</h2>
    
    <!-- Barra de búsqueda -->
    <div class="relative mb-4">
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
      <input
        type="text"
        placeholder="Bilatu hitza..."
        v-model="searchTerm"
        class="w-full pl-10 pr-4 py-2 border-2 text-gray-100 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
      />
    </div>

    <!-- Lista de palabras -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      <button
        v-for="word in filteredWords"
        :key="word"
        @click="$emit('selectWord', word)"
        class="text-left px-3 py-2 text-sm rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
      >
        {{ word }}
      </button>
    </div>
  </div>
</template>