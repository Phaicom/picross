<script lang="ts" setup>
import type { Settings } from '~/types'

defineProps({
  grid: {
    type: Array as () => number[][],
    default: () => [],
  },
})

const width = inject<Ref<number>>('width', ref(5))
const height = inject<Ref<number>>('height', ref(5))
const settings = inject<Settings>('settings', { width: 5, height: 5, boardSize: 12 })
const boardSizeStyle = computed(() => {
  const sizePerOneCell = settings.boardSize > 12 ? settings.boardSize / 5 : 12 / 5

  return {
    width: `${sizePerOneCell * height.value * 0.25}rem`,
    height: `${sizePerOneCell * width.value * 0.25}rem`,
  }
})
</script>

<template>
  <th h-full p-1>
    <div flex="~ col" bg-active :style="boardSizeStyle">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" flex="~ 1 row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" :class="{ 'bg-cell': cell === 1 }" flex="~ 1" />
      </div>
    </div>
  </th>
</template>
