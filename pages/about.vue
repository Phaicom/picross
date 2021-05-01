<template lang="pug">
.container
  div
    Logo
    h1.title orga-board
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    .links
      a.button--green(
        href='https://nuxtjs.org/',
        target='_blank',
        rel='noopener noreferrer'
      ) Documentation
      a.button--grey(
        href='https://github.com/nuxt/nuxt.js',
        target='_blank',
        rel='noopener noreferrer'
      ) GitHub
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .title {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 2rem;
  }
}
</style>
