<script lang="ts" setup>
import type { Settings } from '~/types'

defineProps({
  grid: {
    type: Array as () => number[][],
    default: () => [],
  },
})

const previewSizeStyle = inject<string>('previewSizeStyle', '')
</script>

<template>
  <th h-full p-1>
    <div flex="~ col" bg-active :style="previewSizeStyle">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" flex="~ 1 row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" :class="{ 'bg-cell': cell === 1 }" flex="~ 1" />
      </div>
    </div>
  </th>
</template>
