<script setup>
import { Check, X } from 'lucide-vue-next'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  correctAnswers: {
    type: Array,
    required: true
  },
  incorrectAnswers: {
    type: Array,
    required: true
  },
  missingAnswers: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['next', 'close'])
</script>

<template>
  <BaseModal :model-value="true" max-width="max-w-md" label="Jokoaren emaitza" @close="$emit('close')">
    <div class="p-6 sm:p-8">
      <!-- Respuestas correctas -->
      <div v-if="correctAnswers.length > 0" class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <Check class="size-5 text-[var(--accent-success)]" />
          <h3 class="font-medium text-[var(--accent-success)]">Erantzun zuzenak:</h3>
        </div>
        <div class="pl-7">
          <p v-for="answer in correctAnswers" :key="answer" class="text-[var(--accent-success-hover)]">
            {{ answer }}
          </p>
        </div>
      </div>

      <!-- Respuestas incorrectas -->
      <div v-if="incorrectAnswers.length > 0" class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <X class="size-5 text-[var(--accent-danger)]" />
          <h3 class="font-medium text-[var(--accent-danger)]">Erantzun okerrak:</h3>
        </div>
        <div class="pl-7">
          <p v-for="answer in incorrectAnswers" :key="answer" class="text-[var(--accent-danger-hover)]">
            {{ answer }}
          </p>
        </div>
      </div>

      <!-- Respuestas que faltaron -->
      <div v-if="missingAnswers.length > 0" class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <h3 class="font-medium text-[var(--accent-warning)]">Falta ziren erantzunak:</h3>
        </div>
        <div class="pl-7">
          <p v-for="answer in missingAnswers" :key="answer" class="text-[var(--accent-warning)]">
            {{ answer }}
          </p>
        </div>
      </div>

      <BaseButton
        @click="$emit('next')"
        class="w-full py-3 px-4 text-lg"
      >
        Hurrengoa
      </BaseButton>
    </div>
  </BaseModal>
</template>
