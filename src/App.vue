<script setup>
import { useTheme } from '@/composables/useTheme'
import NavMenu from './components/NavMenu.vue'
import OnboardingView from './views/OnboardingView.vue'
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core'
import { App as CapacitorApp } from '@capacitor/app'

const { setTheme } = useTheme()
const route = useRoute()
const router = useRouter()
const ONBOARDING_STORAGE_KEY = 'jokatu:onboarding-version'
const ONBOARDING_VERSION = '1'
const EXIT_CONFIRMATION_WINDOW = 2000

const onboardingCompleted = ref(localStorage.getItem(ONBOARDING_STORAGE_KEY) === ONBOARDING_VERSION)
const showOnboarding = ref(!onboardingCompleted.value)
const onboardingStartSlide = ref(0)
const showExitToast = ref(false)
let lastBackPress = 0
let exitToastTimer = null
let backButtonListener = null

const section = computed(() => showOnboarding.value ? 'home' : (route.meta.section || 'home'))
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

const completeOnboarding = () => {
  localStorage.setItem(ONBOARDING_STORAGE_KEY, ONBOARDING_VERSION)
  onboardingCompleted.value = true
  showOnboarding.value = false
  onboardingStartSlide.value = 0
}

const openPrivacy = () => {
  onboardingStartSlide.value = 3
  showOnboarding.value = true
}

const closeOnboarding = () => {
  if (!onboardingCompleted.value) return
  showOnboarding.value = false
  onboardingStartSlide.value = 0
}

const hideExitToast = () => {
  showExitToast.value = false
  if (exitToastTimer) clearTimeout(exitToastTimer)
  exitToastTimer = null
}

const handleBackButton = async () => {
  if (showOnboarding.value) {
    if (onboardingCompleted.value) {
      closeOnboarding()
      return
    }
  } else if (route.path !== '/') {
    hideExitToast()
    lastBackPress = 0
    await router.replace('/')
    return
  }

  const now = Date.now()
  if (now - lastBackPress <= EXIT_CONFIRMATION_WINDOW) {
    hideExitToast()
    CapacitorApp.exitApp()
    return
  }

  lastBackPress = now
  showExitToast.value = true
  if (exitToastTimer) clearTimeout(exitToastTimer)
  exitToastTimer = setTimeout(() => {
    showExitToast.value = false
    lastBackPress = 0
    exitToastTimer = null
  }, EXIT_CONFIRMATION_WINDOW)
}

onMounted(async () => {
  if (Capacitor.getPlatform() !== 'android') return
  backButtonListener = await CapacitorApp.addListener('backButton', handleBackButton)
})

onBeforeUnmount(async () => {
  hideExitToast()
  await backButtonListener?.remove()
})
</script>

<template>
  <div class="min-h-screen" :class="sectionClass">
    <OnboardingView
      v-if="showOnboarding"
      :initial-slide="onboardingStartSlide"
      :can-close="onboardingCompleted"
      @complete="completeOnboarding"
      @close="closeOnboarding"
    />
    <template v-else>
      <NavMenu @open-privacy="openPrivacy" />
      <router-view @theme-change="onThemeChange" />
    </template>

    <Transition name="exit-toast">
      <div v-if="showExitToast" class="exit-toast" role="status" aria-live="polite">
        Sakatu berriro aplikaziotik irteteko
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.exit-toast {
  position: fixed;
  right: 1rem;
  bottom: max(1rem, calc(var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px)) + 0.75rem));
  left: 1rem;
  z-index: 100;
  width: fit-content;
  max-width: calc(100% - 2rem);
  margin-inline: auto;
  padding: 0.8rem 1rem;
  border: 1px solid rgb(255 255 255 / 0.14);
  border-radius: 0.5rem;
  background: #2A2147;
  box-shadow: 0 16px 40px rgb(7 4 18 / 0.35);
  color: #F6F4FC;
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
}

.exit-toast-enter-active,
.exit-toast-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.exit-toast-enter-from,
.exit-toast-leave-to {
  opacity: 0;
  transform: translateY(0.75rem);
}

@media (prefers-reduced-motion: reduce) {
  .exit-toast-enter-active,
  .exit-toast-leave-active {
    transition: none;
  }
}
</style>
