import type { Parser, Puzzle } from '../../types/types'

export class NonParser implements Parser {
  parse(input: string): Puzzle {
    const puzzle = {
      catalogue: '',
      title: '',
      author: '',
      copyright: '',
      width: 0,
      height: 0,
      clues: {
        rows: [],
        columns: [],
      },
    } as Puzzle
    const inputArr = input.split('\n\n')

    if (inputArr.length < 3)
      throw new Error('Incorrect non file structure')

    // parse data section
    const data = inputArr[0]
    for (const line of data.split('\n')) {
      const [key, value, _] = line.indexOf('"') > 0 ? line.split('"') : line.split(' ')
      const kt = key.trim()
      const vt = value.trim()

      if (kt in puzzle)
        (puzzle as any)[kt] = vt
      else if (kt === 'by')
        puzzle.author = vt
      else
        throw new Error('Incorrect non file key')
    }
    puzzle.width = +puzzle.width
    puzzle.height = +puzzle.height

    // parse row and column section
    puzzle.clues = {
      rows: [] as number[][],
      columns: [] as number[][],
    }
    for (let i = 1; i < 3; i++) {
      const arr = inputArr[i].split('\n')

      if (!['rows', 'columns'].includes(arr.shift() || ''))
        throw new Error('Incorrect non file key')

      for (const line of arr)
        i === 1 ? puzzle.clues.rows.push(line.split(',').map(v => +v)) : puzzle.clues.columns.push(line.split(',').map(v => +v))
    }

    return puzzle as Puzzle
  }
}
