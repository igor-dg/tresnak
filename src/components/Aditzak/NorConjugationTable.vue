<!-- NorConjugationTable.vue -->
<template>
    <div class="w-full">
        <h3 class="text-[var(--text-primary)] font-semibold text-center mb-4">{{ TIEMPO_NAMES[tiempo] }}</h3>

        <div class="h-[65px]"><!-- h-[88px] es aproximadamente el alto de los dos selectores + gap --></div>
      
      <!-- Tabla de conjugación -->
      <div class="relative overflow-x-auto card p-4">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="border p-2 table-heading">NOR</th>
              <th class="border p-2 table-subheading"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, index) in PERSONS" 
                :key="person"
                :class="{'table-highlight': selectedPerson === person}">
              <td class="border p-2 text-[var(--text-secondary)] text-center">{{ person }}</td>
              <td class="border p-2 text-[var(--text-secondary)] text-center">
                {{ conjugations[index] || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Resultado seleccionado -->
      <div v-if="selectedPerson" class="mt-4 p-4 card p-4 text-center">
        <span class="font-bold text-[var(--text-primary)] text-lg">
          {{ conjugations[PERSONS.indexOf(selectedPerson)] }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { TIEMPO_NAMES } from '@/utils'
  import norConjugations from '@/data/nor-conjugations.json'
  
  const props = defineProps({
    tiempo: {
      type: String,
      default: 'orain'
    }
  })
  
  // Constantes
  const PERSONS = ['NI', 'HI', 'HURA', 'GU', 'ZU', 'ZUEK', 'HAIEK']
  
  // Estado
  const selectedPerson = ref('')
  
  // Computed
  const conjugations = computed(() => {
    // Obtenemos las conjugaciones del tiempo seleccionado o un array vacío si no existe
    return norConjugations[props.tiempo]?.conjugations || Array(7).fill('-')
  })
  </script>
