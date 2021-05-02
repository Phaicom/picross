<template lang="pug">
.base-container
  .selector-group
    CommonButton(
      @click.native='changeSelector("select")',
      :selected='selector === "select"',
      :checkbox='true'
    ) Select
    CommonButton(
      @click.native='changeSelector("guess")',
      :selected='selector === "guess"',
      :checkbox='true'
    ) Guess
    CommonButton(
      @click.native='changeSelector("cross")',
      :selected='selector === "cross"',
      :checkbox='true'
    ) Mark
    CommonButton(@click.native='clearGrids') Clear
  .hint-grids
    PicrossHints(
      :hints='getHint(false, answer)',
      :gridsAns='getHintGrids(false)'
    )
    .picross-body
      PicrossHints(
        :hints='getHint(true, answer)',
        :isLeft='true',
        :gridsAns='getHintGrids(true)'
      )
      PicrossGrids(
        :width='width',
        :height='height',
        :selector='selector',
        :isClear='isClear',
        :isWin='isWin',
        @grids='onGrids'
      )
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  watchEffect,
} from '@nuxtjs/composition-api'
import { generateHint, reverseRowToColumn } from '@/utils/picross'

export default defineComponent({
  props: {
    answer: {
      type: Array as () => Array<number[][]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const width = ref(0)
    const height = ref(0)
    const selector = ref('select')
    const isClear = ref(false)
    const isWin = ref(false)
    const grids = ref<number[][]>([[]])

    const changeSelector = (s: string) => {
      selector.value = s
    }

    const clearGrids = () => {
      isClear.value = !isClear.value
    }

    const onGrids = (g: unknown) => {
      if (g) {
        grids.value = g as number[][]
      }
    }

    const check = () => {
      const arr1 = JSON.stringify(grids.value)
      const arr2 = JSON.stringify(props.answer)
      isWin.value = arr1 === arr2
      emit('isWin', isWin.value)
    }

    const setupGrids = () => {
      clearGrids()
      width.value = props.answer.length
      height.value = props.answer[0].length
    }

    const getHint = (isLeft: boolean, data: number[][]) => {
      if (isLeft) {
        return generateHint(data)
      } else {
        return generateHint(reverseRowToColumn(data))
      }
    }

    const getHintGrids = (isLeft: boolean) => {
      return getHint(isLeft, grids.value)
    }

    onMounted(() => {
      setupGrids()
    })

    watchEffect(() => {
      check()
    })

    return {
      selector,
      changeSelector,
      isClear,
      clearGrids,
      onGrids,
      check,
      width,
      height,
      setupGrids,
      getHint,
      getHintGrids,
      isWin,
    }
  },
  watch: {
    answer() {
      this.setupGrids()
    },
  },
})
</script>

<style lang="scss" scoped>
.base-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .selector-group {
    margin-bottom: 20px;

    & > button:not(:last-child) {
      margin-right: 10px;
    }
  }

  .check-button {
    margin-top: 20px;
  }

  .hint-grids {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: max-content;

    & > * {
      display: flex;
      width: auto;
      justify-content: flex-end;
    }

    .picross-body {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
}
</style>
