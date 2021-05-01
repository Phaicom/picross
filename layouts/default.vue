<template lang="pug">
div
  .layout-container(:style='style')
    Navbar
    .white-gradient
    main
      Nuxt
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  useContext,
  ref,
  watchEffect,
} from '@nuxtjs/composition-api'
import Navbar from '@/components/layouts/Navbar.vue'

export default defineComponent({
  components: {
    Navbar,
  },
  setup() {
    const { $colorMode } = useContext()
    const styles = inject('$themes')
    const style = ref(null)

    watchEffect(() => {
      if ($colorMode.value === 'system') {
        style.value = styles.light
      } else {
        style.value = styles[$colorMode.value]
      }
    })

    return {
      style,
    }
  },
})
</script>

<style lang="scss">
$primary-color: var(--primary-color);
$secondary-color: var(--secondary-color);
$tertiary-color: var(--tertiary-color);
$bg-color: var(--bg-color);

html {
  font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-x: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #fff;
  color: #383a42;
}

.layout-container {
  background: linear-gradient(
    90deg,
    rgba(151, 213, 243, 1) 0%,
    rgba(254, 161, 174, 1) 100%
  );
  color: $primary-color;

  h1 {
    color: $secondary-color;
    font-family: 'Josefin Sans', Roboto, sans-serif;
  }

  a {
    color: $primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  main {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;

    & > * {
      width: 80%;

      @include media('>desktop') {
        max-width: calc(1024px * 0.8);
      }
    }
  }

  .white-gradient {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
