import type { Puzzle } from '@picross/shared'

// for test only
import { readFileSync } from '../../parser/src/utils'
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
        columns: [],
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
        columns: [],
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
    const solver = new SimpleSolver(1)
    console.log(solver)
  }
}

// for test only
const output = readFileSync('../../parser/output/webpbn000001.json')
const game = new Game()
game.setPuzzle(JSON.parse(output as string))

// console.log(game)
