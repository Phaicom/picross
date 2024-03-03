import type { Puzzle } from '../types'

export const sample: Puzzle[] = [
  {
    catalogue: 'picross #001',
    title: '',
    author: 'Unknown',
    copyright: '',
    width: 5,
    height: 5,
    clues: {
      rows: [[4], [4], [1], [1, 1, 1], [1]],
      cols: [[2, 1], [2], [2, 1], [2], [3]],
    },
  },
  {
    catalogue: 'picross #002',
    title: 'Smiley Face',
    author: 'HandsomeOne',
    copyright: 'MIT',
    width: 12,
    height: 12,
    clues: {
      rows: [[4], [8], [10], [2, 2, 2], [3, 2, 3], [12], [2, 6, 2], [2, 6, 2], [2, 4, 2], [3, 3], [8], [4]],
      cols: [[4], [8], [5, 3], [2, 3, 2], [3, 4, 2], [9, 2], [9, 2], [3, 4, 2], [2, 3, 2], [5, 3], [8], [4]],
    },
  },
]
