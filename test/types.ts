export enum CellTypes {
  Cross = -1,
  Empty,
  Fill,
  Circle,
}

export interface IPuzzle {
  width: number
  height: number
  totalCells: number
  grid: number[][]
  hints: number[][]
}
