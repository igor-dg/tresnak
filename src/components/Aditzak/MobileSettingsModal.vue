<script setup>
import { X } from 'lucide-vue-next'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    max-width="max-w-lg"
    label="Jokoaren ezarpenak"
    mobile-only
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="relative">
      <BaseButton
        variant="secondary"
        icon-only
        class="absolute right-4 top-4"
        aria-label="Itxi ezarpenak"
        @click="$emit('update:modelValue', false)"
      >
        <X class="h-6 w-6" />
      </BaseButton>
      <div class="p-6 pt-16">
        <slot />
      </div>
    </div>
  </BaseModal>
</template>
