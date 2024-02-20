<script lang="ts" setup>
const puzzle = usePuzzleStore()
const settings = useSettingsStore()

const previewSizeStyle = computed(() => {
  const sizePerOneCell = settings.boardSize > 12 ? settings.boardSize / 5 : 12 / 5

  return {
    width: `${sizePerOneCell * puzzle.height * 0.25}rem`,
    height: `${sizePerOneCell * puzzle.width * 0.25}rem`,
  }
})
</script>

<template>
  <th h-full p-1>
    <div flex="~ col" bg-active :style="previewSizeStyle">
      <div v-for="(row, rowIndex) in puzzle.grid" :key="rowIndex" flex="~ 1 row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" :class="{ 'bg-cell': cell === 1 }" flex="~ 1" />
      </div>
    </div>
  </th>
</template>
