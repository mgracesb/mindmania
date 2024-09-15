<template>
  <div class="completed-score">
    <div class="completed-score__wrapper">
      <img :src="SuccessIcon" class="completed-score__image" />
      <div class="completed-score__content">
        <span class="completed-score__text completed-number">{{ correct }}</span>
        <span class="completed-score__text--default"> out of </span>
        <span class="completed-score__text completed-number">{{ total }}</span>
      </div>
      <v-btn @click="goHome">Go back</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router/index.ts'

import SuccessIcon from '@/assets/icons/success.svg'

export default defineComponent({
  name: 'CompletedItem',
  props: {
    correct: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  setup() {
    const goHome = () => {
      router.push({ name: 'home' })
    }
    
    return {
      SuccessIcon,
      goHome
    }
  }
})
</script>

<style lang="sass" scoped>
.completed-score
  width: 100%
  height: 100%
  &__wrapper
    width: 100%
    height: calc(100vh - 300px)
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
  &__content
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
  &__image
    width: 150px
  &__text
    padding-right: 1rem
    &--default
      color: #f7f7f7
      font-size: 2rem
      padding-right: 0.5rem
</style>
