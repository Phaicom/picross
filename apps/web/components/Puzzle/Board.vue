<script setup lang="ts">
import { CellTypes, sample } from '@picross/shared'

const pointer = usePointerStore()
const puzzle = usePuzzleStore()
puzzle.reset(sample[0])

function showSelectedCell(row: number, col: number) {
  return pointer.row === row && pointer.col === col
}

function setCell(row: number, col: number, type: CellTypes) {
  puzzle.grid[row][col] = puzzle.grid[row][col] === type ? CellTypes.Empty : type
}
</script>

<template>
  <section>
    <Transition name="bounce">
      <PuzzleTemp v-if="puzzle.isWin">
        YOU WIN!
      </PuzzleTemp>
    </Transition>
    <!-- board wrapper -->
    <div class="w-[calc(100vw-3rem)]" flex="~ justify-center" select-none overflow-auto max="h-60vh lg:h-55vh">
      <div flex="~ col" w-min font="400">
        <div flex="~ row">
          <!-- hints rows -->
          <div flex="~ col" min-w-min bg-white rounded="tl-lg bl-lg" class="box-shadow-board">
            <div
              v-for="(row, i) in puzzle.clues.rows" :key="i" h-14 min-w-15 flex="~ row justify-end items-center gap-2.5" p-1 border="odd:l-2 odd:t-2 last:odd:b-2 cell" bg="odd:cell" rounded="first:tl-lg last:bl-lg"
              :class="{ 'bg-my-light-violet-20! border-my-light-violet-20!': i === pointer.row }"
            >
              <div v-for="(item, j) in row" :key="j">
                {{ item }}
              </div>
            </div>
          </div>
          <!-- cell board -->
          <div flex="~ col" relative bg-white class="box-shadow-board-main">
            <!-- row -->
            <div v-for="(_, i) in puzzle.height" :key="i" flex="~ row justify-end items-center" min-w-min>
              <div v-for="(_, j) in puzzle.width" :key="j" border="l-2 t-2 last:r-2 cell" flex="~ justify-center items-center" relative h-14 w-14 cursor-pointer :class="{ 'border-b-2': i === puzzle.height - 1 }" @click="setCell(i, j, pointer.cellType)" @mouseover="pointer.setPointLocation(i, j)">
                <ClientOnly>
                  <PuzzleCellType :cell-type="puzzle.grid[i][j]" text-11 />
                </ClientOnly>
                <div v-if="showSelectedCell(i, j)" border="2 my-light-violet-20" absolute class="h-[calc(100%+4px)] w-[calc(100%+4px)] -left-2px -top-2px" z-10 />
              </div>
            </div>
          </div>
        </div>
        <!-- hints cols -->
        <div flex="~ row" ml-auto min-w-min bg-white rounded="bl-lg br-lg" class="box-shadow-board">
          <div
            v-for="(col, i) in puzzle.clues.cols" :key="i" min-h-15 w-14 flex="~ col justify-start items-center" leading-5 border="odd:l-2 odd:b-2 last:odd:r-2 cell" bg="odd:cell" rounded="first:bl-lg last:br-lg"
            :class="{ 'bg-my-light-violet-20! border-my-light-violet-20!': i === pointer.col }"
          >
            <div v-for="(item, j) in col" :key="j">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.box-shadow-board {
  box-shadow: 0px 5px 24px 0px #4b69ff1a;
}

.box-shadow-board-main {
  box-shadow: 11px -9px 30px -12px #4b69ff1a;
}
</style>
