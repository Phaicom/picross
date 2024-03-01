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
    this.colsDone = Array(noOfCols).fill(0)
    this.solved = false
    this.board = Array.from({ length: noOfRows }, () => Array(noOfCols).fill(0))

    // step 1: Defining all possible solutions for every row and col
    const rowsPossibilities = this.createPossibilities(this.clues.rows, noOfCols)
    const colsPossibilities = this.createPossibilities(this.clues.cols, noOfRows)

    while (!this.solved) {
      // step 2: Order by lowest
      const lowestRow = this.selectIndexNotDone(rowsPossibilities, 1)
      const lowestCol = this.selectIndexNotDone(colsPossibilities, 0)
      const lowest = [...lowestRow, ...lowestCol].sort((a, b) => a[1] - b[1])

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
            }
          }
          this.updateDone(rowInd, ind1)
        }
      }
      // replace -1 with 0 in board
      this.board = this.board.map(row => row.map(cell => (cell === -1 ? 0 : cell)))
      this.checkSolved()
    }
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

  private createPossibilities(lines: ClueRowOrColumn, noOfLine: number): number[][][] {
    return lines.map((line) => {
      const groups = line.length
      const noEmpty = noOfLine - line.reduce((a, b) => a + b, 0) - groups + 1
      const ones = line.map(cell => Array(cell).fill(1))

      return this._createPossibilities(noEmpty, groups, ones)
    })
  }

  private selectIndexNotDone(possibilities: any[], rowInd: number) {
    const s = possibilities.map(i => i.length)
    const doneArray = rowInd ? this.rowsDone : this.colsDone
    return s.map((n, i) => [i, n, rowInd]).filter((_, i) => doneArray[i] === 0)
  }

  private checkDone(rowInd: number, idx: number): boolean {
    return rowInd ? this.rowsDone[idx] === 1 : this.colsDone[idx] === 1
  }

  private getOnlyOneOption(values: number[][]) {
    const transposedValues = zip(...values)
    return transposedValues.flatMap((i, n) => {
      const uniqueValues = uniq(i)
      if (uniqueValues.length === 1)
        return [[n, uniqueValues[0]]] as any

      return []
    })
  }

  private removePossibilities(possibilities: number[][], i: number, val: number): number[][] {
    return possibilities.filter(p => p[i] === val)
  }

  private updateDone(rowInd: number, idx: number): void {
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

  private checkSolved(): void {
    if (!this.solved && this.rowsDone.every(done => done === 1) && this.colsDone.every(done => done === 1))
      this.solved = true
  }
}
