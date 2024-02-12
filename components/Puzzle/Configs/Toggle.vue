<script lang="ts" setup>
const show = defineModel('show', { default: false })
</script>

<template>
  <div i-ph-plus text-3xl :class="show ? 'rotate-45' : 'rotate-0'" transition-all @click="show = !show" />
</template>
