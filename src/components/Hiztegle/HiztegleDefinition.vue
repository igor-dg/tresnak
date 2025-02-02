<!-- HiztegleDefinition.vue -->
<script setup>
import { ref, watch, onMounted } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { Timer } from 'lucide-vue-next'

const emit = defineEmits(['timer-complete'])

const props = defineProps({
  word: {
    type: String,
    required: true
  },
  timeLeft: {
    type: Number,
    required: true
  },
  contentType: {
    type: String,
    default: 'definition', // 'definition' or 'translation'
    required: true
  }
})

const content = ref('')
const isLoading = ref(false)
const error = ref(null)

onMounted(async () => {
  if (props.word) {
    await fetchContent()
  }
})

watch(() => [props.word, props.contentType], async () => {
  if (props.word) {
    content.value = ''
    await fetchContent()
  }
}, { deep: true })

const fetchContent = async () => {
  if (!props.word) return
  
  isLoading.value = true
  error.value = null
  
  try {
    const endpoint = props.contentType === 'definition' 
      ? 'definizioa.php' 
      : 'itzultzaile.php'
    
    const response = await fetch(`https://idg.eus/tresnak/${endpoint}?hitza=${encodeURIComponent(props.word)}&definition_only=true`)
    if (!response.ok) throw new Error('Zerbitzariarekin arazoak')
    
    const data = await response.text()
    if (data && data.trim()) {
      content.value = data
    } else {
      error.value = props.contentType === 'definition' 
        ? 'Ez dugu ezer aurkitu Harluxeten'
        : 'Ez dugu ezer aurkitu Elhuyarren'
    }
  } catch (err) {
    console.error('Error:', err)
    error.value = 'Arazo bat sortu da'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="definition-container">
    <!-- Timer -->
    <div class="flex items-center justify-center gap-2 mb-6">
      <Timer class="w-10 h-10 text-orange-600" />
      <span class="text-5xl font-bold text-orange-600">{{ timeLeft }}</span>
    </div>

    <!-- Content -->
    <div class="bg-white/40 rounded-2xl p-6 shadow-lg max-h-[60vh] overflow-y-auto">
      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <Loader2 class="w-8 h-8 animate-spin text-orange-600" />
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-8 text-red-500 font-medium">
        {{ error }}
      </div>

      <!-- Content -->
      <div v-else-if="content" 
           class="definition-content"
           v-html="content" />

      <!-- Empty state -->
      <div v-else class="text-center py-8 text-orange-500 font-medium">
        {{ contentType === 'definition' ? 'Ez dago definiziorik' : 'Ez dago itzulpenik' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.definition-content :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0;
}

.definition-content :deep(li) {
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.265);
  border: 1px solid rgb(254 215 170); /* orange-200 */
  color: black;
}

.definition-content :deep(.azpisarrera) {
  color: rgb(234 88 12); /* orange-600 */
  font-weight: 500;
}

.definition-content :deep(.adibidea) {
  color: rgb(120 113 108); /* stone-500 */
  font-style: italic;
  margin-top: 0.5rem;
}
</style>