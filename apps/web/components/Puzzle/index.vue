<template>
  <div relative>
    <!-- BG Layer -->
    <PuzzleBG />
    <!-- Game Layer -->
    <div flex="~ col items-center gap-6" relative px-6>
      <!-- Timer section -->
      <PuzzleTimer />
      <!-- Board section -->
      <PuzzleBoard />
      <!-- Cell type choosing section -->
      <PuzzlePickCellType mt-4 />
    </div>
  </div>
</template>
