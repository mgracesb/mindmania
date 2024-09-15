<template>
  <div class="card-item">
    <img class="card-item__category" :src="Film" />
    <v-card>
      <slot name="append">
        <img class="card-item__icon" :src="getIcon(question.difficulty)" />
      </slot>
      <p class="card-item__text" v-html="question.question"></p>

      <div v-if="options" class="card-item__buttons">
        <v-btn
          v-for="option in options"
          :key="option"
          variant="outlined"
          :color="getColor(option)"
          :disabled="isTransitioning"
          @click="handleClick(option)"
        >
          {{ option }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { QuestionType } from '@/utils/types/Card.ts'

import HardIcon from '@/assets/icons/levels/hard.svg'
import MediumIcon from '@/assets/icons/levels/medium.svg'
import EasyIcon from '@/assets/icons/levels/easy.svg'
import Film from '@/assets/icons/categories/film.svg'

export default defineComponent({
  name: 'CardItem',
  props: {
    question: {
      type: Object as () => QuestionType,
      default: () => {}
    },
    isTransitioning: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const selected = ref(null)

    const getIcon = (data: string) => {
      if (data === 'hard') return HardIcon
      if (data === 'medium') return MediumIcon
      return EasyIcon
    }

    const handleClick = (data) => {
      selected.value = data.toLowerCase()

      if (data.toLowerCase() === props.question.correct_answer.toLowerCase()) {
        emit('next', data, true)
        return
      }

      emit('next', data)
    }

    const getColor = (data: string): string => {
      console.log('DATA', data)
      console.log('SEL', selected.value)
      const current = data.toLowerCase()
      if (props.isTransitioning && current === props.question.correct_answer.toLowerCase()) {
        return 'green'
      }

      if (
        props.isTransitioning &&
        selected.value === current &&
        current !== props.question.correct_answer.toLowerCase()
      ) {
        return 'red'
      }

      return 'gray'
    }
    const options = computed(() => {
      console.log('options', props)
      const list = [...props.question.incorrect_answers]
      list.push(props.question.correct_answer)

      for (let i = list.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1))
        ;[list[i], list[rand]] = [list[rand], list[i]]
      }

      return list
    })

    return {
      options,
      getIcon,
      getColor,
      Film,

      handleClick
    }
  }
})
</script>

<style lang="sass" scoped>
.card-item
  position: relative
  max-width: 360px
  @media (min-width: 800px)
    max-width: 500px
  &__text
    color: black
    font-size: 1.2rem
    padding-block-end: 2rem
    text-align: center
  &__icon
    position: absolute
    width: auto
    height: 1rem
    right: 1rem
    top: 1rem
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
