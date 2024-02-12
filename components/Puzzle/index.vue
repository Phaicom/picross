<script lang="ts" setup>
const puzzle = usePuzzle()

onMounted(() => {
  puzzle.setup()
})

provide('settings', readonly(puzzle.settings))
provide('width', puzzle.width)
provide('height', puzzle.height)
</script>

<template>
  <div relative px4 py3>
    <div grid="col-span-3">
      <PuzzleBoard v-model:grid="puzzle.grid" v-model:hints="puzzle.hints" />
    </div>
    <PuzzleSettings v-model:settings="puzzle.settings" @reset="puzzle.reset()" @generate="puzzle.setup()" />
  </div>
</template>
