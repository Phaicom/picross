export enum CellTypes {
  Empty,
  Fill,
  Cross,
  Circle,
}

export interface Hints {
  row: Hint[][]
  col: Hint[][]
}

export interface Hint {
  value: number
  isCompleted: boolean
}
