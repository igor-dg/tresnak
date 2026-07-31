<script setup>
import { computed } from 'vue'

const props = defineProps({
  respuestas: {
    type: Number,
    required: true
  },
  aciertos: {
    type: Number,
    required: true
  }
})

const fallos = computed(() => props.respuestas - props.aciertos)
const porcentaje = computed(() => props.respuestas ? Math.round((props.aciertos / props.respuestas) * 100) : 0)

const pctClass = computed(() => {
  if (porcentaje.value <= 25) return 'today-stat__value--danger'
  if (porcentaje.value <= 50) return 'today-stat__value--warning'
  if (porcentaje.value <= 75) return 'today-stat__value--mid'
  return 'today-stat__value--success'
})
</script>

<template>
  <div class="today-stat">
    <div class="today-stat__item">
      <span class="today-stat__value">{{ respuestas }}</span>
      <span class="today-stat__label">erantzun</span>
    </div>
    <div class="today-stat__item">
      <span class="today-stat__value today-stat__value--success">{{ aciertos }}</span>
      <span class="today-stat__label">asmatuta</span>
    </div>
    <div class="today-stat__item">
      <span class="today-stat__value today-stat__value--danger">{{ fallos }}</span>
      <span class="today-stat__label">huts</span>
    </div>
    <div class="today-stat__item">
      <span class="today-stat__value" :class="pctClass">{{ porcentaje }}%</span>
      <span class="today-stat__label">asmatze-tasa</span>
    </div>
  </div>
</template>

<style scoped>
.today-stat {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  text-align: center;
  padding: 1rem 0;
}

.today-stat__item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.today-stat__value {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1;
  color: var(--text-primary);
}

.today-stat__value--success {
  color: var(--accent-success);
}

.today-stat__value--danger {
  color: var(--accent-danger);
}

.today-stat__value--warning {
  color: var(--accent-warning);
}

.today-stat__value--mid {
  color: #987418;
}

.today-stat__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
}
</style>
