<template lang="pug">
button(:class='{ selected: selected, checkbox: checkbox }')
  h2
    slot.text
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    selected: {
      type: Boolean,
    },
    checkbox: {
      type: Boolean,
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
  color: var(--primary-color);
  padding: 5px 20px;
  transition: all 0.2s ease;
  user-select: none;

  &.checkbox {
    color: gray;
  }

  &:hover,
  &.selected {
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.17);
    background: var(--bg-color);
    color: var(--primary-color);
    backdrop-filter: unset;
  }

  &:active {
    box-shadow: none;
  }
}
</style>
