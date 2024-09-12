<template>
  <main>
    <QuizContainer :category="categoryName" :quiz="quiz" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

import QuizContainer from '@/components/organisms/Quiz/QuizContainer.vue'

export default defineComponent({
  name: 'QuizView',
  components: { QuizContainer },
  setup() {
    const route = useRoute()
    const categoryName = ref('')
    const quiz = ref(null)

    const getCategory = () => {
      const space = '%20'
      const slash = '%2F'

      const path = route.path.split(slash)
      const index = path.length
      const final = path[index - 1].replaceAll(space, ' ')

      categoryName.value = final
    }

    const getQuiz = async () => {
      getCategory()
      const ID = route.params.id.split('/')[0]

      console.log('ID', ID)
      const url = `https://opentdb.com/api.php?amount=10&category=${ID}`
      try {
        const rawResponse = await fetch(url, {
          method: 'POST'
        })
        const res = await rawResponse.json()
        console.log('RES', res)
        quiz.value = res.results
      } catch (error) {
        console.log('ERROR', error)
      }
    }

    getQuiz()

    return { categoryName, quiz }
  }
})
</script>
