<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="empty-state">
    <slot>
      <p>{{ message }}</p>
    </slot>
  </div>
</template>
