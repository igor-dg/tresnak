<script setup>
import { useTheme } from '@/composables/useTheme'
import NavMenu from './components/NavMenu.vue'
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const { setTheme } = useTheme()
const route = useRoute()
const section = computed(() => route.meta.section || 'home')
const sectionClass = computed(() => `section-${section.value}`)

watchEffect(() => {
  document.documentElement.dataset.section = section.value
})

const onThemeChange = (theme) => {
  setTheme(theme)
}
</script>

<template>
  <div class="min-h-screen" :class="sectionClass">
    <NavMenu />
    <router-view @theme-change="onThemeChange" />
  </div>
</template>
