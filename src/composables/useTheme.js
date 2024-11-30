import { ref, watch } from 'vue'

export function useTheme() {
  const theme = ref(localStorage.getItem('theme-mode') || 'default')
  
  watch(theme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme-mode', newTheme)
  }, { immediate: true })

  return {
    theme,
    setTheme: (newTheme) => {
      theme.value = newTheme
    }
  }
}