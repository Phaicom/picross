enum CellTypes {
  Cross = -1,
  Empty,
  Fill,
  Circle,
}

function isEnumMember(value: any, enumType: any): boolean {
  return Object.values(enumType).includes(value as CellTypes)
}

function isArrayIndexExists(arr: any[], ...indexes: number[]): boolean {
  return _isArrayIndexExist(arr, 0, ...indexes)
}

function _isArrayIndexExist(arr: any[], pivot = 0, ...indexes: number[]): boolean {
  if (pivot > indexes.length - 1)
    return true

  return (typeof arr?.[indexes[pivot]] !== 'undefined') && _isArrayIndexExist(arr?.[indexes[pivot]], ++pivot, ...indexes)
}

function generateEmptyGrid(rows: number, cols: number): number[][] {
  const grid: number[][] = []

  for (let i = 0; i < rows; i++) {
    grid[i] = []
    for (let j = 0; j < cols; j++)
      grid[i][j] = CellTypes.Empty
  }

  return grid
}

function setCell(grid: number[][], row: number, col: number, cellType = CellTypes.Fill): number[][] {
  if (!isArrayIndexExists(grid, row, col))
    throw new Error(`The cell at row ${row}, column ${col} does not exist!`)
  if (!isEnumMember(cellType, CellTypes))
    throw new Error(`The value ${cellType} does not belong to CellTypes Enum.`)

  grid[row][col] = cellType
  return grid
}

const grid = generateEmptyGrid(5, 5)

console.log(grid)

// setCell(grid, 4, 4)
setCell(grid, 4, 4, -1)

console.log(grid)
// console.log(isEnumMember(3, CellTypes))
