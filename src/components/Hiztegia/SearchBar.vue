<script setup>
import { ref, watch } from 'vue'
import { Search, X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Bilatu hitza...'
  }
})

const emit = defineEmits(['update:modelValue', 'search', 'clear'])

const searchInput = ref(props.modelValue)
const isInputFocused = ref(false)

// Actualizar el input cuando cambia el modelValue
watch(() => props.modelValue, (newValue) => {
  searchInput.value = newValue
})

// Emitir cambios cuando se actualiza el input
watch(searchInput, (newValue) => {
  emit('update:modelValue', newValue)
  emit('search', newValue)
})

const clearSearch = () => {
  searchInput.value = ''
  emit('update:modelValue', '')
  emit('clear')
}

const handleFocus = () => {
  isInputFocused.value = true
}

const handleBlur = () => {
  isInputFocused.value = false
}
</script>

<template>
  <div class="relative mb-6">
    <!-- Contenedor principal con animación de foco -->
    <div
      class="relative flex items-center transition-all duration-200 backdrop-blur-sm rounded-xl"
      :class="{
        'ring-2 ring-amber-400 shadow-lg': isInputFocused,
        'shadow': !isInputFocused
      }"
    >
      <!-- Icono de búsqueda -->
      <Search
        class="absolute left-4 size-5 text-amber-400"
        :class="{ 'text-amber-500': isInputFocused }"
      />

      <!-- Campo de búsqueda -->
      <input
        v-model="searchInput"
        type="text"
        :placeholder="placeholder"
        @focus="handleFocus"
        @blur="handleBlur"        
        class="w-full py-3 pl-12 pr-10 bg-white/40 rounded-xl px-6 text-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-300"
        :style="{ color: 'var(--text-primary)'}"
      />

      <!-- Botón de limpiar -->
      <button
        v-show="searchInput"
        @click="clearSearch"
        :class="{
        'absolute right-2 top-1/2 -translate-y-1/2 transition-all focus:outline-none focus:ring-2 rounded-full p-2': true,
        'bg-gradient-to-r': true,
        'from-[var(--gradient-from)]': true,
        'to-[var(--gradient-to)]': true,
        'hover:from-[var(--gradient-hover-from)]': true,
        'hover:to-[var(--gradient-hover-to)]': true,
        'focus:ring-[var(--gradient-from)]': true
      }"
        type="button"
      >
        <X class="size-4" />
      </button>
    </div>

    <!-- Indicador de resultados -->
    <div
      v-if="searchInput"
      class="absolute -bottom-6 left-4 text-sm text-gray-500"
    >
      <slot name="results-count">
        <!-- El componente padre puede proporcionar el conteo de resultados aquí -->
      </slot>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  color: var(--text-secondary);
}
</style>