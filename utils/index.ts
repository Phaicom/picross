import type { CellTypes } from '../types'

export function reverseRowToColumn(array2d: any[][]) {
  const reverseArr2d = []

  for (let i = 0; i < array2d[0].length; i++) {
    const arr = []
    for (let j = 0; j < array2d.length; j++)
      arr.push(array2d[j][i])

    reverseArr2d.push(arr)
  }
  return reverseArr2d
}

export function isEnumMember(value: any, enumType: any): boolean {
  return Object.values(enumType).includes(value as CellTypes)
}

export function isArrayIndexExists(arr: any[], ...indexes: number[]): boolean {
  return _isArrayIndexExist(arr, 0, ...indexes)
}

export function _isArrayIndexExist(arr: any[], pivot = 0, ...indexes: number[]): boolean {
  if (pivot > indexes.length - 1)
    return true

  return (typeof arr?.[indexes[pivot]] !== 'undefined') && _isArrayIndexExist(arr?.[indexes[pivot]], ++pivot, ...indexes)
}
