import type { Puzzle } from '@picross/shared'
import { BaseParser } from './base'

export class NonParser extends BaseParser {
  parse(input: string): Puzzle {
    const sections = input.split('\n\n')
    if (sections.length < 3)
      throw new Error('Incorrect non file structure')

    this.parseDataSection(sections[0])
    this.parseCluesSection(sections.slice(1, 3))

    return this.puzzle
  }

  private parseDataSection(data: string): void {
    for (const line of data.split('\n')) {
      const [key, value] = line.indexOf('"') > 0 ? line.split('"') : line.split(' ')
      const trimmedKey = key.trim()
      const trimmedValue = value.trim()

      if (trimmedKey in this.puzzle)
        (this.puzzle as any)[trimmedKey] = trimmedValue
      else if (trimmedKey === 'by')
        this.puzzle.author = trimmedValue
      else
        throw new Error('Incorrect non file key')
    }

    this.puzzle.width = Number(this.puzzle.width)
    this.puzzle.height = Number(this.puzzle.height)
  }

  private parseCluesSection(sections: string[]): void {
    this.puzzle.clues = { rows: [], columns: [] }

    sections.forEach((section) => {
      const lines = section.split('\n')
      const key = lines.shift()

      if (!['rows', 'columns'].includes(key || ''))
        throw new Error('Incorrect non file key')

      const clues = lines.map(line => line.split(',').map(Number))
      this.puzzle.clues[key === 'rows' ? 'rows' : 'columns'] = clues
    })
  }
}
