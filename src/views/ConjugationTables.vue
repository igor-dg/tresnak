<!-- ConjugationTables.vue -->
<template>
    <div class="container-fluid max-w-full overflow-x-hidden mx-auto py-12 px-4 sm:px-6 xl:px-12">
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-6">
          Aditz laguntzaileak
        </h1>
        <p class="text-xl text-[var(--text-secondary)] mb-8">
          Euskal aditz laguntzaileen taula osoak, sistema eta denbora guztiekin
        </p>
      </header>
  
      <!-- Filtros -->
      <div class="flex flex-wrap gap-4 mb-8 justify-center px-2">
        <!-- Filtro de Sistema -->
        <div class="w-full md:w-auto max-w-[95vw]">
            <div class="relative">
            <select 
              v-model="selectedSystem"
              class="transition-all focus:outline-none focus:ring-2 rounded-full p-2 pr-8 w-full bg-gradient-to-r appearance-none from-[var(--gradient-from)] to-[var(--gradient-to)] hover:from-[var(--gradient-hover-from)] hover:to-[var(--gradient-hover-to)] focus:ring-[var(--gradient-from)]"
            >
              <option value="">Sistema guztiak</option>
              <option v-for="(system, key) in SYSTEMS" :key="key" :value="key">
                {{ system.name }}
              </option>
            </select>
            <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
          </div>
        </div>
  
        <!-- Filtro de Tiempo -->
        <div class="w-full md:w-auto">
          <div class="relative">
            <select 
              v-model="selectedTiempo"
              class="transition-all focus:outline-none focus:ring-2 rounded-full p-2 pr-8 w-full bg-gradient-to-r appearance-none from-[var(--gradient-from)] to-[var(--gradient-to)] hover:from-[var(--gradient-hover-from)] hover:to-[var(--gradient-hover-to)] focus:ring-[var(--gradient-from)]"
            >
              <option value="">Denbora guztiak</option>
              <option value="orain">Orainaldia</option>
              <option value="lehen">Lehenaldia</option>
                <option value="bal_hip">Baldintza Hipotetikoa</option>
                <option value="ond_or">Ondorioa Orainaldian</option>
                <option value="ond_leh">Ondorioa Lehenaldian</option>
                <option value="ahal_or">Ahalera Orainaldian</option>
                <option value="ahal_leh">Ahalera Lehenaldian</option>
                <option value="ahal_hip">Ahalera Hipotetikoa</option>
                <option value="subj_or">Subjuntiboa Orainaldian</option>
                <option value="subj_leh">Subjuntiboa Lehenaldian</option>
                <option value="agintera">Agintera</option>
            </select>
            <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </div>
  
      <!-- Matriz de tablas -->
      <div class="space-y-12">
        <!-- Fila de Orainaldia -->
        <div v-if="!selectedTiempo || selectedTiempo === 'orain'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Orainaldia</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="orain" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="orain" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="orain" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="orain" />
            </div>
          </div>
        </div>
  
        <!-- Fila de Lehenaldia -->
        <div v-if="!selectedTiempo || selectedTiempo === 'lehen'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Lehenaldia</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="lehen" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="lehen" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="lehen" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="lehen" />
            </div>
          </div>
        </div>
        <!-- Fila de Baldintza Hipotetikoa -->
        <div v-if="!selectedTiempo || selectedTiempo === 'bal_hip'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Baldintza Hipotetikoa</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="bal_hip" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="bal_hip" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="bal_hip" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="bal_hip" />
            </div>
          </div>
        </div>
        <!-- Fila de Ondorioa Orainaldian -->
        <div v-if="!selectedTiempo || selectedTiempo === 'ond_or'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Ondorioa Orainaldian</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="ond_or" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="ond_or" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="ond_or" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="ond_or" />
            </div>
          </div>
        </div>
        <!-- Fila de Ondorioa Lehenaldian -->
        <div v-if="!selectedTiempo || selectedTiempo === 'ond_leh'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Ondorioa Lehenaldian</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="ond_leh" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="ond_leh" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="ond_leh" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="ond_leh" />
            </div>
          </div>
        </div>
        <!-- Fila de Ahalera Orainaldian -->
        <div v-if="!selectedTiempo || selectedTiempo === 'ahal_or'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Ahalera Orainaldian</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="ahal_or" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="ahal_or" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="ahal_or" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="ahal_or" />
            </div>
          </div>
        </div>
        <!-- Fila de Ahalera Lehenaldian -->
        <div v-if="!selectedTiempo || selectedTiempo === 'ahal_leh'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Ahalera Lehenaldian</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="ahal_leh" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="ahal_leh" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="ahal_leh" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="ahal_leh" />
            </div>
          </div>
        </div>
        <!-- Fila de Ahalera Hipotetikoa -->
        <div v-if="!selectedTiempo || selectedTiempo === 'ahal_hip'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Ahalera Hipotetikoa</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="ahal_hip" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="ahal_hip" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="ahal_hip" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="ahal_hip" />
            </div>
          </div>
        </div>
        <!-- Fila de Subjuntiboa Orainaldian -->
        <div v-if="!selectedTiempo || selectedTiempo === 'subj_or'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Subjuntiboa Orainaldian</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="subj_or" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="subj_or" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="subj_or" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="subj_or" />
            </div>
          </div>
        </div>
        <!-- Fila de Subjuntiboa Lehenaldian -->
        <div v-if="!selectedTiempo || selectedTiempo === 'subj_leh'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Subjuntiboa Lehenaldian</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="subj_leh" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="subj_leh" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="subj_leh" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="subj_leh" />
            </div>
          </div>
        </div>
        <!-- Fila de Agintera -->
        <div v-if="!selectedTiempo || selectedTiempo === 'agintera'" class="space-y-4">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">Agintera</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <!-- NOR -->
            <div v-if="!selectedSystem || selectedSystem === 'nor'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR</h3>
              <NorConjugationTable tiempo="agintera" />
            </div>
  
            <!-- NOR-NORI -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI</h3>
              <NorNoriConjugationTable tiempo="agintera" />
            </div>
  
            <!-- NOR-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORK</h3>
              <NorNorkConjugationTable tiempo="agintera" />
            </div>
  
            <!-- NOR-NORI-NORK -->
            <div v-if="!selectedSystem || selectedSystem === 'nor-nori-nork'" class="bg-white/30 rounded-lg shadow-lg p-4">
              <h3 class="text-lg font-semibold text-amber-700 mb-4">NOR-NORI-NORK</h3>
              <NorNoriNorkConjugationTable tiempo="agintera" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ChevronDown } from 'lucide-vue-next'
  import NorNoriConjugationTable from '@/components/Aditzak/NorNoriConjugationTable.vue'
  import NorNorkConjugationTable from '@/components/Aditzak/NorNorkConjugationTable.vue'
  import NorNoriNorkConjugationTable from '@/components/Aditzak/NorNoriNorkConjugationTable.vue'
    import NorConjugationTable from '@/components/Aditzak/NorConjugationTable.vue'
  
  // Constantes
  const SYSTEMS = {
    'nor': {
      name: 'NOR',
    },
    'nor-nori': {
      name: 'NOR-NORI',
    },
    'nor-nork': {
      name: 'NOR-NORK',
    },
    'nor-nori-nork': {
      name: 'NOR-NORI-NORK',
    }
  }
  
  // Estado
  const selectedSystem = ref('')
  const selectedTiempo = ref('')
  </script>