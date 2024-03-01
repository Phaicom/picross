import { describe, expect, it } from 'vitest'
import { combination, last, range } from '../src'

describe('shared range function', () => {
  it('range [0, 5]', () => {
    const result = Array.from(range(0, 5))
    expect(result).toStrictEqual([0, 1, 2, 3, 4, 5])
  })

  it('range [3, 5]', () => {
    const result = Array.from(range(3, 5))
    expect(result).toStrictEqual([3, 4, 5])
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
  it('combination A-Za-z', () => {
    const input = 'ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz'.split('')
    const result = Array.from(combination(input, 2)).length
    expect(result).toBe(1128)
  })
})
