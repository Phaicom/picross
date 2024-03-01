import { describe, expect, it } from 'vitest'
import { combination, last, range } from '../src'

describe('shared range function', () => {
  it('range [0, 5]', () => {
    const result = Array.from(range(0, 5))
    expect(result).toStrictEqual([0, 1, 2, 3, 4])
  })

  it('range [3, 5]', () => {
    const result = Array.from(range(3, 5))
    expect(result).toStrictEqual([3, 4])
  })
})

describe('shared last function', () => {
  it('last number', () => {
    const input = [1, 5, 77]
    const result = last(input)
    expect(result).toBe(77)
  })

  it('last string', () => {
    const input = ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
    const result = last(input)
    expect(result).toBe('amet')
  })
})

describe('shared combination function', () => {
  it('combination range [0, 3]', () => {
    const input = Array.from(range(0, 3))
    const result = Array.from(combination(input, 2))
    expect(result.length).toBe(3)
    expect(result).toStrictEqual([[0, 1], [0, 2], [1, 2]])
  })

  it('combination A-Za-z', () => {
    const input = 'ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz'.split('')
    const result = Array.from(combination(input, 2))
    expect(result.length).toBe(1128)
  })

  it('combination picross clue 1', () => {
    const line = [2, 1]
    const groups = line.length
    const noEmpty = 10 - line.reduce((a, b) => a + b) - groups + 1
    const result = Array.from(combination(Array.from(range(0, groups + noEmpty)), groups))

    expect(result.length).toBe(28)
  })
})
