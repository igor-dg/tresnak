<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  route: String,
  icon: [Object, Function],
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
    <div class="card card-hover tool-card nav-card p-4 pl-6 h-full flex items-center gap-4" :class="toolClass">
      <div class="nav-card__icon shrink-0" v-if="icon">
        <component :is="icon" class="w-5 h-5" />
      </div>
      <div class="min-w-0">
        <h3 class="text-base font-semibold text-[var(--text-primary)] leading-snug">{{ title }}</h3>
        <p class="text-sm text-[var(--text-secondary)] leading-snug line-clamp-1">{{ description }}</p>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.nav-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-md);
  background-color: color-mix(in srgb, var(--card-accent, var(--accent-primary)) 16%, transparent);
  color: var(--card-accent, var(--accent-primary));
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
