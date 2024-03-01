import type { Puzzle } from '@picross/shared'

// for test only
import { SimpleSolver } from './solver'

export class Game {
  puzzle: Puzzle
  grid: number[][]
  solution: number[][]

  constructor(puzzle?: Puzzle) {
    this.puzzle = {
      catalogue: '',
      title: '',
      author: '',
      copyright: '',
      width: 0,
      height: 0,
      clues: {
        rows: [],
        cols: [],
      },
    }

    this.grid = []
    this.solution = []

    if (puzzle)
      this.setPuzzle(puzzle)
  }

  reset() {
    this.puzzle = {
      catalogue: '',
      title: '',
      author: '',
      copyright: '',
      width: 0,
      height: 0,
      clues: {
        rows: [],
        cols: [],
      },
    }

    this.grid = []
    this.solution = []
  }

  setPuzzle(puzzle: Puzzle) {
    // set puzzle
    this.puzzle = puzzle
    // generate grid base on width and height
    this.grid = Array.from({ length: this.puzzle.height }, () => Array.from({ length: this.puzzle.width }, () => 0))

    // generate solution base on puzzle clues
    // solver function goes here
    const solver = new SimpleSolver(this.puzzle.clues)
    this.solution = solver.board
  }
}
