<template>
  <main>
    <HomeContainer />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeContainer from '@/components/organisms/Home/HomeContainer.vue'

export default defineComponent({
  name: 'HomeView',
  components: { HomeContainer },
  setup() {}
})
</script>
