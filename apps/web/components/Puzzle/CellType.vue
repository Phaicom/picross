<script setup lang="ts">
import { CellTypes } from '@picross/shared'

const prop = defineProps<{
  cellType: CellTypes
}>()
</script>

<template>
  <div v-if="prop.cellType === CellTypes.Fill" h-full w-full bg-my-dark-violet-70 />
  <div v-else-if="prop.cellType === CellTypes.Cross" i-ph-x-bold text-my-red />
  <div v-else-if="prop.cellType === CellTypes.Circle" i-ph-circle-bold text-my-sky-blue />
</template>
