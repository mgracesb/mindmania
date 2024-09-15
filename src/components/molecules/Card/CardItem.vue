<template>
  <div class="card-item">
    <img class="card-item__category" :src="getCategory(question.category)" />
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
      <div v-if="isTransitioning" class="loader">
        <v-progress-linear color="teal" indeterminate></v-progress-linear>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { type QuestionType } from '@/utils/types/Card'

import HardIcon from '@/assets/icons/levels/hard.svg'
import MediumIcon from '@/assets/icons/levels/medium.svg'
import EasyIcon from '@/assets/icons/levels/easy.svg'

import AnimalsIcon from '@/assets/icons/categories/animals.svg'
import ArtIcon from '@/assets/icons/categories/art.svg'
import BoardIcon from '@/assets/icons/categories/boardgames.svg'
import BooksIcon from '@/assets/icons/categories/books.svg'
import CartoonIcon from '@/assets/icons/categories/cartoon.svg'
import CelebIcon from '@/assets/icons/categories/celebrities.svg'
import ComicsIcon from '@/assets/icons/categories/comics.svg'
import FilmIcon from '@/assets/icons/categories/film.svg'
import GadgetsIcon from '@/assets/icons/categories/gadgets.svg'
import GenIcon from '@/assets/icons/categories/knowledge.svg'
import GeoIcon from '@/assets/icons/categories/geography.svg'
import HistoryIcon from '@/assets/icons/categories/history.svg'
import MangaIcon from '@/assets/icons/categories/manga.svg'
import MathsIcon from '@/assets/icons/categories/mathematics.svg'
import MusicIcon from '@/assets/icons/categories/music.svg'
import MythIcon from '@/assets/icons/categories/mythology.svg'
import NatureIcon from '@/assets/icons/categories/nature.svg'
import PCIcon from '@/assets/icons/categories/computers.svg'
import PoliticsIcon from '@/assets/icons/categories/politics.svg'
import SportsIcon from '@/assets/icons/categories/sports.svg'
import TheatreIcon from '@/assets/icons/categories/theatre.svg'
import TVIcon from '@/assets/icons/categories/television.svg'
import VehiclesIcon from '@/assets/icons/categories/vehicles.svg'
import VideoIcon from '@/assets/icons/categories/videogames.svg'

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
    const selected = ref<string>('')

    const getIcon = (data: string): string => {
      if (data === 'hard') return HardIcon
      if (data === 'medium') return MediumIcon
      return EasyIcon
    }

    const getCategory = (data: string): string => {
      if (data.toLowerCase().includes('general')) return GenIcon
      if (data.toLowerCase().includes('film')) return FilmIcon
      if (data.toLowerCase().includes('books')) return BooksIcon
      if (data.toLowerCase().includes('theatres')) return TheatreIcon
      if (data.toLowerCase().includes('music')) return MusicIcon
      if (data.toLowerCase().includes('television')) return TVIcon
      if (data.toLowerCase().includes('video')) return VideoIcon
      if (data.toLowerCase().includes('board')) return BoardIcon
      if (data.toLowerCase().includes('nature')) return NatureIcon
      if (data.toLowerCase().includes('computers')) return PCIcon
      if (data.toLowerCase().includes('mathematics')) return MathsIcon
      if (data.toLowerCase().includes('mythology')) return MythIcon
      if (data.toLowerCase().includes('sports')) return SportsIcon
      if (data.toLowerCase().includes('geography')) return GeoIcon
      if (data.toLowerCase().includes('history')) return HistoryIcon
      if (data.toLowerCase().includes('politics')) return PoliticsIcon
      if (data.toLowerCase().includes('celeb')) return CelebIcon
      if (data.toLowerCase().includes('animals')) return AnimalsIcon
      if (data.toLowerCase().includes('vehicles')) return VehiclesIcon
      if (data.toLowerCase().includes('comics')) return ComicsIcon
      if (data.toLowerCase().includes('gadgets')) return GadgetsIcon
      if (data.toLowerCase().includes('manga')) return MangaIcon
      if (data.toLowerCase().includes('cartoon')) return CartoonIcon
      if (data.toLowerCase().includes('art')) return ArtIcon

      return GenIcon
    }

    const handleClick = (data: string): void => {
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
      getCategory,
      getColor,
      getIcon,
      options,

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

.loader
  position: absolute
  bottom: 2px
  z-index: 2
  height: 2px
  width: 100%
  left: 0
</style>
