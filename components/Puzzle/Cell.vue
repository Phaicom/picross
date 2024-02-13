<script lang="ts" setup>
import type { Pointer } from '~/types'
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

const pointer = inject<Pointer>('pointer', { x: 0, y: 0, cellType: CellTypes.Fill })
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
const cellSizeClass = inject<string>('cellSizeClass', '')

function setCell() {
  cell.value = cell.value > 0 ? CellTypes.Empty : pointer.cellType
}

const width = inject<Ref<number>>('width', ref(5))
const height = inject<Ref<number>>('height', ref(5))
const borderClass = computed(() => {
  return {
    'border-cell-r': (prop.col + 1) % 5 === 0 && prop.col + 1 !== height.value,
    'border-cell-b': (prop.row + 1) % 5 === 0 && prop.row + 1 !== width.value,
  }
})

function onMouseEnter() {
  pointer.x = prop.col
  pointer.y = prop.row
}

const isMouseEnter = computed(() => (pointer.x === prop.col) && (pointer.y === prop.row))
</script>

<template>
  <td border="2 solid cell" relative p-0 text-center :class="[cellSizeClass, borderClass]" @click="setCell()" @mouseenter="onMouseEnter">
    <div v-show="isMouseEnter" border="3 tertiary" absolute class="h-[105%] w-[105%] keyframes-pulse animate-[pulse_2s_ease-in-out_infinite] -left-1px -top-1px" />
    <div h-full w-full :class="cellTypeClass" />
  </td>
</template>
