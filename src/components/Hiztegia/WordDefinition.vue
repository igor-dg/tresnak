<script setup>
import { ref, watch } from 'vue'
import { X, Loader2 } from 'lucide-vue-next'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { fetchTranslation } from '@/services/dictionaryApi'

const props = defineProps({
  word: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isOpen'])

const definition = ref('')
const isLoading = ref(false)
const error = ref(null)

// Observar cambios en la palabra seleccionada
watch(() => props.isOpen, async (newVal) => {
  if (newVal && props.word) {
    await fetchDefinition()
  }
})

const fetchDefinition = async () => {
  if (!props.word) return
  
  isLoading.value = true
  error.value = null
  
  try {
    const data = await fetchTranslation(props.word)
    if (data) {
      definition.value = data
    } else {
      error.value = 'Ez dugu ezer aurkitu Elhuyarren'
    }
  } catch (err) {
    console.error('Error:', err)
    error.value = 'Arazo bat sortu da'
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  emit('update:isOpen', false)
  // Limpiar estado al cerrar
  definition.value = ''
  error.value = null
}

</script>

<template>
  <BaseModal
    :model-value="isOpen"
    max-width="max-w-lg"
    :label="`${word} - Definizioa`"
    @close="closeModal"
  >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-[var(--border-card)]">
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold text-[var(--text-primary)]">{{ word }}</h2>
            <span class="text-[var(--text-muted)]">- Definizioa</span>
          </div>
          <BaseButton
            variant="secondary"
            icon-only
            @click="closeModal"
            aria-label="Itxi definizioa"
          >
            <X class="size-5" />
          </BaseButton>
        </div>

        <!-- Content -->
        <div class="p-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <!-- Loading -->
          <div v-if="isLoading" 
               class="flex justify-center items-center py-8">
            <Loader2 class="size-8 animate-spin text-[var(--accent-primary)]" />
          </div>

          <!-- Error -->
          <div v-else-if="error" 
               class="text-center py-8 text-[var(--accent-danger)]">
            {{ error }}
          </div>

          <!-- Definition -->
          <div v-else-if="definition" 
               class="rich-definition"
               v-html="definition" />

          <!-- Empty -->
          <EmptyState v-else message="Ez dago definiziorik" />
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-[var(--border-card)]">
          <BaseButton @click="closeModal" class="w-full py-3 px-4 text-lg">
            Itxi
          </BaseButton>
        </div>
  </BaseModal>
</template>
