<script setup>
const props = defineProps(['tiempos'])
const emit = defineEmits(['update:tiempos'])

function getTimeDescription(timeId) {
  const descriptions = {
    'orain': 'Gaur egungo ekintzak',
    'lehen': 'Iraganeko ekintzak',
    'bal_hip': 'Baldintza ez-errealak (-ko balitz)',
    'ond_or': 'Orainaldiko ondorioa (-ko litzateke)',
    'ond_leh': 'Lehenaldiko ondorioa (-ko zatekeen)',
    'ahal_or': 'Orainaldiko ahalmena (dezake)',
    'ahal_leh': 'Lehenaldiko ahalmena (zezakeen)',
    'ahal_hip': 'Ahalera hipotetikoa (lezake)',
    'subj_or': 'Orainaldiko subjuntiboa (dezan)',
    'subj_leh': 'Lehenaldiko subjuntiboa (zezan)',
    'agintera': 'Aginduak ematea (ezazu)'
  }
  return descriptions[timeId] || ''
}
</script>

<template>
  <div class="p-4">
    <!-- Encabezado con estilo -->
    <div class="border-b border-gray-200 pb-2 mb-6">
      <h4 class="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
        Aldia eta denbora
      </h4>
      <p class="text-xs text-gray-500 mt-1">Aukeratu nahi dituzun denborak</p>
    </div>

    <!-- Lista de toggles -->
    <div class="space-y-0">
      <div v-for="tiempo in tiempos" 
           :key="tiempo.id" 
           class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 transition-colors">
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-700">
            {{ tiempo.name }}
          </span>
          <span class="text-xs text-gray-500 mt-0.5">
            {{ getTimeDescription(tiempo.id) }}
          </span>
        </div>
        
        <label class="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            v-model="tiempo.active"
            @change="$emit('update:tiempos', tiempos)"
            class="sr-only peer"
          >
          <div class="w-12 h-7
                      rounded-full
                      bg-gray-200
                      peer-checked:bg-indigo-500
                      transition-all duration-300
                      relative
                      before:content-['']
                      before:absolute
                      before:top-0.5
                      before:left-0.5
                      before:bg-white
                      before:rounded-full
                      before:h-6
                      before:w-6
                      before:shadow-md
                      before:transition-all
                      before:duration-300
                      peer-checked:before:translate-x-5
                      peer-checked:before:bg-white
                      peer-hover:before:scale-95
                      before:shadow-sm"
          >
          </div>
        </label>
      </div>
    </div>
  </div>
</template>