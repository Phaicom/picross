import { Game } from '@picross/core'
import type { Clues, Puzzle } from '@picross/shared'

export const usePuzzleStore = defineStore('puzzle', () => {
  const catalogue = ref('')
  const title = ref('')
  const author = ref('')
  const copyright = ref('')
  const width = ref(0)
  const height = ref(0)
  const clues = reactive<Clues>({ rows: [], cols: [] })
  const grid = reactive<number[][]>([])
  const solution = reactive<number[][]>([])

  const isWin = computed(() => {
    const trimGrid = grid.map(row => row.map(col => col === 1 ? 1 : 0))

    return trimGrid.length > 0 && solution.length > 0 && JSON.stringify(trimGrid) === JSON.stringify(solution)
  })

  function reset(puzzle: Puzzle = {} as Puzzle) {
    const game = new Game(puzzle)
    catalogue.value = game.puzzle.catalogue
    title.value = game.puzzle.title
    author.value = game.puzzle.author
    copyright.value = game.puzzle.copyright
    width.value = game.puzzle.width
    height.value = game.puzzle.height
    clues.rows.splice(0, clues.rows.length)
    clues.cols.splice(0, clues.cols.length)
    clues.rows.push(...game.puzzle.clues.rows)
    clues.cols.push(...game.puzzle.clues.cols)
    grid.splice(0, grid.length)
    grid.push(...game.grid)
    solution.splice(0, solution.length)
    solution.push(...game.solution)
  }

  return { catalogue, title, author, width, height, clues, grid, solution, isWin, reset }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePuzzleStore, import.meta.hot))
