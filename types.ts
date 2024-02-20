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

// migrate
export interface Settings {
  width: number
  height: number
  boardSize: number
}

export interface Pointer {
  x: number
  y: number
  cellType: CellTypes
}
