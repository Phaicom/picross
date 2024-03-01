import { describe, expect, it } from 'vitest'
import { SimpleSolver } from '../src/solver'

describe('simple solver', () => {
  it('solve 5x5', () => {
    const rows = [[4], [4], [1], [1, 1, 1], [1]]
    const cols = [[2, 1], [2], [2, 1], [2], [3]]
    const solver = new SimpleSolver({ rows, cols })
    const output = [
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [0, 0, 0, 0, 1],
    ]
    expect(solver.solved).toBe(true)
    expect(solver.board).toStrictEqual(output)
  })
})
