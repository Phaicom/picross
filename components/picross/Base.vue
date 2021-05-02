<template lang="pug">
.base-container
  .score-time(:class='{ "huge-board": width > 5 }')
    .score-time-wrapper
      h3 Timer
        span.timer {{ timer }}
      h3 Records
      .records
        div(v-for='(record, i) in records', v-if='records.length') {{ i + 1 + ": " + record }}
        div(v-if='!records.length') -
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
  computed,
} from '@nuxtjs/composition-api'
import { generateHint, reverseRowToColumn } from '@/utils/picross'
import { DateTime } from 'luxon'

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
    const date = ref<DateTime>(DateTime.fromISO('2016-05-25'))
    const records = ref<string[]>([])
    // eslint-disable-next-line no-undef
    const interval = ref()

    const timer = computed(() => {
      return date.value.toFormat('mm:ss')
    })

    const setTimer = () => {
      date.value = DateTime.fromISO('2016-05-25')
    }

    const startTimer = async () => {
      interval.value = await setInterval(function () {
        date.value = date.value.plus({ seconds: 1 })
      }, 1000)
    }

    const clearTimer = () => {
      clearInterval(interval.value)
    }

    const addRecord = () => {
      records.value.push(timer.value)
    }

    const changeSelector = (s: string) => {
      selector.value = s
    }

    const clearGrids = () => {
      isClear.value = !isClear.value
      clearTimer()
      setTimer()
      startTimer()
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
      timer,
      clearTimer,
      records,
      setTimer,
      startTimer,
      addRecord,
    }
  },
  watch: {
    answer() {
      this.setupGrids()
    },
    isWin(isWin) {
      if (isWin) {
        this.addRecord()
        this.clearTimer()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.base-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .score-time {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100%;
    left: -33%;
    padding-top: 23%;
    font-size: 12px;

    &.huge-board {
      left: -25%;
    }

    .score-time-wrapper {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(4px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
      padding: 20px 10px;
      overflow: hidden;

      & > *:not(:first-child) {
        padding-top: 5px;
      }

      .timer {
        margin-left: 5px;
        color: var(--secondary-color);
      }

      .records {
        display: flex;
        flex-direction: column-reverse;

        & > div:not(:last-child) {
          padding-top: 1px;
        }
      }
    }
  }

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
