<script setup>
const props = defineProps(['sistemas'])
const emit = defineEmits(['update:sistemas'])
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
        Sistemak
      </h4>
      <p class="text-xs text-gray-500 mt-1">Aukeratu nahi dituzun sistemak</p>
    </div>

    <div class="space-y-0">
      <div v-for="sistema in sistemas" 
           :key="sistema.id" 
           class="flex justify-between p-3 rounded-xl hover:bg-amber-50/50 transition-colors">
        <div class="flex flex-col text-start">
            <span class="text-sm font-medium" :style="{ color: 'var(--text-primary)' }">
            {{ sistema.name }}
          </span>
          <span class="text-xs mt-0.5" :style="{ color: 'var(--text-secondary)' }">
            {{ getSystemDescription(sistema.id) }}
          </span>
        </div>
        
        <label class="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            v-model="sistema.active" 
            @change="$emit('update:sistemas', sistemas)"
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
                 background: sistema.active ? 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))' : ''
               }"
          >
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
// Función helper para las descripciones
function getSystemDescription(systemId) {
  const descriptions = {
    'nor': 'Aditz intrantsitiboak',
    'nor-nori': 'Nori kasua duten aditzak',
    'nor-nork': 'Aditz trantsitiboak',
    'nor-nori-nork': 'Hiru argumentuko aditzak'
  }
  return descriptions[systemId] || ''
}
</script>