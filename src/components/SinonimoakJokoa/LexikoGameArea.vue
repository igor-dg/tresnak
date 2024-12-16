<script setup>
import { ref } from 'vue'
import { ChevronRight, RefreshCw, BookOpen } from 'lucide-vue-next'

const props = defineProps({
  selectedWord: {
    type: String,
    required: true
  },
  answerCount: {
    type: Number,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['submit', 'next', 'update:answers', 'definition-change'])

function handleAnswerChange(index, value) {
  const newAnswers = [...props.answers]
  newAnswers[index] = value
  emit('update:answers', newAnswers)
}

function handleSubmit() {
  emit('submit', props.answers)
}

function handleNext() {
  emit('next')
}

function handleEnter(event, index) {
  if (event.key === 'Enter') {
    event.preventDefault()
    if (index < props.answerCount - 1) {
      const nextInput = event.target.form.elements[index + 1]
      nextInput.focus()
    } else {
      handleSubmit()
    }
  }
}

function handleDefinitionClick() {
  emit('definition-change', true)
}
</script>

<template>
    <div class="bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-lg space-y-8 relative">
      <!-- Palabra principal -->
      <div class="min-h-[6rem] flex items-center justify-center">
        <div class="flex flex-col items-center gap-4 mb-4">
          <p class="text-xl font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full px-4 py-1 inline-block">
            {{ selectedWord }}
          </p>
          <button
            @click="handleDefinitionClick"
            class="inline-flex items-center bg-rose-100 gap-2 px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-200 rounded-lg transition-colors"
          >
            <BookOpen class="size-4" />
            <span>Esanahia</span>
          </button>
        </div>
      </div>

    <!-- Campos de respuesta -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div 
        v-for="(_, index) in answerCount" 
        :key="index"
        class="relative"
      >
        <input
          type="text"
          v-model="answers[index]"
          @keydown="handleEnter($event, index)"
          class="w-full bg-white/50 rounded-full py-4 px-6 text-lg text-left focus:outline-none focus:ring-2 focus:ring-amber-300"
        :style="{ color: 'var(--text-primary)'}"
          :placeholder="`${index + 1}. sinonimoa`"
        />
      </div>

      <div class="flex gap-4 mt-6">
        <button
          type="submit"
          :class="{
        'w-full text-white rounded-full py-3 px-4 flex items-center justify-center gap-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2': true,
        'bg-gradient-to-r': true,
        'from-[var(--gradient-from)]': true,
        'to-[var(--gradient-to)]': true,
        'hover:from-[var(--gradient-hover-from)]': true,
        'hover:to-[var(--gradient-hover-to)]': true,
        'focus:ring-[var(--gradient-from)]': true
      }"
        >
          Baieztatu
        </button>

        <button
          type="button"
          @click="handleNext"
          class="px-4 py-3 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors flex items-center gap-2"
        >
          <RefreshCw class="size-5" />
          <span>Hurrengoa</span>
        </button>
      </div>
    </form>

    <!-- Modal de definición -->
    <WordDefinition
      v-model:isOpen="showDefinition"
      :word="selectedWord"
      @update:isOpen="handleDefinitionChange"
    />
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

input::placeholder {
  color: var(--text-secondary);
}
</style>