<script setup lang="ts">
const count = ref<number>(0)
</script>

<template>
  <div>
    <div flex="~ justify-center">
      <button px-4 py-1 @click="count++">
        {{ count }}
      </button>
    </div>
  </div>
</template>
