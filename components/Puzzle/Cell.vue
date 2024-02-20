<script lang="ts" setup>
import { CellTypes } from '~/types/puzzle'

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

const puzzle = usePuzzleStore()
const pointer = usePointerStore()
const settings = useSettingsStore()

const cell = defineModel<CellTypes>('cell', { default: 0 })

const cellTypeClass = computed(() => {
  switch (cell.value) {
    case CellTypes.Fill:
      return 'bg-cell'
    case CellTypes.Cross:
      return 'i-ph:x-light text-red'
    case CellTypes.Circle:
      return 'i-ph:circle-light text-blue'

    default:
      return ''
  }
})

const cellSizeClass = computed(() => `h-${settings.boardSize} w-${settings.boardSize}`)

const borderClass = computed(() => {
  return {
    'border-cell-r': (prop.col + 1) % 5 === 0 && prop.col + 1 !== puzzle.height,
    'border-cell-b': (prop.row + 1) % 5 === 0 && prop.row + 1 !== puzzle.width,
  }
})

const isMouseEnter = computed(() => (pointer.row === prop.col) && (pointer.col === prop.row))

function setCell() {
  cell.value = cell.value > 0 ? CellTypes.Empty : pointer.cellType
}

function onMouseEnter() {
  pointer.row = prop.col
  pointer.col = prop.row
}
</script>

<template>
  <td border="2 solid cell" relative p-0 text-center :class="[cellSizeClass, borderClass]" @click="setCell()" @mouseenter="onMouseEnter">
    <div v-show="isMouseEnter" border="3 tertiary" absolute class="h-[105%] w-[105%] keyframes-pulse animate-[pulse_2s_ease-in-out_infinite] -left-1px -top-1px" />
    <div h-full w-full :class="cellTypeClass" />
  </td>
</template>
