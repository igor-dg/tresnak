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
  <div class="min-h-screen mx-auto py-12 px-4 sm:px-6 xl:px-12">
    <!-- Header con el mismo estilo que Hiztegia -->
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-white mb-6">
            Sinonimoen jolasa
          </h1>
          <p class="text-lg text-[var(--text-secondary)]">
            Aukeratu hitz bat eta asmatu bere sinonimoak. Jolastu eta ikasi!
          </p>
        </header>

    <!-- Contenido principal con el mismo estilo que Hiztegia -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <LexikoView @theme-change="onThemeChange" />
    </div>
  </div>
</template>