<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  maxWidth: {
    type: String,
    default: 'max-w-lg'
  },
  label: {
    type: String,
    default: ''
  },
  labelledby: {
    type: String,
    default: ''
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  },
  mobileOnly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleKeydown = event => {
  if (props.modelValue && event.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
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
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        :class="{ 'md:hidden': mobileOnly }"
      >
        <div
          class="absolute inset-0 modal-backdrop"
          aria-hidden="true"
          @click="closeOnBackdrop && close()"
        />
        <div
          class="modal-panel relative"
          :class="maxWidth"
          role="dialog"
          aria-modal="true"
          :aria-label="label || undefined"
          :aria-labelledby="labelledby || undefined"
        >
          <slot :close="close" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
