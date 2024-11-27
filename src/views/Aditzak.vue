<script setup>
import { onMounted } from 'vue'
import AditzLaguntzaileakView from '@/components/Aditzak/AditzLaguntzaileakView.vue'

// Si necesitas cargar datos o hacer alguna inicialización
onMounted(() => {
  // Inicialización si es necesaria
})
</script>

<template>
  <div class="aditzak">
    <AditzLaguntzaileakView />
  </div>
</template>

<style scoped>
.aditzak {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>