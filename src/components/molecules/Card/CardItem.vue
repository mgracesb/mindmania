<template>
  <div class="card-item">
    <v-card>
      <p class="card-item__text" v-html="question.question"></p>
      <p class="card-item__text">{{ question.difficulty }}</p>
      <p class="card-item__text">{{ question.category }}</p>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'CardItem',
  props: {
    question: { type: Array, default: () => [] }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="sass" scoped>
.card-item
  &__text
    color: blue
</style>
