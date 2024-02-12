<script lang="ts" setup>
import type { Settings } from '~/types'
import { CellTypes } from '~/types'

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
</script>

<template>
  <td border="2 solid" rounded-lg text-center :class="boardSizeClass" @click="setCell(CellTypes.Fill)">
    <div class="h-full w-full" :class="cellClass" />
  </td>
</template>
