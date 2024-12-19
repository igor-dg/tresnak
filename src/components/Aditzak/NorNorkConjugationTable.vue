<!-- NorNorkConjugationTable.vue -->
<template>
    <div class="w-full max-w-4xl mx-auto">
        <h3 class="text-amber-700 font-semibold text-center mb-4"> {{ TIEMPO_NAMES[tiempo] }}</h3>
      <!-- Selectores -->
      <div class="flex gap-4 mb-6">
        <div class="flex-1">
          <div class="relative">
            <select 
              v-model="selectedNor"
              :class="{
                'transition-all focus:outline-none focus:ring-2 rounded-full p-2 pr-8 w-full': true,
                'bg-gradient-to-r appearance-none': true,
                'from-[var(--gradient-from)]': true,
                'to-[var(--gradient-to)]': true,
                'hover:from-[var(--gradient-hover-from)]': true,
                'hover:to-[var(--gradient-hover-to)]': true,
                'focus:ring-[var(--gradient-from)]': true,
                'placeholder:text-amber-700': true,
              }"
            >
            <option value="" disabled>NOR</option>
            <option v-for="nor in ['NI', 'HI', 'HURA', 'GU', 'ZU', 'ZUEK', 'HAIEK']" :key="nor" :value="nor">
              {{ nor }}
            </option>
            </select>
            <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
          </div>
        </div>
        <div class="flex-1">
          <div class="relative">
            <select 
              v-model="selectedNork"
              placeholder="NORK" 
              :class="{
                'transition-all focus:outline-none focus:ring-2 rounded-full p-2 pr-8 w-full': true,
                'bg-gradient-to-r appearance-none': true,
                'from-[var(--gradient-from)]': true,
                'to-[var(--gradient-to)]': true,
                'hover:from-[var(--gradient-hover-from)]': true,
                'hover:to-[var(--gradient-hover-to)]': true,
                'focus:ring-[var(--gradient-from)]': true,
                'placeholder:text-amber-700': true,
              }"
            >
            <option value="" disabled>NORK</option>
            <option v-for="nork in ['NIK', 'HIK', 'HARK', 'GUK', 'ZUK', 'ZUEK', 'HAIEK']" :key="nork" :value="nork">
              {{ nork }}
            </option>
            </select>
            <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </div>
  
      <!-- Tablas regulares -->
    <div v-if="!isSpecialCase" class="relative overflow-x-auto bg-white/30 rounded-lg shadow-lg p-4">
      <div class="flex">
        <!-- Tabla NOR -->
        <div class="flex-1">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th v-for="(header, index) in tableStructure.nor.headers" 
        :key="index"
        :class="{
          'border p-2': true,
          'bg-amber-400': index === tableStructure.primaryColumns.nor,
          'bg-amber-300': index !== tableStructure.primaryColumns.nor
        }">
      {{ header }}
    </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mapping, person) in norMappings" :key="person"
                  :class="{'bg-amber-50': normalizeValue(selectedNor) === person}">
                <td v-for="column in tableStructure.nor.showColumns" 
                    :key="column"
                    class="border p-2 text-center text-amber-500 min-h-[2.5rem] h-[2.5rem]">
                  {{ mapping[column] || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Tabla NORK -->
        <div class="flex-1">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th v-for="(header, index) in tableStructure.nork.headers" 
        :key="index"
        :class="{
          'border p-2': true,
          'bg-amber-400': index === tableStructure.primaryColumns.nor,
          'bg-amber-300': index !== tableStructure.primaryColumns.nor
        }">
      {{ header }}
    </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mapping, person) in norkMappings" :key="person"
                  :class="{'bg-amber-50': normalizeValue(selectedNork) === person}">
                <td v-for="column in tableStructure.nork.showColumns" 
                    :key="column"
                    class="border p-2 text-amber-500 text-center min-h-[2.5rem] h-[2.5rem]">
                  {{ mapping[column] || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Tabla para casos especiales -->
    <div v-else class="relative overflow-x-auto bg-white/30 rounded-lg shadow-lg p-4">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="border p-2 bg-amber-400">NORK</th>
            <th class="border p-2 bg-amber-400">{{ selectedNor }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(forma, nork) in specialForms" 
              :key="nork"
              :class="{'bg-amber-50': normalizeValue(selectedNork) === normalizeValue(nork)}">
            <td class="border p-2 text-amber-500 text-center">{{ nork }}</td>
            <td class="border p-2 text-amber-500 text-center">{{ forma }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Resultado -->
    <div v-if="selectedNor && selectedNork" class="mt-4 p-4 bg-white/30 rounded-lg text-center">
      <span class="font-bold text-amber-700 text-lg">{{ conjugationResult }}</span>
    </div>
  </div>
</template>
  
  <script setup>
  import { ChevronDown } from 'lucide-vue-next'
  import { ref, computed } from 'vue'
  import { TIEMPO_NAMES } from '@/utils'
  import { norNorkSystem  } from '@/data/conjugations/nor-nork'
  
  const props = defineProps({
  tiempo: {
    type: String,
    default: 'orain'
  }
})

const selectedNor = ref('')
const selectedNork = ref('')

const conjugationData = computed(() => {
    return norNorkSystem.conjugations[props.tiempo] || norNorkSystem.conjugations['orain']
})

const hasSpecialCases = computed(() => {
  return conjugationData.value.type === 'mixed'
})

const isSpecialCase = computed(() => {
  return hasSpecialCases.value && 
         (selectedNor.value === 'HURA' || selectedNor.value === 'HAIEK')
})

const tableStructure = computed(() => {
    // Si es tipo mixed y tiene regularTableStructure, usamos esa
    if (hasSpecialCases.value && conjugationData.value.regularTableStructure) {
        return conjugationData.value.regularTableStructure
    }
    // Si no, usamos la tableStructure normal
    return conjugationData.value.tableStructure
})

const norMappings = computed(() => {
  if (hasSpecialCases.value) {
    return conjugationData.value.regularNorMappings
  }
  return conjugationData.value.norMappings
})

const norkMappings = computed(() => {
  if (hasSpecialCases.value) {
    return conjugationData.value.regularNorkMappings
  }
  return conjugationData.value.norkMappings
})

const specialForms = computed(() => {
  if (!isSpecialCase.value) return null
  
  return selectedNor.value === 'HURA' 
    ? conjugationData.value.huraForms 
    : conjugationData.value.haiekForms
})

const conjugationResult = computed(() => {
    if (!selectedNor.value || !selectedNork.value) return ''

    // Verificar combinaciones inválidas
    const isInvalid = norNorkSystem.invalidCombinations.some(
        combo => 
            normalizeValue(combo.nor) === normalizeValue(selectedNor.value) && 
            normalizeValue(combo.nork) === normalizeValue(selectedNork.value)
    );
    if (isInvalid) return '---'

    // Obtener el resultado del JSON
    return conjugationData.value.results(selectedNor.value, selectedNork.value);
})

const displayForm = computed(() => {
    if (!conjugationResult.value) return '';
    
    const transformation = conjugationData.value.specialTransformations?.find(
        t => t.condition(
            normalizeValue(selectedNor.value), 
            normalizeValue(selectedNork.value)
        )
    );

    if (transformation) {
        return transformation.transform(conjugationResult.value).display;
    }
    
    return conjugationResult.value;
});

function normalizeValue(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}
  </script>