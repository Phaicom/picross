export interface PuzzleSet {
  source: string
  puzzle: Puzzle
}

export interface Puzzle {
  type: string
  defaultcolor: string
  title: string
  author: string
  copyright: string
  id: string
  description: string
  note: string
  color: Color[]
  clues: Clues
}

export interface Color {
  name: string
  char: string
  code: string
}

export interface Clues {
  columns: Line[]
  rows: Line[]
}

export interface Line {
  color?: string
  count: number
}
