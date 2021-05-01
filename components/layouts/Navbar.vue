<template lang="pug">
header
  .header
    .toggle-menu(@click='toggleMenu')
      i.fa.fa-bars
  nav#menu(:class='{ "--open": isOpen }')
    .toggle-menu(@click='toggleMenu')
      i.fa.fa-times
    ul
      li
        NuxtLink.lnk-menu(to='/') Home
      li
        a.lnk-menu(href='#', @click='setTheme("system")') System
      li
        a.lnk-menu(href='#', @click='setTheme("light")') Light
      li
        a.lnk-menu(href='#', @click='setTheme("dark")') Dark
      li
        a.lnk-menu(href='#', @click='setTheme("sepia")') Sepia
</template>
<script lang="ts">
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $colorMode } = useContext()
    const isOpen = ref(false)

    function setTheme(theme: string) {
      $colorMode.preference = theme
    }

    function toggleMenu() {
      isOpen.value = !isOpen.value
    }

    return {
      setTheme,
      toggleMenu,
      isOpen,
    }
  },
})
</script>

<style lang="scss" scoped>
@mixin transform($value) {
  transform: translate3d(0, 0, 0) $value;
}

@mixin transition($value) {
  transition: $value;
}

.fa {
  font-size: 2em;
  color: var(--primary-color);
  line-height: 40px;
}

.fa-times {
  color: var(--tertiary-color);
}

header {
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;

  .header {
    background: transparent;
    overflow: hidden;
    margin: 0 auto;

    // h1 {
    //   text-align: center;
    //   font-size: 2rem;
    //   color: var(--secondary-color);
    // }
  }
}

.toggle-menu {
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  position: fixed;
  z-index: 2;
  left: 10px;
  top: 10px;
}

#menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 150;
  width: 220px;
  height: 100%;
  padding-top: 60px;
  background: var(--bg-color);
  border-right: 1px solid rgba(255, 255, 255, 0.18);

  @include transform(translateX(-220px));
  @include transition(all 0.25s cubic-bezier(0.16, 0.63, 0.45, 0.98));

  &.--open {
    @include transform(translateX(0));
  }

  .toggle-menu {
    z-index: 3;
  }
}

.lnk-menu {
  display: block;
  margin: 0 10px;
  padding: 10px;
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    color: #399;
  }
}
</style>
