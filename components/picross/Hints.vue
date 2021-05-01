<template lang="pug">
div
  .hints-container(:class='{ left: isLeft }')
    .hints(v-for='(hint, i) in hintsReverse') 
      .hint(v-for='(h, j) in hint', :class='{ completed: checkHint(i, j) }') {{ h }}
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    hints: {
      type: Array as () => Array<number[][]>,
      required: true,
    },
    gridsAns: {
      type: Array as () => Array<number[][]>,
      required: true,
    },
    isLeft: {
      type: Boolean,
    },
  },
  setup(props) {
    const checkHint = (i: number, j: number) => {
      try {
        const gs = JSON.parse(JSON.stringify(props.gridsAns))

        if (gs[i].reverse()[j] === hintsReverse.value[i][j]) {
          return true
        } else {
          return false
        }
      } catch (error) {
        return false
      }
    }

    const hintsReverse = computed(() => {
      const hs = JSON.parse(JSON.stringify(props.hints))
      hs.forEach((h: number[]) => {
        h.reverse()
      })
      return hs
    })

    return {
      checkHint,
      hintsReverse,
    }
  },
})
</script>

<style lang="scss" scoped>
.hints-container {
  display: flex;
  justify-content: flex-end;
  margin: 0 0 5px 0 !important;

  .hints {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    width: 50px;

    .hint.completed {
      text-decoration: line-through;
      color: var(--tertiary-color);
    }
  }

  &.left {
    flex-direction: column;
    height: 100%;
    margin: 0 10px 0 0 !important;

    .hints {
      flex-direction: row-reverse !important;
      width: 100% !important;
      flex: 1 !important;
      justify-content: flex-start;

      .hint:not(:last-child) {
        margin-left: 10px;
      }
    }
  }
}
</style>
