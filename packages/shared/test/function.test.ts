import { describe, expect, it } from 'vitest'
import { combination, last, range } from '../src'

describe('shared range function', () => {
  it('range [0, 5]', () => {
    const resultItr = range(0, 5)
    const result = []
    for (const value of resultItr)
      result.push(value)

    expect(result).toStrictEqual([0, 1, 2, 3, 4, 5])
  })

  it('range [3, 5]', () => {
    const resultItr = range(3, 5)
    const result = []
    for (const value of resultItr)
      result.push(value)

    expect(result).toStrictEqual([3, 4, 5])
  })
})

describe('shared last function', () => {
  it('last number', () => {
    const input = [1, 5, 77]
    const result = last(input)

    expect(result).toStrictEqual(77)
  })

  it('last string', () => {
    const input = ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
    const result = last(input)

    expect(result).toStrictEqual('amet')
  })
})

describe('shared combination function', () => {
  it('combination A-Za-z', () => {
    const input = 'ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz'.split('')
    let result = 0
    for (const _ of combination(input, 2))
      result += 1

    expect(result).toStrictEqual(1128)
  })
})
