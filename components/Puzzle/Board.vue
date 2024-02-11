<script lang="ts" setup>
const puzzle = usePuzzle()
puzzle.setup(5, 5)
const { grid, hints } = puzzle

onMounted(() => {
  puzzle.generate()
})
</script>

<template>
  <table mx-auto my-0 w-auto table-fixed>
    <thead>
      <tr>
        <PuzzlePreview :grid="grid" />
        <PuzzleHint v-for="(_, index) in hints.col" :key="index" v-model:hints="hints.col[index]" :is-row="false" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
        <PuzzleHint v-model:hints="hints.row[rowIndex]" :is-row="true" />
        <PuzzleCell v-for="(_, cellIndex) in row" :key="cellIndex" v-model:cell="row[cellIndex]" />
      </tr>
    </tbody>
  </table>
</template>
