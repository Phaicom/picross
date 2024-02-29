import type { Puzzle } from '../../types/types'
import { BaseParser } from './base'

export class NonParser extends BaseParser {
  parse(input: string): Puzzle {
    const inputArr = input.split('\n\n')

    if (inputArr.length < 3)
      throw new Error('Incorrect non file structure')

    // parse data section
    const data = inputArr[0]
    for (const line of data.split('\n')) {
      const [key, value, _] = line.indexOf('"') > 0 ? line.split('"') : line.split(' ')
      const kt = key.trim()
      const vt = value.trim()

      if (kt in this.puzzle)
        (this.puzzle as any)[kt] = vt
      else if (kt === 'by')
        this.puzzle.author = vt
      else
        throw new Error('Incorrect non file key')
    }
    this.puzzle.width = +this.puzzle.width
    this.puzzle.height = +this.puzzle.height

    // parse row and column section
    this.puzzle.clues = {
      rows: [] as number[][],
      columns: [] as number[][],
    }
    for (let i = 1; i < 3; i++) {
      const arr = inputArr[i].split('\n')

      if (!['rows', 'columns'].includes(arr.shift() || ''))
        throw new Error('Incorrect non file key')

      for (const line of arr)
        i === 1 ? this.puzzle.clues.rows.push(line.split(',').map(v => +v)) : this.puzzle.clues.columns.push(line.split(',').map(v => +v))
    }

    return this.puzzle
  }
}
