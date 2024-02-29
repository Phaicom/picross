export interface Puzzle {
  catalogue: string
  title: string
  author: string
  copyright: string
  width: number
  height: number
  clues: Clues
}

export interface Clues {
  rows: number[][]
  columns: number[][]
}

export interface Parser {
  puzzle: Puzzle
  parse: (input: string) => Puzzle
}
