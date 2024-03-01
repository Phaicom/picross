import type { Clues, RowOrColumnClues } from '@picross/shared'
import { combination, range } from '@picross/shared'
import { uniq, zip } from 'lodash-es'

/**
 * The SimpleSolver class represents a solver for a picross puzzle.
 * It uses a simple algorithm to fill in the cells of the puzzle based on the given clues.
 */
export class SimpleSolver {
  clues: Clues
  rowsDone: number[]
  colsDone: number[]
  solved: boolean
  board: number[][]

  /**
   * Creates an instance of the SimpleSolver class.
   * @param clues - The clues object containing the row and column clues.
   */
  constructor(clues: Clues) {
    this.clues = clues
    const numRows = clues.rows.length
    this.rowsDone = Array(numRows).fill(0)
    const numCols = clues.cols.length
    this.colsDone = Array(numCols).fill(0)
    this.solved = false
    this.board = Array.from({ length: numRows }, () => Array(numCols).fill(0))

    /**
     * An array of possibilities for each row or column in the picross puzzle.
     * Each element in the array represents the possible combinations of filled and empty cells for a row or column.
     * The index of the element corresponds to the row or column index in the puzzle.
     *
     * @type {Array<Array<boolean>>}
     */
    const rowsPoss = this.createPossibilities(this.clues.rows, numCols)
    const colsPoss = this.createPossibilities(this.clues.cols, numRows)

    while (!this.solved) {
      // Order by lowest by the possibilities array that are not marked as done
      const lowestRow = this.selectIndexNotDone(rowsPoss, 1)
      const lowestCol = this.selectIndexNotDone(colsPoss, 0)
      const lowest = [...lowestRow, ...lowestCol].sort((a, b) => a[1] - b[1])

      // Get only zeroes or only ones of lowest possibility
      for (const [i, _, isRow] of lowest) {
        if (!this.checkDone(isRow, i)) {
          const poss = isRow ? rowsPoss[i] : colsPoss[i]
          const uniqueOptions = this.getOnlyOneOption(poss)

          for (const [j, val] of uniqueOptions) {
            const [rowIndex, colIndex] = isRow ? [i, j] : [j, i]
            if (this.board[rowIndex][colIndex] === 0) {
              this.board[rowIndex][colIndex] = val
              if (isRow)
                colsPoss[colIndex] = this.removePossibilities(colsPoss[colIndex], rowIndex, val)
              else
                rowsPoss[rowIndex] = this.removePossibilities(rowsPoss[rowIndex], colIndex, val)
            }
          }
          this.updateDone(isRow, i)
        }
      }
      // replace -1 with 0 in board
      this.board = this.board.map(row => row.map(cell => (cell === -1 ? 0 : cell)))
      this.checkSolved()
    }
  }

  /**
   * Creates possibilities for a given number of empty cells, groups, and ones.
   *
   * @param numEmpty - The number of empty cells.
   * @param groups - The number of groups.
   * @param ones - An array of arrays representing the ones.
   * @returns An array of arrays representing the possibilities.
   */
  private _createPossibilities(numEmpty: number, groups: number, ones: number[][]): number[][] {
    const result: number[][] = []
    const combinations = combination(Array.from(range(0, groups + numEmpty)), groups)

    for (const combination of combinations) {
      const selected = Array(groups + numEmpty).fill(-1)
      let onesIdx = 0
      for (const val of combination) {
        selected[val] = onesIdx
        onesIdx += 1
      }
      const modifiedSelected = selected.map(val => val > -1 ? [...ones[val], -1] : [-1]).reduce((acc, val) => acc.concat(val), []).slice(0, -1)
      result.push(modifiedSelected)
    }

    return result
  }

  /**
   * Creates possibilities for each line in the given ClueRowOrColumn array.
   *
   * @param lines - The RowOrColumnClues array representing the lines.
   * @param numLines - The total number of lines.
   * @returns An array of possibilities for each line.
   */
  private createPossibilities(lines: RowOrColumnClues, numLines: number): number[][][] {
    return lines.map((line) => {
      const groups = line.length
      const numEmpty = numLines - line.reduce((a, b) => a + b, 0) - groups + 1
      const ones = line.map(cell => Array(cell).fill(1))

      return this._createPossibilities(numEmpty, groups, ones)
    })
  }

  /**
   * Selects the indices of the possibilities array that are not marked as done.
   *
   * @param poss - The array of possibilities.
   * @param index - The index value.
   * @returns An array of tuples containing the index, length, and index value for each possibility that is not marked as done.
   */
  private selectIndexNotDone(poss: number[][][], index: number) {
    const lengths = poss.map(p => p.length)
    const doneArray = index ? this.rowsDone : this.colsDone
    return lengths.map((length, i) => [i, length, index]).filter((_, i) => doneArray[i] === 0)
  }

  /**
   * Checks if a row or column is marked as done.
   *
   * @param row - The row or column index.
   * @param index - The index of the row or column.
   * @returns `true` if the row or column is marked as done, `false` otherwise.
   */
  private checkDone(row: number, index: number): boolean {
    return row ? this.rowsDone[index] === 1 : this.colsDone[index] === 1
  }

  /**
   * Returns an array of coordinates and their corresponding unique values
   * where there is only one possible option in each column of the given 2D array.
   *
   * @param vals - The 2D array of numbers.
   * @returns An array of coordinates and their corresponding unique values.
   */
  private getOnlyOneOption(vals: number[][]) {
    const transposedVals = zip(...vals)
    return transposedVals.flatMap((i, n) => {
      const uniqueVals = uniq(i)
      if (uniqueVals.length === 1)
        return [[n, uniqueVals[0]]] as any

      return []
    })
  }

  /**
   * Removes possibilities from the given array based on the specified index and value.
   * @param poss - The array of possibilities.
   * @param i - The index to check in each possibility.
   * @param val - The value to compare against in each possibility.
   * @returns A new array with possibilities that have the specified value at the specified index.
   */
  private removePossibilities(poss: number[][], index: number, val: number): number[][] {
    return poss.filter(p => p[index] === val)
  }

  /**
   * Updates the state of the board to mark a row or column as done if all its values are non-zero.
   *
   * @param isRow - A flag indicating whether the update is for a row (true) or a column (false).
   * @param index - The index of the row or column to update.
   */
  private updateDone(isRow: number, index: number): void {
    let values: number[]

    if (isRow)
      values = this.board[index]
    else
      values = this.board.map(row => row[index])

    if (!values.includes(0)) {
      if (isRow)
        this.rowsDone[index] = 1
      else
        this.colsDone[index] = 1
    }
  }

  /**
   * Checks if the puzzle is solved by verifying if all rows and columns are marked as done.
   */
  private checkSolved(): void {
    if (!this.solved && this.rowsDone.every(done => done === 1) && this.colsDone.every(done => done === 1))
      this.solved = true
  }
}
