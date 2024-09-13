<template>
  <header class="header" :class="{ mini: routeIsQuiz }">
    <img alt="Vue logo" class="logo" src="@/assets/icons/logo.png" />
    <div class="wrapper">
      <AppHeader />
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'

export default defineComponent({
  name: 'App',
  components: { AppHeader, RouterView },
  setup() {
    const route = useRoute()

    const routeIsQuiz = computed(() => {
      return route.name === 'quiz'
    })

    return {
      routeIsQuiz
    }
  }
})
</script>

<style lang="sass" scoped>
header
  line-height: 1.5
  max-height: 100vh
  display: flex
  flex-direction: column
  justify-content: center
  .logo
    display: block
    margin: 1rem auto
    height: 100px
    width: auto
  &.mini
    flex-direction: row
    align-items: flex-start
    .logo
      margin: 0
      margin-right: 1rem
      height: 50px
</style>
