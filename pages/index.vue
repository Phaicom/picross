<template lang="pug">
.container
  .base-header
    h1.title Picross
    h3.sub-title(v-show='isWin') You're the WINNER!! 😍✨🔥
  .generate 
    CommonButton(@click.native='generate(5, 5)') 5 x 5
    CommonButton(@click.native='generate(10, 5)') 10 x 5
    CommonButton(@click.native='generate(10, 10)') 10 x 10
  PicrossBase(:answer='answer', @isWin='onIsWin')
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const answer = ref<number[][]>([[]])
    const isWin = ref(false)

    onMounted(() => {
      generate(5, 5)
    })

    const onIsWin = (iw: boolean) => {
      isWin.value = iw
    }

    const generate = (r: number, c: number) => {
      const grids = []
      for (let i = 0; i < c; i++) {
        const row = []
        for (let j = 0; j < r; j++) {
          const oneOrZero = Math.random() >= 0.5 ? 1 : 0
          row.push(oneOrZero)
        }
        grids.push(row)
      }
      answer.value = grids
    }

    return {
      answer,
      onIsWin,
      isWin,
      generate,
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
  flex-direction: column;
  padding-bottom: 50px;

  .base-header {
    margin: 50px 0 20px 0;
  }

  .generate {
    margin-bottom: 30px;
    display: flex;

    & > * {
      font-size: 10px !important;
    }

    & > button {
      margin-right: 5px;
    }
  }
}
</style>
