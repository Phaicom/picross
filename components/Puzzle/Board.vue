<script lang="ts" setup>
const puzzle = usePuzzleStore()
const hints = useHintsStore()
const pointer = usePointerStore()
</script>

<template>
  <table w-auto table-fixed>
    <thead>
      <tr>
        <PuzzlePreview />
        <PuzzleHint v-for="(_, index) in hints.col" :key="index" v-model:hints="hints.col[index]" :is-row="false" :class="{ 'bg-hint': index % 2 === 0, '!bg-hint-focus': pointer.row === index }" rounded-t-2xl />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in puzzle.grid" :key="rowIndex">
        <PuzzleHint v-model:hints="hints.row[rowIndex]" :is-row="true" :class="{ 'bg-hint': rowIndex % 2 === 0, '!bg-hint-focus': pointer.col === rowIndex }" rounded-l-2xl />
        <PuzzleCell v-for="(_, cellIndex) in row" :key="cellIndex" v-model:cell="row[cellIndex]" :row="rowIndex" :col="cellIndex" />
      </tr>
    </tbody>
  </table>
</template>
