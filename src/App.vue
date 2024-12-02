<script setup>
import { useTheme } from '@/composables/useTheme'
import NavMenu from './components/NavMenu.vue'

const { setTheme } = useTheme()

const onThemeChange = (theme) => {
  setTheme(theme)
}
</script>

<template>
  <div class="min-h-screen">
    <NavMenu />
    <router-view @theme-change="onThemeChange" />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
}
</style>
