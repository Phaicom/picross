import type { Parser, Puzzle } from '@picross/shared'

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
