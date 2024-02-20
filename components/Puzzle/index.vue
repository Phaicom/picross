<script lang="ts" setup>
const puzzle = usePuzzleStore()

onMounted(() => {
  puzzle.generate()
})
</script>

<template>
  <div relative p="x-4 y-3">
    <div grid="col-span-3" flex="~ col items-center gap-6">
      <h1 v-show="puzzle.isWin" text="3xl primary" class="keyframes-bounce-in animate-[bounce-in_1s_ease-in-out]">
        You're the WINNER!! 😍✨🔥
      </h1>
      <PuzzleBoard />
      <PuzzleCellType />
    </div>
    <PuzzleSettings @reset="puzzle.reset()" @generate="puzzle.generate()" />
  </div>
</template>
