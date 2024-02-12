<script lang="ts" setup>
const emit = defineEmits(['reset', 'generate'])
const show = ref(true)

const settings = defineModel('settings', { default: { width: 5, height: 5, boardSize: 'small' } })
</script>

<template>
  <div
    absolute right-4 top-4 rounded bg-gray-100 px2 py2 flex="~ col"
    :class="{ 'w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4': show }"
  >
    <div :class="show ? 'rotate-45' : 'rotate-0'" i-ph-plus flex-self-end text-3xl transition-all @click="show = !show" />
    <!-- TODO: change size base on show variable inside v-show div -->
    <div v-show="show" px1 py2>
      <h1>Configs</h1>
      <div>
        <h2>Random Puzzle</h2>
        <div>
          <select v-model="settings.height">
            <option v-for="(d, index) in PUZZLE_DIMENSION" :key="index" :value="d">
              {{ d }}
            </option>
          </select>
          <span>X</span>
          <select v-model="settings.width">
            <option v-for="(d, index) in PUZZLE_DIMENSION" :key="index" :value="d">
              {{ d }}
            </option>
          </select>
          <button @click="emit('generate')">
            Generate
          </button>
        </div>
      </div>
      <div>
        <h2>Board Size</h2>
        <div>
          <select v-model="settings.boardSize">
            <option v-for="(size, index) in BOARD_SIZE" :key="index" :value="size.value">
              {{ size.text }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <button @click="emit('reset')">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
