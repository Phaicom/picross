import type { Parser, Puzzle } from '@picross/shared'

/**
 * Represents a base parser for parsing picross puzzles.
 */
export class BaseParser implements Parser {
  puzzle: Puzzle

  constructor() {
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
  }

  parse(_: string) {
    return this.puzzle
  }
}
