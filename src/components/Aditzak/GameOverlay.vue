<script setup>
const props = defineProps({
  message: String,
  isCorrect: Boolean
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="overlay">
    <div class="overlay-content">
      <p :class="['overlay-message', { 'text-success': isCorrect, 'text-danger': !isCorrect }]">
        {{ message }}
      </p>
      <button class="btn btn-primary" @click="$emit('close')">Hurrengoa</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.overlay-message {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>