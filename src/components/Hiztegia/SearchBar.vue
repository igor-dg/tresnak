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
      class="relative flex items-center transition-all duration-200 rounded-md"
      :class="{
        'ring-2 ring-[var(--focus-ring)]': isInputFocused
      }"
    >
      <!-- Icono de búsqueda -->
      <Search
        class="absolute left-4 size-5 text-[var(--text-muted)] pointer-events-none"
        :class="{ 'text-[var(--accent-primary)]': isInputFocused }"
      />

      <!-- Campo de búsqueda -->
      <input
        v-model="searchInput"
        type="text"
        :placeholder="placeholder"
        @focus="handleFocus"
        @blur="handleBlur"        
        class="input py-3 pl-12 pr-12 text-lg text-left sm:text-center"
      />

      <!-- Botón de limpiar -->
      <button
        v-show="searchInput"
        @click="clearSearch"
        class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-page)] hover:text-[var(--text-primary)]"
        type="button"
        aria-label="Garbitu bilaketa"
      >
        <X class="size-4" />
      </button>
    </div>

    <!-- Indicador de resultados -->
    <div
      v-if="searchInput"
      class="absolute -bottom-6 left-1 text-sm text-[var(--text-muted)]"
    >
      <slot name="results-count">
        <!-- El componente padre puede proporcionar el conteo de resultados aquí -->
      </slot>
    </div>
  </div>
</template>
