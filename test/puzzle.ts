import type { IPuzzle } from './types'

class Puzzle implements IPuzzle {
  width: number
  height: number
  totalCells: number
  grid: number[][]
  hints: number[][]

  constructor(width: number, height: number) {
    if (Number.isNaN(+width) && Number.isNaN(+height))
      throw new Error('width and height are required!')
    if (width <= 0 || height <= 0)
      throw new Error('width or height are less than or equal to 0!')

    this.width = width
    this.height = height
    this.totalCells = this.width * this.height

    // temp
    this.grid = []
    this.hints = []
    this.reset()
  }

  reset() {
    this.grid = Array.from({ length: this.width }).fill(0).map(() => Array.from({ length: this.height }).fill(0),
    ) as number[][]
    this.hints = []
  }
}

export { Puzzle }
