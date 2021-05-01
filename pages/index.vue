<template lang="pug">
.container
  PicrossBase(:answer='answer')
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const answer = ref<number[][]>([[]])

    onMounted(() => {
      const ans = [
        [1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 1, 1],
      ]
      answer.value = ans
    })

    return {
      answer,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .title {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 2rem;
  }
}
</style>
