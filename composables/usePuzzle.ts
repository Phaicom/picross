import { reactive, ref } from 'vue'
import { CellTypes } from '../types'
import type { Hint, Hints } from '../types'

export function usePuzzle() {
  const width = ref(0)
  const height = ref(0)
  const totalCells = ref(0)
  const grid = reactive<number[][]>([])
  const solution = reactive<number[][]>([])
  const hints = reactive<Hints>({ row: [], col: [] })

  function setup(w: number, h: number) {
    if (Number.isNaN(+w) && Number.isNaN(+h))
      throw new Error('width and height are required!')
    if (w <= 0 || h <= 0)
      throw new Error('width or height are less than or equal to 0!')

    width.value = w
    height.value = h
    totalCells.value = width.value * height.value

    reset()
  }

  function reset() {
    Object.assign(grid, Array.from({ length: width.value }).fill(0).map(() => Array.from({ length: height.value }).fill(0),
    ) as number[][])
    Object.assign(solution, grid)
    Object.assign(hints, { row: [], col: [] })
  }

  function generate() {
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

  return { width, height, totalCells, grid, solution, hints, setup, generate }
}
