<!-- NorNoriConjugationTable.vue -->
<template>
    <div class="w-full max-w-4xl mx-auto">
      <h3 class="text-[var(--text-primary)] font-semibold text-center mb-4">{{ TIEMPO_NAMES[tiempo] }}</h3>
      
      <!-- Selectors -->
      <div class="flex gap-4 mb-6">
        <div class="flex-1">
          <div class="relative">
            <select 
              v-model="selectedNor"
              :class="{
                'transition-all focus:outline-none focus:ring-2 rounded-md p-2 pr-8 w-full': true,
                'input appearance-none pr-8 py-2': true,
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
              v-model="selectedNori"
              placeholder="NORI"
              :class="{
                'transition-all focus:outline-none focus:ring-2 rounded-md p-2 pr-8 w-full': true,
                'input appearance-none pr-8 py-2': true,
              }"
            >
              <option value="" disabled>NORI</option>
              <option v-for="nori in ['NIRI', 'HIRI', 'HARI', 'GURI', 'ZURI', 'ZUEI', 'HAIEI']" :key="nori" :value="nori">
                {{ nori }}
              </option>
            </select>
            <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </div>
  
      <!-- Regular Tables -->
      <div v-if="!isSpecialCase" class="relative overflow-x-auto card p-4">
  <div class="flex">
    <!-- NOR Table -->
    <div class="flex-1">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th v-for="(header, index) in tableStructure.nor.headers" 
                :key="index"
                :class="{
                  'border p-2': true,
                  'table-heading': index === tableStructure.primaryColumns.nor,
                  'table-subheading': index !== tableStructure.primaryColumns.nor
                }">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mapping, person) in norMappings" :key="person"
              :class="{'table-highlight': normalizeValue(selectedNor) === person}">
            <td v-for="column in tableStructure.nor.showColumns" 
                :key="column"
                class="border p-2 text-center text-[var(--text-secondary)] min-h-[2.5rem] h-[2.5rem]">
              {{ mapping[column] || '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- NORI Table -->
    <div class="flex-1">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th v-for="(header, index) in tableStructure.nori.headers" 
                :key="index"
                :class="{
                  'border p-2': true,
                  'table-heading': index === tableStructure.primaryColumns.nori,
                  'table-subheading': index !== tableStructure.primaryColumns.nori
                }">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mapping, person) in noriMappings" :key="person"
              :class="{'table-highlight': normalizeValue(selectedNori) === person}">
            <td v-for="column in tableStructure.nori.showColumns" 
                :key="column"
                class="border p-2 text-[var(--text-secondary)] text-center min-h-[2.5rem] h-[2.5rem]">
              {{ mapping[column] || '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Extra Suffix Table -->
    <div class="flex-none">
      <table class="w-auto border-collapse">
        <thead>
          <tr>
            <th v-for="(header, index) in tableStructure.extraSuffix.headers" 
                :key="index"
                class="border p-2 table-subheading">
                &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mapping, person) in extraSuffixMappings" :key="person"
              :class="{
                'table-highlight': normalizeValue(selectedNor) === person &&
                              person === 'Zuek'
              }">
            <template v-for="column in tableStructure.extraSuffix.showColumns" :key="column">
  <td class="border p-2 text-center text-[var(--text-secondary)]"
      :class="{
        'table-highlight': normalizeValue(selectedNor) === person
      }">
    {{ extraSuffixMappings[person]?.[column] || '-' }}
  </td>
</template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

  
      <!-- Special Cases Table -->
      <div v-else class="relative overflow-x-auto card p-4">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="border p-2 table-heading">NORI</th>
              <th class="border p-2 table-heading">{{ selectedNor }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(forma, nori) in specialForms" 
                :key="nori"
                :class="{'table-highlight': normalizeValue(selectedNori) === normalizeValue(nori)}">
              <td class="border p-2 text-[var(--accent-warning)] text-center">{{ nori }}</td>
              <td class="border p-2 text-[var(--accent-warning)] text-center">{{ forma }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Result -->
      <div v-if="selectedNor && selectedNori" class="mt-4 p-4 card p-4 text-center">
        <span class="font-bold text-[var(--text-primary)] text-lg">{{ conjugationResult }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ChevronDown } from 'lucide-vue-next'
  import { ref, computed } from 'vue'
  import { TIEMPO_NAMES } from '@/utils'
  import { norNoriSystem } from '@/data/conjugations/nor-nori'
  
  const props = defineProps({
    tiempo: {
      type: String,
      default: 'orain'
    }
  })
  
  const selectedNor = ref('')
  const selectedNori = ref('')
  
  const conjugationData = computed(() => {
    return norNoriSystem.conjugations[props.tiempo] || norNoriSystem.conjugations['orain']
  })
  
  const hasSpecialCases = computed(() => {
    return conjugationData.value.type === 'mixed'
  })
  
  const isSpecialCase = computed(() => {
    return hasSpecialCases.value && 
           (selectedNor.value === 'HURA' || selectedNor.value === 'HAIEK')
  })
  
  const tableStructure = computed(() => {
    if (hasSpecialCases.value && conjugationData.value.regularTableStructure) {
      return conjugationData.value.regularTableStructure
    }
    return conjugationData.value.tableStructure
  })
  
  const norMappings = computed(() => {
    if (hasSpecialCases.value) {
      return conjugationData.value.regularNorMappings
    }
    return conjugationData.value.norMappings
  })
  
  const noriMappings = computed(() => {
    if (hasSpecialCases.value) {
      return conjugationData.value.regularNoriMappings
    }
    return conjugationData.value.noriMappings
  })

  const extraSuffixMappings = computed(() => {
  if (hasSpecialCases.value) {
    return conjugationData.value.regularExtraSuffixMappings
  }
  return conjugationData.value.extraSuffixMappings
})
  
  const specialForms = computed(() => {
    if (!isSpecialCase.value) return null
    
    return selectedNor.value === 'HURA' 
      ? conjugationData.value.huraForms 
      : conjugationData.value.haiekForms
  })
  
  const conjugationResult = computed(() => {
    if (!selectedNor.value || !selectedNori.value) return ''

    // Verificar combinaciones inválidas
    const isInvalid = norNoriSystem.invalidCombinations.some(
        combo => 
            normalizeValue(combo.nor) === normalizeValue(selectedNor.value) && 
            normalizeValue(combo.nori) === normalizeValue(selectedNori.value)
    );
    if (isInvalid) return '---'

    // Obtener el resultado del JSON
    return conjugationData.value.results(selectedNor.value, selectedNori.value);
})

const displayForm = computed(() => {
    if (!conjugationResult.value) return '';
    
    const transformation = conjugationData.value.specialTransformations?.find(
        t => t.condition(
            normalizeValue(selectedNor.value), 
            normalizeValue(selectedNori.value)
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
