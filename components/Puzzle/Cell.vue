<script lang="ts" setup>
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

function setCell(cellType: CellTypes) {
  cell.value = cell.value > 0 ? CellTypes.Empty : cellType
}
</script>

<template>
  <td border="2 solid" h-50px w-50px rounded-lg text-center @click="setCell(CellTypes.Fill)">
    <div class="h-full w-full" :class="cellClass" />
  </td>
</template>
