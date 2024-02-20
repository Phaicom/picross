<script setup lang="ts">
const pointer = usePointerStore()
</script>

<template>
  <div flex="~ row gap-4">
    <div v-for="(type, index) in CELL_TYPES.slice(1)" :key="index" border="1 base" flex="~ col" relative h-12 w-12 cursor-pointer bg-base @click="pointer.cellType = type.value">
      <div :class="type.text" h-full w-full />
      <div class="left-1/2 -bottom-8 -translate-x-1/2 -translate-y-1/2" absolute transform :class="pointer.cellType === type.value ? 'i-ph:circle-fill' : 'i-ph:circle' " />
    </div>
  </div>
</template>
