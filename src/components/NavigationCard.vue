<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  route: String,
});

const toolClass = computed(() => {
  if (props.route.includes('hiztegle')) return 'tool-card--hiztegle'
  if (props.route.includes('sinonimo')) return 'tool-card--sinonimoak'
  if (props.route === '/hiztegia') return 'tool-card--hiztegia'
  if (props.route === '/aditzak') return 'tool-card--aditzak'
  if (props.route.includes('taulak')) return 'tool-card--taulak'
  if (props.route.includes('estatistikak')) return 'tool-card--estatistikak'
  return ''
})
</script>

<template>
  <router-link :to="route" class="text-[var(--text-primary)] no-underline h-full block">
    <div class="card card-hover tool-card p-6 pl-7 h-full flex flex-col" :class="toolClass">
      <div class="flex-grow">
        <h3 class="text-xl font-semibold mb-2 text-[var(--text-primary)]">{{ title }}</h3>
        <p class="text-[var(--text-secondary)] leading-relaxed">{{ description }}</p>
      </div>
    </div>
  </router-link>
</template>
