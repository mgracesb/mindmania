<template>
  <div class="card-item">
    <img class="card-item__category" :src="Film" />
    <v-card>
      <slot name="append">
        <img class="card-item__icon" :src="getIcon(question.difficulty)" />
      </slot>
      <p class="card-item__text" v-html="question.question"></p>

      <div v-if="options" class="card-item__buttons">
        <v-btn v-for="option in options" :key="option" variant="outlined">
          {{ option }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import HardIcon from '@/assets/icons/levels/hard.svg'
import Film from '@/assets/icons/categories/film.svg'

export default defineComponent({
  name: 'CardItem',
  props: {
    question: { type: Array, default: () => [] }
  },
  setup(props) {
    const options = ref(null)

    const getIcon = (data: string) => {
      return HardIcon
    }

    const shuffle = () => {
      const list = [...props.question.incorrect_answers]
      list.push(props.question.correct_answer)

      for (let i = list.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1))
        ;[list[i], list[rand]] = [list[rand], list[i]]
      }

      options.value = list
    }

    shuffle()

    return {
      options,
      getIcon,
      Film
    }
  }
})
</script>

<style lang="sass" scoped>
.card-item
  position: relative
  &__text
    color: black
    font-size: 1.2rem
    padding-block-end: 2rem
    text-align: center
  &__icon
    position: absolute
    width: 1.8rem
    height: 1.8rem
    right: 8px
    top: 8px
  &__buttons
    display: flex
    flex-wrap: wrap
    gap: 5px
    > button
      flex-basis: 100% !important
  &__category
    position: absolute
    top: -2.5rem
    left: -1rem
    height: 6rem
    width: auto
    transform: rotate(-25deg)
    filter: drop-shadow(4px 8px 6px black)
    z-index: 2
</style>
