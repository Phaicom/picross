<script lang="ts" setup>
defineProps({
  grid: {
    type: Array as () => number[][],
    default: () => [],
  },
})
</script>

<template>
  <th h-full w-50px p-1>
    <div flex="~ col" h-50px w-50px bg-active>
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" flex="~ 1 row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" :class="{ 'bg-cell': cell === 1 }" flex="~ 1" />
      </div>
    </div>
  </th>
</template>
