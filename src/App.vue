<template>
  <header class="header" :class="{ mini: routeIsQuiz }">
    <img alt="Vue logo" class="logo" :src="Logo" @click="goHome" />
    <div class="wrapper">
      <AppHeader />
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
import { defineComponent, computed, type ComputedRef } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import router from '@/router/index.ts'

import AppHeader from '@/components/AppHeader.vue'
import Logo from '@/assets/icons/logo.png'

export default defineComponent({
  name: 'App',
  components: { AppHeader, RouterView },
  setup() {
    const route = useRoute()

    const routeIsQuiz: ComputedRef<boolean> = computed(() => {
      return route.name === 'quiz'
    })

    const goHome = (): void => {
      router.push({ name: 'home' })
    }

    return {
      Logo,
      routeIsQuiz,

      goHome
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
