<script setup>
import { X } from 'lucide-vue-next'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center md:hidden">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="$emit('update:modelValue', false)"
        >
        </div>
        
        <!-- Modal content -->
        <div class="relative w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
          <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg">
            <!-- Close button -->
            <button
              @click="$emit('update:modelValue', false)"
              
              :class="{
        'absolute right-4 top-4 transition-all focus:outline-none focus:ring-2 rounded-full p-2': true,
        'bg-gradient-to-r': true,
        'from-[var(--gradient-from)]': true,
        'to-[var(--gradient-to)]': true,
        'hover:from-[var(--gradient-hover-from)]': true,
        'hover:to-[var(--gradient-hover-to)]': true,
        'focus:ring-[var(--gradient-from)]': true
      }"
            >
              <X class="h-6 w-6" />
            </button>
            
            <!-- Settings content -->
            <div class="p-6 pt-12">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>