<script lang="ts" setup>
const puzzle = usePuzzle()

onMounted(() => {
  puzzle.setup()
})

provide('cellSizeClass', readonly(puzzle.cellSizeClass))
provide('previewSizeStyle', readonly(puzzle.previewSizeStyle))
provide('width', readonly(puzzle.width))
provide('height', readonly(puzzle.height))
provide('pointer', puzzle.pointer)
</script>

<template>
  <div relative p="x-4 y-3">
    <div grid="col-span-3" flex="~ col items-center gap-6">
      <PuzzleBoard v-model:grid="puzzle.grid" v-model:hints="puzzle.hints" />
      <PuzzleCellType v-model:pointer="puzzle.pointer" />
    </div>
    <PuzzleSettings v-model:settings="puzzle.settings" @reset="puzzle.reset()" @generate="puzzle.setup()" />
  </div>
</template>
