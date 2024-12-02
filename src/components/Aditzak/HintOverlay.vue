<script setup>
import { X } from 'lucide-vue-next'
import { TIEMPO_NAMES } from '@/utils.js'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  hint: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

function getTiempoDisplayName(tiempoId) {
  return TIEMPO_NAMES[tiempoId] || tiempoId
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center md:hidden">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="$emit('close')"
        />
        
        <!-- Content -->
        <div class="relative w-full max-w-sm mx-4">
          <div class="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <!-- Close button -->
            <button
              @click="$emit('close')"
              class="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
            >
              <X class="h-5 w-5 text-gray-500" />
            </button>

            <!-- Hint content -->
            <h5 class="font-bold text-gray-800 mb-4">{{ title }}</h5>
            
            <!-- Nor System Content -->
            <div v-if="hint.isNorSystem">
              <ul class="space-y-1">
                <li v-for="(conj, index) in hint.conjugations" 
                    :key="index"
                    class="text-gray-600">
                  {{ conj }}
                </li>
              </ul>
            </div>
            
            <!-- Image Content -->
            <div v-else-if="hint.imagen">
              <img 
                :src="hint.imagen" 
                :alt="title"
                class="w-full rounded-lg"
              >
            </div>
            <div v-else>
              <p class="text-gray-600 mb-3">{{ hint.frase }}</p>
              <p class="text-sm text-gray-500">
                <span class="font-semibold">Sistema:</span> {{ hint.sistema }}
              </p>
              <p class="text-sm text-gray-500">
                <span class="font-semibold">Aldia eta denbora:</span> 
                {{ getTiempoDisplayName(hint.tiempo)?.toLowerCase() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>