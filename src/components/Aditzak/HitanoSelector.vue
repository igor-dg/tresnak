<script setup>
const props = defineProps(['hitanoEnabled'])
const emit = defineEmits(['update:hitanoEnabled'])
</script>

<template>
  <div class="p-4"> 

    <div class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 transition-colors">
      <div class="flex flex-col">
        <span class="text-base font-medium bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent">
          Hika tratamendua
        </span>
        <span class="text-xs text-gray-500 mt-0.5">
            Hikako adizkiak erabili
        </span>
      </div>
      
      <label class="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          :checked="hitanoEnabled"
          @change="emit('update:hitanoEnabled', $event.target.checked)"
          class="sr-only peer"
        >
        <div class="w-12 h-7
                  rounded-full
                  bg-gray-200
                  peer-checked:bg-pink-500
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
</template>