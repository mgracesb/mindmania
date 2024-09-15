<template>
  <div class="quiz-container">
    <p class="quiz-container__title section-title">{{ category }}</p>
    <div v-if="quiz" class="quiz-container__list">
      <CardItem
        v-if="currentQuestionIndex < quiz.length"
        :question="quiz[currentQuestionIndex]"
        :is-transitioning="isTransitioning"
        @next="next"
      />
      <Score :correct="correctAnswers" :total="quiz.length" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { type QuestionType } from '@/utils/types/Card'

import CardItem from '@/components/molecules/Card/CardItem.vue'
import Score from '@/components/atoms/Score/Score.vue'

export default defineComponent({
  name: 'QuizContainer',
  components: { CardItem, Score },
  props: {
    category: { type: String, default: '' },
    quiz: { type: Array as () => QuestionType[], default: () => [] }
  },
  setup(props, { emit }) {
    const correctAnswers = ref(0)
    const correctAnswerList = ref<string[]>([])

    const currentQuestionIndex = ref(0)
    const isTransitioning = ref(false)

    const next = (data: string, isCorrect: boolean = false) => {
      isTransitioning.value = true
      correctAnswerList.value.push(data)

      setTimeout(() => {
        currentQuestionIndex.value++

        if (isCorrect) {
          correctAnswers.value++
        }

        if (currentQuestionIndex.value === props.quiz.length) {
          emit('complete', correctAnswers.value)
        }

        isTransitioning.value = false
      }, 2000)
    }

    return {
      correctAnswers,
      currentQuestionIndex,
      isTransitioning,

      next
    }
  }
})
</script>

<style lang="sass" scoped>
.quiz-container
  height: 100%
  padding-top: 25%
  display: flex
  flex-direction: column
  align-items: center
  gap: 3rem
  @media (min-width: 700px)
    padding-top: 10%
  &__title
    letter-spacing: 1px
    text-shadow: 1px 1px 2px whitesmoke
    text-align: center
</style>
