<script setup>
import { ref, computed } from 'vue'
import { Search, ChevronDown, ChevronUp, RefreshCw } from 'lucide-vue-next'
import lexikoData from '@/data/lexiko.json'
import WordDefinition from '@/components/Hiztegia/WordDefinition.vue'

const searchTerm = ref('')
const expandedGroups = ref(new Set())
const showingDefinition = ref(false)
const selectedWord = ref('')

// Normalizar palabras en los grupos
const normalizedGroups = lexikoData.map(group => ({
  ...group,
  grupo: group.grupo.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).sort((a, b) => a.localeCompare(b, 'eu'))
}))

// Filtrar grupos basado en la búsqueda
const filteredGroups = computed(() => 
  normalizedGroups.filter(group =>
    group.grupo.some(word =>
      word.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  )
)

function toggleGroup(index) {
  if (expandedGroups.value.has(index)) {
    expandedGroups.value.delete(index)
  } else {
    expandedGroups.value.add(index)
  }
}

// Calcular si una palabra coincide con la búsqueda para resaltarla
function shouldHighlight(word) {
  return searchTerm.value && 
    word.toLowerCase().includes(searchTerm.value.toLowerCase())
}

function handleWordClick(word) {
  selectedWord.value = word
  showingDefinition.value = true
}

function handleDefinitionChange(isOpen) {
  showingDefinition.value = isOpen
}
</script>

<template>
  <div class="min-h-screen">
    <div class="top-0 z-20 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl md:text-4xl font-bold text-[var(--text-primary)]">
            Sinonimoen Zerrenda
          </h1>
        </div>
      </div>
    </div>

  <div class="max-w-4xl mx-auto p-4">
    <!-- Barra de búsqueda -->
    <div class="relative mb-6">
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Bilatu hitza..."
        class="w-full text-gray-100 pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
      />
      <button
      v-if="searchTerm"
      @click="searchTerm = ''"
      class="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-1 rounded-lg hover:bg-indigo-700 transition-colors"
    >
    <RefreshCw class="size-5" />
    </button>
    </div>
    
    

    <!-- Lista de grupos de sinónimos -->
    <div class="space-y-3" :class="{ 'opacity-25': showingDefinition }">
      <div
        v-for="(group, index) in filteredGroups"
        :key="index"
        class="bg-[var(--bg-card)] backdrop-blur-lg rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <!-- Versión móvil - expandible -->
        <div class="md:hidden">
          <button
  v-for="(word, wordIndex) in group.grupo"
  :key="wordIndex"
  @click="handleWordClick(word)"
  :class="{
    'bg-indigo-600 text-white m-3 hover:bg-indigo-700': !shouldHighlight(word),
    'bg-amber-600 text-white m-3 hover:bg-amber-700': shouldHighlight(word)
  }"
  class="font-medium rounded-lg px-3 py-2 transition-colors"
>
  {{ word }}
</button>
        </div>

        <!-- Versión escritorio - todo visible -->
        <div class="hidden md:block p-4">
          <div class="flex flex-wrap gap-3">
            <button
  v-for="(word, wordIndex) in group.grupo"
  :key="wordIndex"
  @click="handleWordClick(word)"
  :class="{
    'bg-indigo-600 text-white hover:bg-indigo-700': !shouldHighlight(word),
    'bg-amber-600 text-white hover:bg-amber-700': shouldHighlight(word)
  }"
  class="font-medium rounded-lg px-3 py-2 transition-colors"
>
  {{ word }}
</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje cuando no hay resultados -->
    <div
      v-if="filteredGroups.length === 0"
      class="text-center py-8 text-gray-100"
    >
      Ez da sinonimo talderik aurkitu
    </div>

    <!-- Componente de definición -->
    <WordDefinition
      v-model:isOpen="showingDefinition"
      :word="selectedWord"
      @update:isOpen="handleDefinitionChange"
      class="z-50"
    />
  </div>
</div>
</template>