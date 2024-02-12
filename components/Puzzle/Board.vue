<script lang="ts" setup>
import type { Hints } from '~/types'

const grid = defineModel<number[][]>('grid', { default: [] })
const hints = defineModel<Hints>('hints', { default: { row: [], col: [] } })
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
        <PuzzleCell v-for="(_, cellIndex) in row" :key="cellIndex" v-model:cell="row[cellIndex]" :row="rowIndex" :col="cellIndex" />
      </tr>
    </tbody>
  </table>
</template>
