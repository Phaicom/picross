<script lang="ts" setup>
const show = ref(true)
</script>

<template>
  <div absolute right-4 top-4 rounded bg-gray-100 px2 py2 flex="~ col" :class="{ 'w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4': show }">
    <PuzzleConfigsToggle v-model:show="show" flex-self-end />
    <!-- TODO: change size base on show variable inside v-show div -->
    <div v-show="show" px1 py2>
      <h1>Configs</h1>
      <div>
        <h2>Random Puzzle</h2>
        <div>
          <select>
            <option v-for="(d, index) in PUZZLE_DIMENSION" :key="index">
              {{ d }}
            </option>
          </select>
          <span>X</span>
          <select>
            <option v-for="(d, index) in PUZZLE_DIMENSION" :key="index">
              {{ d }}
            </option>
          </select>
          <button>Generate</button>
        </div>
      </div>
      <div>
        <h2>Board Size</h2>
        <div>
          <select>
            <option v-for="(size, index) in BOARD_SIZE" :key="index">
              {{ size }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <button>Reset</button>
      </div>
    </div>
  </div>
</template>
