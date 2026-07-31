<script setup>
import { ref, computed } from 'vue'
import { Search, ChevronDown, ChevronUp, RefreshCw } from 'lucide-vue-next'
import lexikoData from '@/data/lexiko.json'
import WordDefinition from '@/components/Hiztegia/WordDefinition.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

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
  <div class="page-shell">
    <PageHeader
      title="Sinonimoen zerrenda"
      description="Euskal hizkuntzaren ikasgaietan erabiltzen diren sinonimoen bilduma."
    />

  <div class="max-w-4xl mx-auto p-4">
    <!-- Barra de búsqueda -->
    <div class="relative mb-6">
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] size-5" />
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Bilatu hitza..."
        class="input pl-10 pr-4 py-2 text-lg text-left"
        :style="{ color: 'var(--text-primary)'}"
      />
      <button
      v-if="searchTerm"
      @click="searchTerm = ''"
      class="absolute right-2 top-1/2 -translate-y-1/2 btn-primary rounded-md p-2"
      aria-label="Garbitu bilaketa"
    >
    <RefreshCw class="size-5" />
    </button>
    </div>
    
    

    <!-- Lista de grupos de sinónimos -->
    <div class="space-y-3" :class="{ 'opacity-25': showingDefinition }">
      <div
        v-for="(group, index) in filteredGroups"
        :key="index"
        class="card overflow-hidden"
      >
        <!-- Versión móvil - expandible -->
        <div class="md:hidden">
          <button
        v-for="(word, wordIndex) in group.grupo"
        :key="wordIndex"
        @click="handleWordClick(word)"
        :class="{
          'bg-[var(--accent-primary)] text-white m-1 hover:bg-[var(--accent-primary-hover)]' : shouldHighlight(word),
          'bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-primary)] m-1 hover:bg-[var(--accent-primary-soft)]': !shouldHighlight(word),
          'focus:outline-none focus:ring-2': true,
        }"
        class="font-medium rounded-md px-3 py-1.5 transition-colors"
      >
        {{ word }}
      </button>
        </div>

        <!-- Versión escritorio - todo visible -->
        <div class="hidden md:block p-4">
          <div class="flex flex-wrap gap-1">
            <button
  v-for="(word, wordIndex) in group.grupo"
  :key="wordIndex"
  @click="handleWordClick(word)"
  :class="{
          'bg-[var(--accent-primary)] text-white m-1 hover:bg-[var(--accent-primary-hover)]' : shouldHighlight(word),
          'bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-primary)] m-1 hover:bg-[var(--accent-primary-soft)]': !shouldHighlight(word),
          'focus:outline-none focus:ring-2': true,
        }"
        class="font-medium rounded-md px-3 py-1.5 transition-colors"
      >
  {{ word }}
</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje cuando no hay resultados -->
    <EmptyState
      v-if="filteredGroups.length === 0"
      message="Ez da sinonimo talderik aurkitu"
    />

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
