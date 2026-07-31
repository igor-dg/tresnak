<script setup>
import { ref } from 'vue'
import { RefreshCw, BookOpen, ChartLine } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

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

const router = useRouter()

const goToStats = () => {
  router.push({ name: 'estatistikak' })
}
</script>

<template>
    <div class="game-card md:p-4 lg:p-8 space-y-6 sm:space-y-8 relative">
      <!-- Palabra principal -->
      <div class="min-h-[6rem] flex items-center justify-center">
        <div class="flex flex-col items-center gap-4 mb-4">
          <p class="label-chip text-xl">
            {{ selectedWord }}
          </p>
          <button
            @click="handleDefinitionClick"
            class="btn-ghost gap-2 px-3 py-1.5 text-sm"
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
          class="input text-lg py-4 px-6 text-left"
        :style="{ color: 'var(--text-primary)'}"
          :placeholder="`${index + 1}. sinonimoa`"
        />
      </div>

      <div class="flex gap-4 mt-6">
        <button
          type="submit"
          class="btn-primary w-full py-3 px-4 text-lg"
        >
          Baieztatu
        </button>

        <button
          type="button"
          @click="handleNext"
          class="btn-primary py-3 px-4 text-lg"
          aria-label="Aldatu hitza"
      >
        <RefreshCw class="w-5 h-5" />
        </button>
        <button 
        type="button"
        @click="goToStats"
        title="Estatistikak"
        class="btn-primary py-3 px-4 text-lg"
      >
        <ChartLine class="w-5 h-5" />
      </button>
      </div>
    </form>

  </div>
</template>
