import { describe, expect, it } from 'vitest'
import { parser } from '../src'
import { readFileSync } from '../src/utils'

describe('non', () => {
  it('adds 1 + 2 to equal 3', () => {
    const result = parser('../input/webpbn000001.non')
    const output = readFileSync('../output/webpbn000001.json')

    expect(result).toStrictEqual(JSON.parse(output as string))
  })
})
