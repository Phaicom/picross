import { CellTypes } from '~/types'

export const PUZZLE_DIMENSION = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export const BOARD_SIZE = [{ text: 'small', value: 6 }, { text: 'medium', value: 12 }, { text: 'large', value: 18 }]

export const CELL_TYPES = [{ text: '', value: CellTypes.Empty }, { text: 'bg-cell', value: CellTypes.Fill }, { text: 'i-ph:x-light text-red', value: CellTypes.Cross }, { text: 'i-ph:circle-light text-blue', value: CellTypes.Circle }]
