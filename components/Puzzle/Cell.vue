<script lang="ts" setup>
import type { Settings } from '~/types'
import { CellTypes } from '~/types'

const prop = defineProps({
  row: {
    type: Number,
    default: 0,
  },
  col: {
    type: Number,
    default: 0,
  },
})

const cell = defineModel<CellTypes>('cell', { default: 0 })
const cellClass = computed(() => {
  switch (cell.value) {
    case CellTypes.Fill:
      return 'bg-cell'
    case CellTypes.Cross:
      return 'i-ph:x-light'
    case CellTypes.Circle:
      return 'i-ph:circle-light'

    default:
      return ''
  }
})
const settings = inject<Settings>('settings', { width: 5, height: 5, boardSize: 12 })
const boardSizeClass = computed(() => `h-${settings.boardSize} w-${settings.boardSize}`)

function setCell(cellType: CellTypes) {
  cell.value = cell.value > 0 ? CellTypes.Empty : cellType
}

const width = inject<Ref<number>>('width', ref(5))
const height = inject<Ref<number>>('height', ref(5))
const borderClass = computed(() => {
  return {
    'border-cell-r': (prop.col + 1) % 5 === 0 || prop.col + 1 === height.value,
    'border-cell-b': (prop.row + 1) % 5 === 0 || prop.row + 1 === width.value,
    'border-cell-t': prop.row === 0,
    'border-cell-l': prop.col === 0,
  }
})
</script>

<template>
  <td border="2 solid cell" rounded-lg text-center :class="[boardSizeClass, borderClass]" @click="setCell(CellTypes.Fill)">
    <div class="h-full w-full" :class="cellClass" />
  </td>
</template>
