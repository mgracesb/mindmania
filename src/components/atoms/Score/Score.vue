<template>
  <div class="score">
    <p class="score-number score--correct">{{ correct }}</p>
    /
    <p class="score-number score--total">{{ total }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScoreComp',
  props: {
    correct: { type: Number, default: null },
    total: { type: Number, default: null }
  }
})
</script>

<style lang="sass" scoped>
.score
  padding: 5px
  display: flex
  flex-direction: row
  justify-content: flex-end
  color: #191919
  &--correct
    color: green
  &--total
    color: #191919
</style>
