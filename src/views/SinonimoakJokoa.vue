<script setup>
import { onMounted } from 'vue'
import LexikoView from '@/components/SinonimoakJokoa/LexikoView.vue'

const emit = defineEmits(['theme-change'])

const onThemeChange = (theme) => {
  emit('theme-change', theme)
}

onMounted(() => {
  // Inicialización si es necesaria
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Header con el mismo estilo que Hiztegia -->
    <div class="top-0 z-20 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl md:text-4xl font-bold text-[var(--text-primary)]">
            Sinonimoen Jokoa
          </h1>
        </div>
      </div>
    </div>

    <!-- Contenido principal con el mismo estilo que Hiztegia -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <LexikoView @theme-change="onThemeChange" />
    </div>
  </div>
</template>