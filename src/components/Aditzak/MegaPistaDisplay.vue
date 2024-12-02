<template>
    <div class="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
      <h5 class="font-bold text-gray-800 mb-3 text-center">Megapista</h5>
      
      <!-- Contenido textual para NOR -->
      <div v-if="content.type === 'text'" class="text-center">
        <h6 class="font-semibold mb-2">{{ content.content.title }}</h6>
        <ul class="space-y-1 text-gray-600">
          <li v-for="(conjugation, index) in content.content.conjugations" 
              :key="index"
              class="font-mono">
            {{ conjugation }}
          </li>
        </ul>
      </div>
  
      <!-- Imagen para otros sistemas -->
      <img v-else
           :src="content.content" 
           alt="Megapista" 
           class="w-full rounded-lg">
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useConjugations } from '@/composables/useConjugations'
  
  const props = defineProps({
    sistema: {
      type: String,
      required: true
    },
    tiempo: {
      type: String,
      required: true
    }
  })
  
  const { getMegaPistaContent } = useConjugations()
  
  const content = computed(() => {
    return getMegaPistaContent(props.sistema, props.tiempo)
  })
  </script>