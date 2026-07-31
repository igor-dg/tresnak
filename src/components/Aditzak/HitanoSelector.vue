<script setup>
const props = defineProps(['hitanoEnabled'])
const emit = defineEmits(['update:hitanoEnabled'])
</script>

<template>
  <div class="p-4"> 

    <div class="flex items-center justify-between p-3 rounded-md hover:bg-[var(--accent-primary-soft)] transition-colors">
      <div class="flex flex-col">
        <span class="text-base font-medium text-[var(--text-primary)]">
          Hika
        </span>
        <span class="text-xs text-[var(--text-secondary)] mt-0.5">
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
                  bg-[var(--text-muted)]
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
                  before:shadow
                  before:transition-all
                  before:duration-300
                  peer-checked:before:translate-x-5
                  peer-checked:before:bg-white
                  peer-hover:before:scale-95"
        >
        </div>
      </label>
    </div>
  </div>
</template>
