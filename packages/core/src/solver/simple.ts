import type { ClueRowOrColumn, Clues } from '@picross/shared'
import { combination, range } from '@picross/shared'
import { uniq, zip } from 'lodash-es'

export class SimpleSolver {
  clues: Clues
  rowsDone: number[]
  colsDone: number[]
  solved: boolean
  board: number[][]

  constructor(clues: Clues) {
    this.clues = clues
    const noOfRows = this.clues.rows.length
    this.rowsDone = Array(noOfRows).fill(0)
    const noOfCols = this.clues.cols.length
    this.colsDone = Array(noOfRows).fill(0)
    this.solved = false
    this.board = Array(noOfRows).fill(0).map(() => Array(noOfCols).fill(0))

    // step 1: Defining all possible solutions for every row and col
    const rowsPossibilities = this.createPossibilities(this.clues.rows, noOfCols)
    const colsPossibilities = this.createPossibilities(this.clues.cols, noOfRows)

    while (!this.solved) {
      // step 2: Order by lowest
      const lowestRow = this.selectIndexNotDone(rowsPossibilities, 1)
      const lowestCol = this.selectIndexNotDone(colsPossibilities, 0)
      const lowest = lowestRow.concat(lowestCol).sort((a, b) => a[1] - b[1])

      // step 3: Get only zeroes or only ones of lowest possibility
      for (const [ind1, _, rowInd] of lowest) {
        if (!this.checkDone(rowInd, ind1)) {
          const values = rowInd ? rowsPossibilities[ind1] : colsPossibilities[ind1]
          const sameInd = this.getOnlyOneOption(values)

          for (const [ind2, val] of sameInd) {
            const [ri, ci] = rowInd ? [ind1, ind2] : [ind2, ind1]
            if (this.board[ri][ci] === 0) {
              this.board[ri][ci] = val
              if (rowInd)
                colsPossibilities[ci] = this.removePossibilities(colsPossibilities[ci], ri, val)
              else
                rowsPossibilities[ri] = this.removePossibilities(rowsPossibilities[ri], ci, val)

              // TODO: make save board for each iteration to show step by step in front end
              // this.displayBoard()
              // if (this.savePath !== '') {
              // this.saveBoard()
              // this.n += 1
              // }
            }
          }
          this.updateDone(rowInd, ind1)
        }
      }
      // replace -1 with 0 in board
      this.board = this.board.map(row => row.map(cell => cell === -1 ? 0 : cell))
      this.checkSolved()
    }
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

  private _createPossibilities(noEmpty: number, groups: number, ones: number[][]): number[][] {
    const resOpts: number[][] = []
    const combinations = combination(Array.from(range(0, groups + noEmpty)), groups)

    for (const p of combinations) {
      const selected = Array(groups + noEmpty).fill(-1)
      let onesIdx = 0
      for (const val of p) {
        selected[val] = onesIdx
        onesIdx += 1
      }
      const resOpt = selected.map(val => val > -1 ? [...ones[val], -1] : [-1])
      const resOpt2 = resOpt.reduce((acc, val) => acc.concat(val), []).slice(0, -1)
      resOpts.push(resOpt2)
    }

    return resOpts
  }

  selectIndexNotDone(possibilities: any[], rowInd: number) {
    const s = possibilities.map(i => i.length)
    if (rowInd)
      return s.map((n, i) => [i, n, rowInd]).filter((_, i) => this.rowsDone[i] === 0)
    else
      return s.map((n, i) => [i, n, rowInd]).filter((_, i) => this.colsDone[i] === 0)
  }

  checkDone(rowInd: number, idx: number): any {
    if (rowInd)
      return this.rowsDone[idx]
    else return this.colsDone[idx]
  }

  getOnlyOneOption(values: number[][]) {
    const transposedValues = zip(...values)
    return transposedValues.flatMap((i, n) => {
      if (!(uniq(i).length === 1))
        return []
      return [[n, uniq(i)[0]]] as any
    })
  }

  removePossibilities(possibilities: number[][], i: number, val: number): number[][] {
    return possibilities.filter(p => p[i] === val)
  }

  updateDone(rowInd: number, idx: number): void {
    let vals: number[]

    if (rowInd)
      vals = this.board[idx]
    else
      vals = this.board.map(row => row[idx])

    if (!vals.includes(0)) {
      if (rowInd)
        this.rowsDone[idx] = 1
      else
        this.colsDone[idx] = 1
    }
  }

  checkSolved(): void {
    if (!this.rowsDone.includes(0) && !this.colsDone.includes(0))
      this.solved = true
  }
}
// test
// left
const rows = [[4], [6], [3, 2], [2, 1], [2, 1, 1], [3, 1], [4]]
// top
const cols = [[5], [7], [3, 2], [2, 1], [2, 1, 1], [2, 1], [3]]
const solver = new SimpleSolver({ rows, cols })
