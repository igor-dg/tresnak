<script setup>
import { onMounted } from 'vue'
import LexikoView from '@/components/SinonimoakJokoa/LexikoView.vue'
import PageHeader from '@/components/ui/PageHeader.vue'

const emit = defineEmits(['theme-change'])

const onThemeChange = (theme) => {
  emit('theme-change', theme)
}

onMounted(() => {
  // Inicialización si es necesaria
})
</script>

<template>
  <div class="page-shell">
    <PageHeader
      title="Sinonimoen jolasa"
      description="Aukeratu hitz bat eta asmatu bere sinonimoak. Jolastu eta ikasi!"
    />

    <!-- Contenido principal con el mismo estilo que Hiztegia -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <LexikoView @theme-change="onThemeChange" />
    </div>
  </div>
</template>
