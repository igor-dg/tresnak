<template>
    <section class="max-w-md mx-auto card p-5" aria-labelledby="mega-hint-title">
      <h5 id="mega-hint-title" class="font-bold text-[var(--text-primary)] mb-4 text-center">Megapista</h5>
      
      <!-- Contenido textual para NOR -->
      <div v-if="content.type === 'text'" class="text-center">
        <h6 class="font-semibold mb-2">{{ content.content.title }}</h6>
        <ul class="divide-y divide-[var(--border-card)] border-y border-[var(--border-card)] text-[var(--text-secondary)]">
          <li v-for="(conjugation, index) in content.content.conjugations" 
              :key="index"
              class="font-mono py-2">
            {{ conjugation }}
          </li>
        </ul>
      </div>
  
      <!-- Imagen para otros sistemas -->
      <img v-else
           :src="content.content" 
           alt="Megapista" 
           class="w-full rounded-md">
    </section>
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
