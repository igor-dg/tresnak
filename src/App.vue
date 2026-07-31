<script setup>
import { useTheme } from '@/composables/useTheme'
import NavMenu from './components/NavMenu.vue'
import { computed, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core'

const { setTheme } = useTheme()
const route = useRoute()
const section = computed(() => route.meta.section || 'home')
const sectionClass = computed(() => `section-${section.value}`)

watchEffect(() => {
  document.documentElement.dataset.section = section.value
})

watch(section, async (currentSection) => {
  if (!Capacitor.isNativePlatform()) return

  try {
    await SystemBars.setStyle({
      // Capacitor names the style after the background: Dark renders light icons.
      style: currentSection === 'home' ? SystemBarsStyle.Dark : SystemBarsStyle.Light,
    })
  } catch (error) {
    console.error('Ezin izan dira sistema-barrak eguneratu:', error)
  }
}, { immediate: true })

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
