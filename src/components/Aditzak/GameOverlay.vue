<script setup>
import { Check, X } from 'lucide-vue-next'
import { computed } from 'vue'
import { getSistemaDisplayName, getTiempoDisplayName } from '@/utils'

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
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
    <div class="bg-white/90 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full mx-4 shadow-xl">
      <div class="flex justify-center mb-4">
        <div 
          class="p-4 rounded-full"
          :class="isCorrect ? 'bg-green-100' : 'bg-red-100'"
        >
          <component
            :is="isCorrect ? Check : X"
            class="size-8"
            :class="isCorrect ? 'text-green-600' : 'text-red-600'"
          />
        </div>
      </div>
      
      <p class="text-xl text-center font-medium mb-6" :class="isCorrect ? 'text-green-700' : 'text-red-700'">
        {{ message }}
      </p>
      
      <div class="space-y-2 mb-6 text-center">
        <p class="text-gray-600">
          <span class="font-medium">Sistema:</span> {{ getSistemaDisplayName(sistema) }}
        </p>
        <p class="text-gray-600">
          <span class="font-medium">Denbora:</span> {{ getTiempoDisplayName(tiempo) }}
        </p>
        <p class="text-gray-800 font-medium mt-4">
          {{ completePhrase }}
        </p>
      </div>
      
      <button
        @click="$emit('close')"
        class="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
      >
        Hurrengoa
      </button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.overlay-message {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>