<script setup>
import { Check, X } from 'lucide-vue-next'
import { computed } from 'vue'
import { getSistemaDisplayName, getTiempoDisplayName } from '@/utils'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  sistema: {
    type: String,
    default: ''
  },
  tiempo: {
    type: String,
    default: ''
  },
  phrase: {
    type: String,
    default: ''
  },
  correctAnswer: {
    type: String,
    default: ''
  }
})

const completePhrase = computed(() => {
  if (!props.phrase || !props.correctAnswer) return ''
  return `${props.phrase} ${props.correctAnswer}`
})

const emit = defineEmits(['close'])
</script>

<template>
  <BaseModal :model-value="true" max-width="max-w-md" labelledby="game-result" @close="$emit('close')">
    <div class="p-6 sm:p-8">
      <div class="flex justify-center mb-4">
        <div 
          class="p-4 rounded-md"
          :class="isCorrect ? 'bg-[var(--accent-success-soft)]' : 'bg-[var(--accent-danger-soft)]'"
        >
          <component
            :is="isCorrect ? Check : X"
            class="size-8"
            :class="isCorrect ? 'text-[var(--accent-success)]' : 'text-[var(--accent-danger)]'"
          />
        </div>
      </div>
      
      <p id="game-result" class="text-xl text-center font-medium mb-6" :class="isCorrect ? 'text-[var(--accent-success)]' : 'text-[var(--accent-danger)]'">
        {{ message }}
      </p>
      
      <div class="space-y-2 mb-6 text-center">
        <p class="text-[var(--text-secondary)]">
          <span class="font-medium">Sistema:</span> {{ getSistemaDisplayName(sistema) }}
        </p>
        <p class="text-[var(--text-secondary)]">
          <span class="font-medium">Denbora:</span> {{ getTiempoDisplayName(tiempo) }}
        </p>
        <p class="text-[var(--text-primary)] font-medium mt-4">
          {{ completePhrase }}
        </p>
      </div>
      
      <BaseButton
        @click="$emit('close')"
        class="w-full py-3 px-4"
      >
        Hurrengoa
      </BaseButton>
    </div>
  </BaseModal>
</template>
