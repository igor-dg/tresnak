<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <header class="page-header">
    <span class="section-marker" aria-hidden="true"></span>
    <h1 class="page-title">{{ title }}</h1>
    <p v-if="description" class="page-description">{{ description }}</p>
    <slot />
  </header>
</template>
