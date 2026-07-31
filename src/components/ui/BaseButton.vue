<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'ghost', 'danger'].includes(value)
  },
  iconOnly: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  }
})

const buttonClass = computed(() => [
  props.iconOnly ? 'icon-button' : 'button',
  !props.iconOnly && `button--${props.variant}`
])
</script>

<template>
  <button :type="type" :class="buttonClass">
    <slot />
  </button>
</template>
