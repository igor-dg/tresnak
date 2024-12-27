<script setup>
import { onMounted } from 'vue'
import AditzLaguntzaileakView from '@/components/Aditzak/AditzLaguntzaileakView.vue'

const emit = defineEmits(['theme-change'])

const onThemeChange = (theme) => {
  emit('theme-change', theme)
}

onMounted(() => {
  // Inicialización si es necesaria
})
</script>

<template>
  <div class="min-h-screen flex flex-col mx-auto py-12 px-4 sm:px-6 xl:px-12">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-white mb-6">
            Aditz Laguntzaileak
          </h1>
        </header>

    <!-- Contenido principal con el mismo estilo que Hiztegia -->
    <div class="flex-1">
        <AditzLaguntzaileakView @theme-change="onThemeChange" />
    </div>
  </div>
</template>

