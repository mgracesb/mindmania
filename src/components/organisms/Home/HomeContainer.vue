<template>
  <div class="home-container">
    <p class="home-container__title section-title">Choose a category:</p>
    <v-combobox
      v-model="category"
      label="Categories"
      variant="solo"
      :items="categories"
      @update:model-value="updateCategory"
    ></v-combobox>
    <v-btn
      v-if="category"
      class="home-container__button fade-in"
      variant="tonal"
      @click="handleButton"
    >
      Let's go!
    </v-btn>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

interface CategoryInterface {
  id: number
  name: string
}

export default defineComponent({
  name: 'HomeContainer',
  setup() {
    const category = ref('')
    const categories = ref([])
    const categoryCompleteList = ref([])

    const getCategories = async () => {
      fetch('https://opentdb.com/api_category.php')
        .then((res) => res.json())
        .then((data) => {
          const cats: string[] = []

          data.trivia_categories.map((el: CategoryInterface) => cats.push(el.name))

          categoryCompleteList.value = [...data.trivia_categories]
          categories.value = [...cats]
        })
        .catch((error) => console.log('error', error))
    }

    const updateCategory = async (cat: string): Promise<void> => {
      const selectedCategory = categoryCompleteList.value.filter(
        (category) => category.name === cat
      )
      const categoryID = selectedCategory[0].id

      console.log('UPDATE', categoryID)
      const url = `https://opentdb.com/api.php?amount=10&category=${categoryID}`
      try {
        const rawResponse = await fetch(url, {
          method: 'POST'
        })
        const res = await rawResponse.json()
        console.log('RES', res)
      } catch (error) {
        console.log('ERROPR', error)
      }
    }

    const handleButton = () => {
      console.log('CLICK')
    }

    getCategories()

    return {
      category,
      categories,

      updateCategory,
      handleButton
    }
  }
})
</script>

<style lang="sass" scoped>
@import '@/assets/animations.sass'
.home-container
  display: flex
  flex-direction: column
  padding-block: 1rem

  &__button
    width: fit-content
    place-self: center
</style>
