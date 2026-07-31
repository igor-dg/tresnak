<!-- HiztegleDefinition.vue -->
<script setup>
import { ref, watch, onMounted } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { Timer } from 'lucide-vue-next'
import { fetchDefinition, fetchTranslation } from '@/services/dictionaryApi'

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
    const data = props.contentType === 'definition'
      ? await fetchDefinition(props.word)
      : await fetchTranslation(props.word, true)
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
      <Timer class="w-10 h-10 text-[var(--accent-warning)]" />
      <span class="text-5xl font-bold text-[var(--accent-warning)]">{{ timeLeft }}</span>
    </div>

    <!-- Content -->
    <div class="card p-6 max-h-[60vh] overflow-y-auto">
      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <Loader2 class="w-8 h-8 animate-spin text-[var(--accent-primary)]" />
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-8 text-[var(--accent-danger)] font-medium">
        {{ error }}
      </div>

      <!-- Content -->
      <div v-else-if="content" 
           class="rich-definition"
           v-html="content" />

      <!-- Empty state -->
      <div v-else class="text-center py-8 text-[var(--text-secondary)] font-medium">
        {{ contentType === 'definition' ? 'Ez dago definiziorik' : 'Ez dago itzulpenik' }}
      </div>
    </div>
  </div>
</template>
