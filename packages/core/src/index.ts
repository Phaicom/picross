import type { Puzzle } from '@picross/shared'

// for test only
import { readFileSync } from '../../parser/src/utils'

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

    if (this.grid.length)
      this.grid = []
    if (this.solution.length)
      this.grid = []

    this.grid.splice(0, this.grid.length)
    this.solution.splice(0, this.solution.length)
  }

  setPuzzle(puzzle: Puzzle) {
    // set puzzle
    this.puzzle = puzzle
    // generate grid base on width and height
    const grid = Array.from({ length: this.puzzle.height }).fill(0).map(() => Array.from({ length: this.puzzle.width }).fill(0),
    ) as number[][]
    Object.assign(this.grid, grid)

    // generate solution base on puzzle clues
    // solver function goes here
  }
}

// for test only
const output = readFileSync('../../parser/output/webpbn000001.json')
const game = new Game()
game.setPuzzle(JSON.parse(output as string))

console.log(game)
