<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronUp } from 'lucide-vue-next'

const props = defineProps({
  availableLetters: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['letter-click'])

const showScrollTop = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleLetterClick = (letter) => {
  emit('letter-click', letter);

  // Asegúrate de que el elemento de la letra objetivo se desplace correctamente al comienzo del contenedor visible
  const targetElement = document.querySelector(`#letter-${letter}`);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start', // Esto asegurará que la letra seleccionada esté al comienzo
    });
  }
};

</script>

<template>
  <div class="relative">
    <!-- Navegación Desktop -->
    <div class="hidden md:block sticky top-20">
      <div class="w-full max-w-md mx-auto card p-5 space-y-4">
        <div class="grid grid-cols-2 gap-2 place-items-center">
          <template v-for="letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" :key="letter">
            <button
              v-if="letter"
              @click="handleLetterClick(letter)"
              :disabled="!availableLetters.includes(letter)"
              class="flex items-center justify-center w-12 h-12 text-lg font-bold rounded-md transition-all duration-200"
              :class="{
                'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)]': availableLetters.includes(letter),
                'opacity-30 cursor-not-allowed bg-[var(--bg-page)] text-[var(--text-muted)]': !availableLetters.includes(letter)
              }"
            >
              {{ letter }}
            </button>
            <!-- Placeholder para mantener el grid alineado cuando no hay letra -->
            <div v-else class="w-12 h-12"></div>
          </template>
        </div>
      </div>
    </div>

    <!-- Navegación Móvil -->
<div class="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-card)] shadow-lg border-t border-[var(--border-card)] z-40 safe-area-bottom">
  <div class="flex gap-2 overflow-x-auto px-4 pt-2 justify-start" style="scroll-behavior: smooth;">
    <!-- Botón Falso para Espaciado -->
    <div class="shrink-0 w-8"></div>
    
    <button
      v-for="letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"
      :key="letter"
      @click="handleLetterClick(letter)"
      :disabled="!availableLetters.includes(letter)"
      class="flex items-center justify-center min-w-9 h-9 text-sm font-medium rounded-md transition-all duration-200"
      :class="{
                'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)]': availableLetters.includes(letter),
                'opacity-30 cursor-not-allowed bg-[var(--bg-page)] text-[var(--text-muted)]': !availableLetters.includes(letter)
              }"
    >
      {{ letter }}
    </button>

    <!-- Botón Falso para Espaciado -->
    <div class="shrink-0 w-8"></div>
  </div>
</div>



    <!-- Botón Scroll to top -->
    <button
      @click="scrollToTop"
      class="fixed bottom-24 right-4 md:bottom-6 md:right-8 p-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white rounded-md shadow-md transition-all duration-300 z-40"
      aria-label="Joan orriaren hasierara"
      :tabindex="showScrollTop ? 0 : -1"
      :class="{
        'opacity-100 translate-y-0': showScrollTop,
        'opacity-0 translate-y-10': !showScrollTop
      }"
    >
      <ChevronUp class="h-4 w-4 text-white" />
    </button>
  </div>
</template>

<style scoped>
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
