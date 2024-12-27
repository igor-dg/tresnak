<script setup>
import { ref, onMounted, computed } from 'vue'
import AlphabetNav from '@/components/Hiztegia/AlphabetNav.vue'
import WordList from '@/components/Hiztegia/WordList.vue'
import WordDefinition from '@/components/Hiztegia/WordDefinition.vue'
import SearchBar from '@/components/Hiztegia/SearchBar.vue'
import hiztegiaData from '@/data/hiztegia.json'

const selectedWord = ref('')
const isDefinitionOpen = ref(false)
const searchTerm = ref('')
const words = ref(hiztegiaData)
const activeScrollLetter = ref('')


const availableLetters = computed(() => {
  if (!words.value.length) return []
  return [...new Set(words.value.map(word => word[0].toUpperCase()))]
})

const filteredWords = computed(() => {
  if (!searchTerm.value) return words.value
  return words.value.filter(word => 
    word.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const handleSearch = (term) => {
  searchTerm.value = term
}

const handleClear = () => {
  searchTerm.value = ''
}

const scrollToLetter = (letter) => {
  activeScrollLetter.value = letter
}

const handleWordClick = (word) => {
  showDefinition(word)
}

const showDefinition = (word) => {
  selectedWord.value = word
  isDefinitionOpen.value = true
}
</script>

<template>
  <div class="min-h-screen max-w-[1280px] mx-auto py-12 px-4 sm:px-6 xl:px-12">
    <!-- Header -->
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-white mb-6">
            C1-eko hiztegia
          </h1>
          <p class="text-lg text-[var(--text-secondary)]">
            Euskal hizkuntzaren ikasgaietan erabiltzen diren terminoen bilduma. 
          </p>
        </header>

    <!-- Contenido principal -->
    <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row gap-8 relative">
        <!-- Panel de navegación alfabética - Fixed en desktop -->
        <aside class="hidden md:block md:w-60 sticky" style="top: 0; height: fit-content;">
          <AlphabetNav
            :available-letters="availableLetters"
            @letter-click="scrollToLetter"
          />
        </aside>

        <!-- Panel principal -->
        <main class="flex-1">
          <div class="w-full max-w-3xl mx-auto bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-lg space-y-8 md:mb-8">
            <SearchBar
              v-model="searchTerm"
              @search="handleSearch"
              @clear="handleClear"
            >
              <template #results-count>
                {{ filteredWords.length }} emaitza aurkitu dira
              </template>
            </SearchBar>
            
            <WordList
              :words="words"
              :search-term="searchTerm"
              :active-scroll-letter="activeScrollLetter"
              @word-click="showDefinition"
            />
          </div>
        </main>

        <!-- Panel de navegación alfabética - Móvil -->
        <div class="md:hidden">
          <AlphabetNav
            :available-letters="availableLetters"
            @letter-click="scrollToLetter"
          />
        </div>
      </div>

      <!-- Modal de definición -->
      <WordDefinition
        v-model:isOpen="isDefinitionOpen"
        :word="selectedWord"
      />
    </div>
  </div>
</template>