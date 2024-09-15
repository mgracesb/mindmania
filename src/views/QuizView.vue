<template>
  <main>
    <QuizContainer
      v-if="!showTotalComponent && quiz"
      :category="categoryName"
      :quiz="quiz"
      @complete="handleComplete"
    />
    <CompletedItem
      v-if="showTotalComponent && quiz"
      :total="quiz.length"
      :correct="userTotalCorrect"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

import QuizContainer from '@/components/organisms/Quiz/QuizContainer.vue'
import CompletedItem from '@/components/molecules/Completed/CompletedItem.vue'

export default defineComponent({
  name: 'QuizView',
  components: { QuizContainer, CompletedItem },
  setup() {
    const route = useRoute()

    const allCorrectAnswers = ref<string[]>([])
    const categoryName = ref<string>('')
    const quiz = ref<any[]>([])
    const userTotalCorrect = ref<number>(0)
    const showTotalComponent = ref<boolean>(false)

    const getCategory = () => {
      const space = '%20'
      const slash = '%2F'

      const path = route.path.split(slash)
      const index = path.length
      const final = path[index - 1].replace(new RegExp(space, 'g'), ' ')

      categoryName.value = final
    }

    const handleComplete = (totalCorrect: number): void => {
      userTotalCorrect.value = totalCorrect
      showTotalComponent.value = true
    }

    const getQuiz = async (): Promise<void> => {
      getCategory()
      const ID = typeof route.params.id === 'string' ? route.params.id.split('/')[0] : ''

      console.log('ID', ID)
      const url = `https://opentdb.com/api.php?amount=10&category=${ID}`
      try {
        const rawResponse = await fetch(url, {
          method: 'POST'
        })
        const res = await rawResponse.json()

        const correctList: string[] = []
        res.results.map((el: { correct_answer: string }) => correctList.push(el.correct_answer))

        allCorrectAnswers.value = correctList
        quiz.value = res.results
      } catch (error) {
        console.log('ERROR', error)
      }
    }

    getQuiz()

    return {
      categoryName,
      quiz,
      showTotalComponent,
      userTotalCorrect,

      handleComplete
    }
  }
})
</script>
