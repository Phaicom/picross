import { reactive, ref } from 'vue'
import { CellTypes, type Hint, type Hints, type Pointer, type Settings } from '../types'

export function usePuzzle() {
  const width = ref(0)
  const height = ref(0)
  const totalCells = ref(0)
  const grid = reactive<number[][]>([])
  const solution = reactive<number[][]>([])
  const hints = reactive<Hints>({ row: [], col: [] })
  const settings = reactive<Settings>({ width: 5, height: 5, boardSize: 12 })
  const pointer = reactive<Pointer>({ x: 0, y: 0, cellType: CellTypes.Fill })

  const cellSizeClass = computed(() => `h-${settings.boardSize} w-${settings.boardSize}`)
  const previewSizeStyle = computed(() => {
    const sizePerOneCell = settings.boardSize > 12 ? settings.boardSize / 5 : 12 / 5

    return {
      width: `${sizePerOneCell * height.value * 0.25}rem`,
      height: `${sizePerOneCell * width.value * 0.25}rem`,
    }
  })

  function setup() {
    if (Number.isNaN(+settings.width) && Number.isNaN(+h))
      throw new Error('width and height are required!')
    if (settings.width <= 0 || settings.height <= 0)
      throw new Error('width or height are less than or equal to 0!')

    width.value = settings.width
    height.value = settings.height
    totalCells.value = width.value * height.value

    reset()
    generateSolution()
  }

  function reset() {
    grid.splice(0, grid.length)
    const arr = Array.from({ length: width.value }).fill(0).map(() => Array.from({ length: height.value }).fill(0),
    ) as number[][]
    Object.assign(grid, arr)
  }

  function generateSolution() {
    solution.splice(0, solution.length)
    Object.assign(solution, grid)
    Object.assign(solution, solution.map(row => row.map(() => Math.floor(Math.random() * 2))))
    _getHints()
  }

  function _getHints() {
    hints.row = _getHint(solution)
    hints.col = _getHint(reverseRowToColumn(solution))
  }

  function _getHint(arr: number[][]) {
    const result: Hint[][] = []
    for (const row of arr) {
      const hint: Hint[] = []
      row.join('').split('0').filter(pre => pre || false).map(value => value.split('').map(n => +n).reduce((pre, cur) => pre + cur)).forEach((value) => {
        hint.push({ value, isCompleted: false })
      })

      result.push(hint)
    }
    return result
  }

  return { width, height, totalCells, grid, solution, hints, settings, pointer, cellSizeClass, previewSizeStyle, setup, generateSolution, reset }
}
