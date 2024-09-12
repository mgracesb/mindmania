<template>
  <div class="header">
    <h1 class="header__title">mindmania</h1>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const count = ref(0)

    // expose to template and other options API hooks
    return {
      count
    }
  }
})
</script>

<style scoped>
h1 {
  text-align: center;
  color: #f4ebcf;
  text-shadow: -3px 3px 1px #eb492c;
}
</style>
