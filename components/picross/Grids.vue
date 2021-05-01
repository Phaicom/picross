<template lang="pug">
.grids-container
  .grids-wrapper
    .grids(v-for='(col, i) in grids')
      .grid(
        v-for='(row, j) in col',
        @click='selectBox(i, j)',
        :class='{ "win-selected": row === 1 && isWin, selected: row === 1 && !isWin, cross: row === 2, guess: row === 3, hover: isHover[0] === i && isHover[1] === j && !isWin, "hover-related": (isHover[0] === i || isHover[1] === j) && !isWin }',
        @mouseover='mouseOver(i, j)'
      )
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { convert } from '@/utils/picross'

export default defineComponent({
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    selector: {
      type: String,
      required: true,
    },
    isClear: {
      type: Boolean,
      required: true,
    },
    isWin: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const grids = ref()
    const isHover = ref([0, 0])

    onMounted(() => {
      setGrids()
    })

    const setGrids = () => {
      grids.value = Array.from({ length: props.width }, () =>
        Array.from({ length: props.height }, () => 0)
      )
      emit('grids', convert(grids.value))
    }

    const selectBox = (col: number, row: number) => {
      if (props.isWin) {
        return
      }

      if (grids.value[col][row]) {
        grids.value[col][row] = 0
      } else if (props.selector === 'cross') {
        grids.value[col][row] = 2
      } else if (props.selector === 'guess') {
        grids.value[col][row] = 3
      } else {
        grids.value[col][row] = 1
      }

      grids.value = [...grids.value]
      emit('grids', convert(grids.value))
    }

    const mouseOver = (col: number, row: number) => {
      isHover.value = [col, row]
    }

    const showAnswer = () => {
      grids.value = convert(grids.value)
    }

    return {
      grids,
      setGrids,
      selectBox,
      isHover,
      mouseOver,
      showAnswer,
    }
  },
  watch: {
    width() {
      this.setGrids()
    },
    height() {
      this.setGrids()
    },
    isClear() {
      this.setGrids()
    },
    isWin() {
      this.showAnswer()
    },
  },
})
</script>

<style lang="scss" scoped>
.grids-container {
  margin: 0 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  flex-direction: column;

  .grids {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: row;

    &:first-child {
      border: 1px solid var(--primary-color);
    }

    &:nth-child(n + 1) {
      border-left: 1px solid var(--primary-color);
      border-right: 1px solid var(--primary-color);
      border-bottom: 1px solid var(--primary-color);
    }

    &:nth-child(6n) {
      border-top: 1px solid var(--primary-color);
    }

    .grid {
      width: 40px;
      height: 40px;
      position: relative;
      transition: all 0.2s ease;

      &:not(:last-child) {
        border-right: 1px solid var(--primary-color);
      }

      &:nth-child(6n) {
        border-left: 1px solid var(--primary-color);
      }

      &.win-selected {
        background-color: #94d6f3 !important;
      }

      &.selected {
        background-color: var(--primary-color) !important;
      }

      &.cross {
        background-color: inherit !important;

        &::before,
        &::after {
          content: ' ';
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          top: 50%;
          background-color: lightcoral;
        }

        &::before {
          transform: rotate(45deg);
        }

        &::after {
          transform: rotate(-45deg);
        }
      }

      &.guess {
        background-color: inherit !important;

        &::after {
          content: ' ';
          position: absolute;
          width: 80%;
          height: 80%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid steelblue;
          border-radius: 50%;
        }
      }

      &.hover-related {
        background-color: #fbcccc;

        @include media('<=phone') {
          background-color: transparent;
        }
      }

      &.hover {
        background-color: #ffa5b0;

        @include media('<=phone') {
          background-color: transparent;
        }
      }
    }
  }
}
</style>
