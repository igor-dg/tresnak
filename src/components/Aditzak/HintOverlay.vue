<script setup>
import { X } from 'lucide-vue-next'
import { TIEMPO_NAMES } from '@/utils.js'
import NorNorkConjugationTable from './NorNorkConjugationTable.vue'
import NorNoriConjugationTable from './NorNoriConjugationTable.vue'
import NorNoriNorkConjugationTable from './NorNoriNorkConjugationTable.vue'

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
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="$emit('close')"
        />
        
        <!-- Content -->
        <div class="relative w-full max-w-md mx-4 sm:mx-auto">
          <div class="w-full max-w-md mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg space-y-8">
            <!-- Header with title and close button -->
            <div class="flex justify-between items-start mb-4">
              <h5 class="font-bold text-amber-900">{{ title }}</h5>
              <button
                @click="$emit('close')"
                class="p-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full hover:from-amber-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
              >
                <X class="h-5 w-5" />
              </button>
            </div>

            <!-- Hint content -->
            <div class="mt-2">
              <!-- Nor System Content -->
<div v-if="hint.isNorSystem">
  <ul class="space-y-2">
    <li v-for="item in hint.conjugations" 
        :key="item.person"
        class="flex justify-between items-center px-4 py-2 bg-amber-50/50 rounded-lg">
      <span class="text-amber-800 font-medium">{{ item.person }}:</span>
      <span class="text-amber-700 font-semibold">{{ item.conjugation }}</span>
    </li>
  </ul>
</div>

              <div v-else-if="hint.isNorNorkSystem">
  <NorNorkConjugationTable
    :current-nor="hint.currentNor"
    :current-nork="hint.currentNork"
    :tiempo="hint.tiempo"
  />
</div>
<div v-else-if="hint.isNorNoriSystem">
  <NorNoriConjugationTable
    :current-nor="hint.currentNor"
    :current-nori="hint.currentNori"
    :tiempo="hint.tiempo"
  />
</div>
<div v-else-if="hint.isNorNoriNorkSystem">
  <NorNoriNorkConjugationTable
    :current-nor="hint.currentNor"
    :current-nori="hint.currentNori"
    :current-nork="hint.currentNork"
    :tiempo="hint.tiempo"
  />
</div>     
              <!-- Image Content -->
              <div v-else-if="hint.imagen">
                <img 
                  :src="hint.imagen" 
                  :alt="title"
                  class="w-full rounded-lg"
                />
              </div>

              <!-- Text Content -->
              <div v-else>
                <div class="text-sm mb-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-full px-4 py-1 inline-block">
                         <p class="text-white">{{ hint.frase }}</p>
                </div>
                <div class="space-y-1 text-sm text-amber-700">
                  <p>
                    <span class="font-semibold">Sistema:</span> {{ hint.sistema }}
                  </p>
                  <p>
                    <span class="font-semibold">Aldia eta denbora:</span> 
                    {{ getTiempoDisplayName(hint.tiempo)?.toLowerCase() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>