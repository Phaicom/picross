<template lang="pug">
header.header.header-fixed
  .navbar.container
    .logo
      a(href='#home') LOGO
    input#navbar-toggle(type='checkbox')
    label(for='navbar-toggle')
      i
    nav.menu
      ul
        li 
          a(href='#home') Home
        li 
          a(href='#about') About
        li 
          a(href='#portfolio') Portfolio
        li 
          a(href='#contacts') Contacts
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style lang="scss" scoped>
.header-fixed {
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100%;
  background-color: rgba(21, 21, 21, 1);
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.1);

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    line-height: 60px;

    .logo {
      flex: 3;

      a {
        display: block;
        font-size: 30px;
        font-weight: bold;
        color: #fff;
        text-decoration: none;

        &:hover {
          color: #777;
        }
      }
    }

    nav {
      flex: 8;

      @include media('<tablet') {
        visibility: hidden;
        opacity: 0;
        z-index: 2;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: table;
        background: #ddd;
      }

      ul {
        margin: 0;
        padding: 20px 0;
        display: table-cell;
        vertical-align: middle;

        @include media('>=tablet') {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: space-around;
          text-align: center;
          list-style: none;
          vertical-align: unset;
        }

        li {
          @include media('<tablet') {
            display: block;
            text-align: center;
            padding: 20px 0;
            font-size: 50px;
            min-height: 50px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease-out;
          }

          @include media('>=tablet') {
            flex: 1;

            &.active {
              background: #555;
            }

            &:hover {
              background: #333;
            }
          }

          a {
            color: #212121;

            @include media('>=tablet') {
              display: block;
              padding: 0 8px;
              font-size: 16px;
              line-height: 60px;
              color: #fff;
              text-decoration: none;
            }
          }

          &:hover {
            background: #212121;

            a {
              color: #fff;
              transition: all 0.3s ease-out;
            }
          }
        }
      }
    }

    label {
      user-select: none;
      cursor: pointer;
      padding: 28px 20px;
      position: relative;
      z-index: 3;

      @include media('>=tablet') {
        display: none;
      }

      i {
        height: 2px;
        position: relative;
        transition: background 0.2s ease-out;
        width: 18px;
        font-style: normal;
        font-weight: normal;
        display: block;
        background: #eee;

        &::before,
        &::after {
          content: '';
          height: 100%;
          position: absolute;
          transition: all 0.2s ease-out;
          width: 100%;
          display: block;
          background: #eee;
        }

        &::before {
          top: 5px;
        }

        &::after {
          top: -5px;
        }
      }
    }
  }

  #navbar-toggle {
    display: none;

    &:checked {
      & ~ .menu {
        visibility: visible;
        opacity: 0.99;
        transition: all 0.3s ease-out;
      }

      & ~ label {
        background: #212121;
        border-radius: 50%;

        i {
          background: transparent;

          &::before {
            transform: rotate(-45deg);
          }

          &::after {
            transform: rotate(45deg);
          }
        }
      }

      & ~ label:not(.steps) i {
        &::before,
        &::after {
          top: 0;
        }
      }
    }
  }
}
</style>
