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
    <div class="bg-[var(--bg-card)] backdrop-blur-lg rounded-3xl p-6 shadow-lg relative">
      <!-- Palabra principal -->
      <div class="min-h-[6rem] flex items-center justify-center">
        <div class="flex flex-col items-center gap-4 mb-4">
          <p class="text-2xl font-medium text-gray-800 text-center">
            {{ selectedWord }}
          </p>
          <button
            @click="handleDefinitionClick"
            class="inline-flex items-center bg-gray-300 gap-2 px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
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
          class="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          :placeholder="`${index + 1}. sinonimoa`"
        />
      </div>

      <div class="flex gap-4 mt-6">
        <button
          type="submit"
          class="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
        >
          Baieztatu
        </button>

        <button
          type="button"
          @click="handleNext"
          class="px-4 py-3 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors flex items-center gap-2"
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