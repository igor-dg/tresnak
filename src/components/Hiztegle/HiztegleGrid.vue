# HiztegleGrid.vue
<script setup>
const props = defineProps({
  attempts: {
    type: Array,
    required: true
  },
  wordLength: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="grid gap-2">
    <div v-for="(attempt, index) in attempts" 
         :key="index"
         class="grid gap-2"
         :style="{ gridTemplateColumns: `repeat(${wordLength}, minmax(0, 1fr))` }"
    >
      <div v-for="(letter, letterIndex) in attempt" 
           :key="letterIndex"
           class="w-12 h-12 flex items-center justify-center rounded-lg text-white font-bold text-2xl"
           :class="{
             'bg-green-500': letter.status === 'correct',
             'bg-yellow-500': letter.status === 'present',
             'bg-gray-400': letter.status === 'absent'
           }"
      >
        {{ letter.letter }}
      </div>
    </div>
  </div>
</template>