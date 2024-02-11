<script lang="ts" setup>
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <button rounded p2 hover="bg-active" @click="toggleColorMode">
    <div i-ph-sun-dim-duotone dark:i-ph-moon-stars-duotone text-3xl />
  </button>
</template>
