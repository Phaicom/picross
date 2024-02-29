import type { ClueRowOrColumn, Clues } from '@picross/shared'

export class SimpleSolver {
  clues: Clues
  savepath: string
  noOfRows: number
  noOfCols: number
  rowsChanged: number[]
  colsChanged: number[]
  rowsDone: number[]
  colsDone: number[]
  solved: boolean
  shape: number[]
  board: number[][]
  // n: number

  constructor(clues: Clues, savepath = '') {
    this.clues = clues

    this.noOfRows = this.clues.rows.length
    this.rowsChanged = Array(this.noOfRows).fill(0)
    this.rowsDone = Array(this.noOfRows).fill(0)

    this.noOfCols = this.clues.cols.length
    this.colsChanged = Array(this.noOfRows).fill(0)
    this.colsDone = Array(this.noOfRows).fill(0)

    this.solved = false
    this.shape = [this.noOfRows, this.noOfCols]
    this.board = Array(this.noOfRows).fill(0).map(() => Array(this.noOfCols).fill(0))
    this.savepath = savepath

    // if (this.savepath !== '')
    //   this.n = 0

    // createPossibilities goes here for row and column
  }

  createPossibilities(lines: ClueRowOrColumn, noOfLine: number): number[][][] {
    const possibilities: number[][][] = []

    for (const line of lines) {
      const groups = line.length
      const noEmpty = noOfLine - line.reduce((a, b) => a + b, 0) - groups + 1
      const ones = line.map(cell => Array(cell).fill(1))
      const res = this._createPossibilities(noEmpty, groups, ones)
      possibilities.push(res)
    }

    return possibilities
  }

  private _createPossibilities(nEmpty: number, groups: number, ones: number[][]): number[][] {
    const resOpts: number[][] = []
    const combinations = this.getCombinations(groups + nEmpty, groups)

    for (const p of combinations) {
      const selected = Array(groups + nEmpty).fill(-1)
      let onesIdx = 0
      for (const val of p) {
        selected[val] = onesIdx
        onesIdx += 1
      }
      let resOpt = selected.map(val => val > -1 ? [...ones[val], -1] : [-1])
      resOpt = resOpt.reduce((acc, val) => acc.concat(val), []).slice(0, -1)
      resOpts.push(resOpt)
    }

    return resOpts
  }

  private getCombinations(n: number, r: number): number[][] {
    // Implement the combinations logic here
    // This is a placeholder as JavaScript/TypeScript does not have a built-in combinations function
    return []
  }
}
