<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="auto" height="100" />

    <div class="wrapper">
      <AppHeader />
    </div>
  </header>

  <RouterView>
    <HomeView />
  </RouterView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { RouterView } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import HomeView from '@/views/HomeView.vue'

export default defineComponent({
  name: 'App',
  components: { AppHeader, HomeView, RouterView },
  setup() {
    return {}
  }
})
</script>

<style lang="sass" scoped>
header
  line-height: 1.5
  max-height: 100vh

.logo
  display: block
  margin: 1rem auto

nav
  width: 100%
  font-size: 12px
  text-align: center
  margin-top: 2rem
  a.router-link-exact-active
    color: var(--color-text)
    &:hover
      background-color: transparent
  a
    display: inline-block
    padding: 0 1rem
    border-left: 1px solid var(--color-border)
    &:first-of-type
      border: 0
</style>
