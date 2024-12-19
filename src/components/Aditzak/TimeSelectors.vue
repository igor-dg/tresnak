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
      <h4 class="text-lg font-semibold" :style="{
        backgroundImage: `linear-gradient(to right, var(--header-gradient-from), var(--header-gradient-to))`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent'
      }">
      Aldia eta denbora
      </h4>
      <p class="text-xs text-gray-500 mt-1" :style="{
        backgroundImage: `linear-gradient(to right, var(--header-gradient-from), var(--header-gradient-to))`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent'
      }">Aukeratu nahi dituzun denborak</p>
    </div>

    <!-- Lista de toggles -->
    <div class="space-y-0">
      <div v-for="tiempo in tiempos" 
           :key="tiempo.id" 
           class="flex justify-between p-3 rounded-xl hover:bg-amber-50/50 transition-colors">
        <div class="flex flex-col text-start">
          <span class="text-sm font-medium" :style="{ color: 'var(--text-primary)' }">
            {{ tiempo.name }}
          </span>
          <!-- <span class="text-xs text-gray-500 mt-0.5">
            {{ getTimeDescription(tiempo.id) }}
          </span> -->
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
                      bg-gray-400
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
                      before:shadow
                      before:transition-all
                      before:duration-300
                      peer-checked:before:translate-x-5
                      peer-checked:before:bg-white
                      peer-hover:before:scale-95"
               :style="{
                 background: tiempo.active ? 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))' : ''
               }"
          >
          </div>
        </label>
      </div>
    </div>
  </div>
</template>