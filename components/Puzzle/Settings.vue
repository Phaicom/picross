<script lang="ts" setup>
const emit = defineEmits(['reset', 'generate'])
const show = ref(true)

const settings = defineModel('settings', { default: { width: 5, height: 5, boardSize: 'small' } })
</script>

<template>
  <div
    flex="~ col" bg="gray-100 dark:secondary" p="x-2 y-2" fixed right-6 top-25 select-none rounded
    :class="{ 'w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4': show }"
  >
    <div :class="show ? 'rotate-45' : 'rotate-0'" i-ph-plus cursor-pointer flex-self-end text-3xl transition-all @click="show = !show" />
    <!-- TODO: change size base on show variable inside v-show div -->
    <div v-show="show" p="x-1 y-2">
      <h1 primary text-2xl font-bold>
        Configs
      </h1>
      <div p="x-2 y-1" flex="~ col gap-3">
        <div flex="~ col gap-1">
          <h2 text-xl>
            Random Puzzle
          </h2>
          <div flex="~ row gap-4">
            <select
              v-model="settings.height" select-base
            >
              <option v-for="(d, index) in PUZZLE_DIMENSION" :key="index" :value="d">
                {{ d }}
              </option>
            </select>
            <span flex="~ items-center justify-center">X</span>
            <select v-model="settings.width" select-base>
              <option v-for="(d, index) in PUZZLE_DIMENSION" :key="index" :value="d">
                {{ d }}
              </option>
            </select>
            <button btn-secondary dark:btn-primary ml-auto @click="emit('generate')">
              Generate
            </button>
          </div>
        </div>
        <div flex="~ col gap-1">
          <h2 text-xl>
            Board Size
          </h2>
          <div>
            <select v-model="settings.boardSize" select-base>
              <option v-for="(size, index) in BOARD_SIZE" :key="index" :value="size.value">
                {{ size.text }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button btn-secondary dark:btn-primary ml-auto @click="emit('reset')">
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
