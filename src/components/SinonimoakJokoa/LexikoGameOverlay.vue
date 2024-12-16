<script setup>
import { Check, X } from 'lucide-vue-next'

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
  <div class="fixed left-0 top-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white/100 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full mx-4 shadow-xl">
      <!-- Respuestas correctas -->
      <div v-if="correctAnswers.length > 0" class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <Check class="size-5 text-green-600" />
          <h3 class="font-medium text-green-600">Erantzun zuzenak:</h3>
        </div>
        <div class="pl-7">
          <p v-for="answer in correctAnswers" :key="answer" class="text-green-700">
            {{ answer }}
          </p>
        </div>
      </div>

      <!-- Respuestas incorrectas -->
      <div v-if="incorrectAnswers.length > 0" class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <X class="size-5 text-red-600" />
          <h3 class="font-medium text-red-600">Erantzun okerrak:</h3>
        </div>
        <div class="pl-7">
          <p v-for="answer in incorrectAnswers" :key="answer" class="text-red-700">
            {{ answer }}
          </p>
        </div>
      </div>

      <!-- Respuestas que faltaron -->
      <div v-if="missingAnswers.length > 0" class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <h3 class="font-medium text-amber-700">Falta ziren erantzunak:</h3>
        </div>
        <div class="pl-7">
          <p v-for="answer in missingAnswers" :key="answer" class="text-amber-700">
            {{ answer }}
          </p>
        </div>
      </div>

      <button
        @click="$emit('next')"
        :class="{
        'w-full text-white rounded-full py-3 px-4 flex items-center justify-center gap-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2': true,
        'bg-gradient-to-r': true,
        'from-[var(--gradient-from)]': true,
        'to-[var(--gradient-to)]': true,
        'hover:from-[var(--gradient-hover-from)]': true,
        'hover:to-[var(--gradient-hover-to)]': true,
        'focus:ring-[var(--gradient-from)]': true
      }"
      >
        Hurrengoa
      </button>
    </div>
  </div>
</template>