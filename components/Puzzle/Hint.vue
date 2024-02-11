<script lang="ts" setup>
import type { Hint } from '~/types'

defineProps({
  isRow: Boolean,
})

const hints = defineModel<Hint[]>('hints', { default: [] })
</script>

<template>
  <th :class="{ 'align-bottom': !isRow }">
    <div flex="~ items-center" :class="isRow ? 'flex-row justify-end gap-2 pr-2' : 'flex-col justify-start'">
      <div v-for="(hint, index) in hints" :key="index">
        {{ hint.value }}
      </div>
    </div>
  </th>
</template>
