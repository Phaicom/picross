import { useSolutionStore } from './solution'
import { useHintsStore } from './hints'
import type { Hints, Pointer, Settings } from '~/types/puzzle'
import { CellTypes } from '~/types/puzzle'

export const usePuzzleStore = defineStore('puzzleStore', () => {
  const solutionStore = useSolutionStore()
  const hintsStore = useHintsStore()

  const width = ref(0)
  const height = ref(0)
  const totalCells = ref(0)
  const grid = reactive<number[][]>([])
  const settings = reactive<Settings>({ width: 5, height: 5, boardSize: 12 })
  const pointer = reactive<Pointer>({ x: 0, y: 0, cellType: CellTypes.Fill })

  const hints = computed(() => {
    return { row: hintsStore.row, col: hintsStore.col } as Hints
  })

  function generate() {
    if (Number.isNaN(+settings.width) && Number.isNaN(+h))
      throw new Error('width and height are required!')
    if (settings.width <= 0 || settings.height <= 0)
      throw new Error('width or height are less than or equal to 0!')

    width.value = settings.width
    height.value = settings.height
    totalCells.value = width.value * height.value

    reset()
    solutionStore.generate(grid)
    hintsStore.generate(solutionStore.solution)
  }

  function reset() {
    grid.splice(0, grid.length)
    const arr = Array.from({ length: width.value }).fill(0).map(() => Array.from({ length: height.value }).fill(0),
    ) as number[][]
    Object.assign(grid, arr)
  }

  return { width, height, totalCells, grid, settings, pointer, hints, generate, reset }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePuzzleStore, import.meta.hot))
