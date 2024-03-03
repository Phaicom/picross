<script setup lang="ts">
import { CellTypes } from '@picross/shared'

const prop = defineProps<{
  cellType: CellTypes
}>()
</script>

<template>
  <div v-if="prop.cellType === CellTypes.Fill" h-full w-full bg-my-dark-blue />
  <i v-else-if="prop.cellType === CellTypes.Cross" i-ph-x-bold text="7 my-red" />
  <i v-else-if="prop.cellType === CellTypes.Circle" i-ph-circle-bold text="7 my-sky-blue" />
</template>
