<script setup>
import { ref, watch } from 'vue'
import { X, Loader2 } from 'lucide-vue-next'

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
    const response = await fetch(`https://idg.eus/tresnak/itzultzaile.php?hitza=${encodeURIComponent(props.word)}`)
    if (!response.ok) throw new Error('Zerbitzariarekin arazoak')
    
    const data = await response.text()
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

// Cerrar con Escape
const handleKeyDown = (e) => {
  if (e.key === 'Escape') closeModal()
}

// Añadir/remover event listener
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleKeyDown)
  } else {
    document.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<template>
  <!-- Backdrop -->
  <div v-if="isOpen" 
       class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
       @click="closeModal">
    
    <!-- Modal -->
    <div class="fixed inset-0 flex items-center justify-center p-4"
         @click.stop>
      <div class="bg-[var(--bg-card)] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold text-indigo-600">{{ word }}</h2>
            <span class="text-gray-500">- Definizioa</span>
          </div>
          <button @click="closeModal"
                  class="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X class="size-5" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <!-- Loading -->
          <div v-if="isLoading" 
               class="flex justify-center items-center py-8">
            <Loader2 class="size-8 animate-spin text-indigo-600" />
          </div>

          <!-- Error -->
          <div v-else-if="error" 
               class="text-center py-8 text-red-500">
            {{ error }}
          </div>

          <!-- Definition -->
          <div v-else-if="definition" 
               class="definition-content"
               v-html="definition" />

          <!-- Empty -->
          <div v-else 
               class="text-center py-8 text-gray-500">
            Ez dago definiziorik
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t">
          <button @click="closeModal"
                  class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Itxi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.definition-content :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #000;
}

.definition-content :deep(li) {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgb(249 250 251);
}

.definition-content :deep(.azpisarrera) {
  color: rgb(79 70 229);
  font-weight: 500;
}

.definition-content :deep(.adibidea) {
  color: rgb(107 114 128);
  font-style: italic;
  margin-top: 0.25rem;
}
</style>