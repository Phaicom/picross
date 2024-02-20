export enum CellTypes {
  Empty,
  Fill,
  Cross,
  Circle,
}

export interface Hint {
  value?: number
  isCompleted?: boolean
}
