<script lang="ts" setup>
import { CellTypes } from '~/types'
import type { Hints, Pointer } from '~/types'

const grid = defineModel<number[][]>('grid', { default: [] })
const hints = defineModel<Hints>('hints', { default: { row: [], col: [] } })
const pointer = defineModel<Pointer>('pointer', { default: { x: 0, y: 0, cellType: CellTypes.Fill } })
</script>

<template>
  <table w-auto table-fixed>
    <thead>
      <tr>
        <PuzzlePreview :grid="grid" />
        <PuzzleHint v-for="(_, index) in hints.col" :key="index" v-model:hints="hints.col[index]" :is-row="false" :class="{ 'bg-hint': index % 2 === 0, '!bg-hint-focus': pointer.x === index }" rounded-t-2xl />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
        <PuzzleHint v-model:hints="hints.row[rowIndex]" :is-row="true" :class="{ 'bg-hint': rowIndex % 2 === 0, '!bg-hint-focus': pointer.y === rowIndex }" rounded-l-2xl />
        <PuzzleCell v-for="(_, cellIndex) in row" :key="cellIndex" v-model:cell="row[cellIndex]" :row="rowIndex" :col="cellIndex" />
      </tr>
    </tbody>
  </table>
</template>
