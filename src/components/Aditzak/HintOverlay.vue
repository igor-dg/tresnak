<script setup>
import { X } from 'lucide-vue-next'
import { TIEMPO_NAMES } from '@/utils.js'
import NorNorkConjugationTable from './NorNorkConjugationTable.vue'
import NorNoriConjugationTable from './NorNoriConjugationTable.vue'
import NorNoriNorkConjugationTable from './NorNoriNorkConjugationTable.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

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
  <BaseModal :model-value="isOpen" max-width="max-w-md" :label="title" @close="$emit('close')">
          <div class="p-5 sm:p-8 space-y-6">
            <!-- Header with title and close button -->
            <div class="flex justify-between items-start mb-4">
              <h5 class="font-bold text-[var(--text-primary)]">{{ title }}</h5>
              <BaseButton
                variant="secondary"
                icon-only
                @click="$emit('close')"
                aria-label="Itxi pista"
              >
                <X class="h-5 w-5" />
              </BaseButton>
            </div>

            <!-- Hint content -->
            <div class="mt-2">
              <!-- Nor System Content -->
<div v-if="hint.isNorSystem">
  <ul class="space-y-2">
    <li v-for="item in hint.conjugations" 
        :key="item.person"
        class="flex justify-between items-center px-4 py-2 surface-soft">
      <span class="text-[var(--text-primary)] font-medium">{{ item.person }}:</span>
      <span class="text-[var(--accent-primary)] font-semibold">{{ item.conjugation }}</span>
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
                  class="w-full rounded-md border border-[var(--border-card)]"
                />
              </div>

              <!-- Text Content -->
              <div v-else>
                <div class="text-sm mb-3 font-semibold text-[var(--accent-primary)] bg-[var(--accent-primary-soft)] rounded-md px-3 py-1 inline-block">
                         <p>{{ hint.frase }}</p>
                </div>
                <div class="space-y-1 text-sm text-[var(--text-secondary)]">
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
  </BaseModal>
</template>
