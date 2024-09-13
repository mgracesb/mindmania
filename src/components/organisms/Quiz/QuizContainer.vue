<template>
  <div class="quiz-container">
    <p class="section-title">{{ category }}</p>
    <div v-if="quiz" class="quiz-container__list">
      <CardItem
        v-if="currentQuestionIndex < quiz.length"
        :question="quiz[currentQuestionIndex]"
        @next="handleNext"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import CardItem from '@/components/molecules/Card/CardItem.vue'

export default defineComponent({
  name: 'QuizContainer',
  components: { CardItem },
  props: {
    category: { type: String, default: '' },
    quiz: { type: Array, default: () => [] }
  },
  setup() {
    const currentQuestionIndex = ref(0)

    return {
      currentQuestionIndex
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
</style>
